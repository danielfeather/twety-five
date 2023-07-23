import React, {FC, useEffect, useMemo, useRef, useState} from 'react'
import Card, {Rank, Suit} from '../components/Card'
import Button, {Style} from '../components/Button'
import Player from '../components/Player'
import Table from "../components/Table";
import Deck from "../components/Deck";
import Lift from '../engine/Lift';

interface Hands {
    [player: number]: number[]
}

interface Trump {
    robbed: boolean
    card: number
}

function getSuit(card: number) {
    if (card >= Suit.DIAMONDS) {
        return Suit.DIAMONDS
    }
    if (card >= Suit.CLUBS) {
        return Suit.CLUBS
    }
    if (card >= Suit.HEARTS) {
        return Suit.HEARTS
    }

    return Suit.SPADES
}

function getRank(suit: number, card: number): Rank {
    return card - suit
}

function isAceOfTrumps(card: number, suit: Suit) {
    return getRank(suit, card) === Rank.ACE;
}



const Game: FC = () => {

    const players = [...Array(5).keys()]

    const [hands, setHands] = useState([])

    const [lift, setLift] = useState(new Lift(
        players,
        2
    ))
    
    lift.onTake = (player, card) => {
        setHands()
    }

    const [trump, setTrump] = useState<Trump>()
    const [currentPlayer, setCurrentPlayer] = useState<number>(0)
    const [releasedCard, setReleasedCard] = useState<boolean>(false)
    // const [robbing, setRobbing] = useState<boolean>(false)
    const [table, setTable] = useState<number[]>([])

    // function getCard(card: number, index: number, player: number) {

    //     const suit = getSuit(card)
    //     const rank = getRank(suit, card)

    //     function onCardClick() {
    //         if (robbing) {
    //             robTrump(card, player)
    //             return
    //         }
    //         playCard(card, player)
    //     }

    //     return <Card suit={suit} rank={rank} key={index} flipped={currentPlayer === player} onClick={onCardClick} ref={el => cardRef.current[index] = el} />
    // }

    function deal() {
        lift.deal()
    }

    function playCard(card: number, player: number) {
        if (currentPlayer === player) {
            if (currentPlayer === 0) {
                setSuit(getSuit(card))
            }
            setTable([
                ...table,
                card
            ])
            setHands((prevState) => ({
                ...prevState,
                [player]: prevState[player].filter(playerCard => playerCard !== card)
            }))
            setCurrentPlayer((previousPlayer) => ++previousPlayer)
        }
    }

    function robTrump(card: number, player: number) {
        if (!trump) {
            return
        }
        setReleasedCard(true)
        setTrump({
            ...trump,
            robbed: true,
        })
        setHands(prevState => {

            const hand = prevState[player]
                .filter(playerCard => playerCard !== card)

            hand.push(trump.card)

            return {
                ...prevState,
                [player]: hand
            }

        })
        setRobbing(false)
    }

    useEffect(() => {
        if (!trump) {
            return
        }

        if (currentPlayer !== 0) {
            return;
        }

        if (!isAceOfTrumps(trump.card, getSuit(trump.card))) {
            return;
        }

        if (trump.robbed) {
            return;
        }

        setRobbing(true)
        // If the A of trumps is turned up then the player may rob immediately and discard one of their cards
    }, [currentPlayer, trump])

    return (
        <section className="p-4 h-full flex flex-wrap" style={{backgroundImage: "url('/images/wallpapers/vintage-wallpaper.webp')"}}>
            <Button variant={trump ? Style.DANGER : Style.DEFAULT} className="absolute" onClick={deal}>
                {trump ? 'Restart game' : 'Start game'}
            </Button>
            <div className="mt-auto grid grid-cols-5 grid-flow-row w-full gap-y-4">
                <Deck trump={trump} card={releasedCard} />
                <Table cards={table} players={players} />
                <div className="col-span-5 grid grid-flow-row grid-cols-5">
                    {
                        players.map(
                            player => {
                                return (
                                    <Player name={`Player ${player + 1}`} key={player}>
                                        { 
                                            hands[player].map((card, index) => (
                                                <div className='border border-dashed aspect-[5/7] rounded' key={index}>
                                                    { card !== undefined ? getCard(card, index, player) : undefined }
                                                </div>
                                            )) 
                                        }
                                    </Player>
                                )
                            }
                        )
                    }
                </div>
            </div>
        </section>
    );
}

export default Game