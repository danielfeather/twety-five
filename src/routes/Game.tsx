import React, {FC, useEffect, useState} from 'react'
import Card, {Rank, Suit} from '../components/Card'
import Button, {Style} from '../components/Button'
import Player from '../components/Player'
import Table from "../components/Table";
import Deck from "../components/Deck";

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
    const [trump, setTrump] = useState<Trump>()
    const [players, setPlayers] = useState<number[]>([...Array(5).keys()])
    const [currentPlayer, setCurrentPlayer] = useState<number>(0)
    const [releasedCard, setReleasedCard] = useState<boolean>(false)
    const [robbing, setRobbing] = useState<boolean>(false)
    const [table, setTable] = useState<number[]>([])
    const [suit, setSuit] = useState<Suit>()

    const [hands, setHands] = useState<Hands>({
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
    })

    function getCard(card: number, index: number, player: number) {

        const suit = getSuit(card)
        const rank = getRank(suit, card)

        function onCardClick() {
            if (robbing) {
                robTrump(card, player)
                return
            }
            playCard(card, player)
        }

        return <Card suit={suit} rank={rank} key={index} flipped={currentPlayer === player} onClick={onCardClick} />
    }

    function deal() {
        setTable([])
        setCurrentPlayer(0)
        setReleasedCard(false)

        let availableCards = [...Array(52).keys()].sort(() => Math.random() - .5)
        for (const i in players) {
            if (hands[i].length > 5) {
                continue;
            }
            const playersCards = availableCards.slice(0, 5)
            availableCards = availableCards.filter(availableCard => !playersCards.includes(availableCard))
            setHands(prevState => ({
                ...prevState,
                [i]: playersCards,
            }))
        }

        const trumpCard = availableCards.shift() as number

        setTrump({
            robbed: false,
            card: trumpCard,
        })
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

    useEffect(() => {
        if (table.length === players.length && trump?.card) {
            
            // const sorted = [...table].sort((a, b) => {
                
            //     const trumpSuit = getSuit(trump.card)

            //     const aSuit = getSuit(a)
            //     const aRank = getRank(aSuit, a)
            //     const bSuit = getSuit(b)
            //     const bRank = getRank(bSuit, b)

            //     if (aSuit !== trumpSuit && bSuit !== trumpSuit) {

            //     }

            // })

            // Trumps
            // 1. 5 of Trumps
            // 2. Jack of Trumps
            // 3. Ace of Hearts40608143
            // 4. King and Queen
            // 5. Highest in Red / Lowest in Black

            // Non-Trumps
            // 1.
        }
    },[table, players, trump])

    return (
        <section className="p-4 h-full flex flex-wrap" style={{backgroundImage: "url('/images/wallpapers/vintage-wallpaper.webp')"}}>
            <Button variant={trump ? Style.DANGER : Style.DEFAULT} className="absolute" onClick={deal}>
                {trump ? 'Restart game' : 'Start game'}
            </Button>
            <div className="mt-auto grid grid-cols-5 grid-flow-row w-full gap-y-4">
                <Deck trump={trump} card={releasedCard} />
                <div className="col-span-3 col-start-2 row-start-2 grid grid-flow-row gap-4 grid-cols-9">
                    <Table cards={table} className="col-start-3 col-end-8" players={players} />
                </div>
                <div className="col-span-5 grid grid-flow-row grid-cols-5">
                    {
                        players.map(
                            player => {
                                return (
                                    <Player name={`Player ${player + 1}`}>
                                        { hands[player].map((card, index) => getCard(card, index, player)) }
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