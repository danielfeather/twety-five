import React, {FC, useEffect, useMemo, useRef, useState} from 'react'
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

function getRankings(suit: Suit, trump = false) {

    if (suit === Suit.CLUBS || suit === Suit.SPADES) {
        return (!trump ? [
            Rank.KING, Rank.QUEEN, Rank.JACK, Rank.ACE, Rank.TWO, Rank.THREE, Rank.FOUR, Rank.FIVE, Rank.SIX, Rank.SEVEN, Rank.EIGHT, Rank.NINE, Rank.TEN
        ] : [
            Rank.FIVE, Rank.JACK, [Suit.HEARTS, Rank.ACE], Rank.ACE, Rank.KING, Rank.QUEEN, Rank.TWO, Rank.THREE, Rank.FOUR, Rank.SIX, Rank.SEVEN, Rank.EIGHT, Rank.NINE, Rank.TEN
        ]).map(rankOrArray => {
            if (Array.isArray(rankOrArray)) {
                return rankOrArray.reduce((prev, current) => prev + current)
            }

            return rankOrArray + suit
        })
    }

    if (suit === Suit.HEARTS) {
        return (!trump ? [
            Rank.KING, Rank.QUEEN, Rank.JACK, Rank.TEN, Rank.NINE, Rank.EIGHT, Rank.SEVEN, Rank.SIX, Rank.FIVE, Rank.FOUR, Rank.THREE, Rank.TWO
        ] : [
            Rank.FIVE, Rank.JACK, Rank.ACE, Rank.KING, Rank.QUEEN, Rank.TEN, Rank.NINE, Rank.EIGHT, Rank.SEVEN, Rank.SIX, Rank.FOUR, Rank.THREE, Rank.TWO
        ]).map(rankOrArray => {
            if (Array.isArray(rankOrArray)) {
                return rankOrArray.reduce((prev, current) => prev + current)
            }

            return rankOrArray + suit
        })
    }

    return (!trump ? [
        Rank.KING, Rank.QUEEN, Rank.JACK, Rank.TEN, Rank.NINE, Rank.EIGHT, Rank.SEVEN, Rank.SIX, Rank.FIVE, Rank.FOUR, Rank.THREE, Rank.TWO, Rank.ACE
    ] : [
        Rank.FIVE, Rank.JACK, [Suit.HEARTS, Rank.ACE], Rank.ACE, Rank.KING, Rank.QUEEN, Rank.TEN, Rank.NINE, Rank.EIGHT, Rank.SEVEN, Rank.SIX, Rank.FOUR, Rank.THREE, Rank.TWO
    ]).map(rankOrArray => {
        if (Array.isArray(rankOrArray)) {
            return rankOrArray.reduce((prev, current) => prev + current)
        }

        return rankOrArray + suit
    })

}

const Game: FC = () => {

    const [trump, setTrump] = useState<Trump>()
    const [deck, setDeck] = useState<number[]>([...Array(52).keys()].sort(() => Math.random() - .5))
    const [players, setPlayers] = useState<number[]>([...Array(5).keys()])
    const [currentPlayer, setCurrentPlayer] = useState<number>(0)
    const [releasedCard, setReleasedCard] = useState<boolean>(false)
    const [robbing, setRobbing] = useState<boolean>(false)
    const [table, setTable] = useState<number[]>([])
    const [suit, setSuit] = useState<Suit>()

    const deckRef = useRef<HTMLDivElement>(null)

    const [state, setState] = useState<string>()

    const [currentlyReceivingCards, setCurrentlyReceivingCards] = useState<number>()

    const cardRef = useRef<Array<HTMLDivElement|null>>([])

    const winner = useMemo(() => {

        if (!trump?.card) {
            return []
        }

        return [...table].sort((a, b) => {
                
            const trumpSuit = getSuit(trump.card)

            const aSuit = getSuit(a)
            const aRank = getRank(aSuit, a)
            const bSuit = getSuit(b)
            const bRank = getRank(bSuit, b)
            
            console.log(`Comparing [${Rank[aRank]} of ${Suit[aSuit]}] to [${Rank[bRank]} of ${Suit[bSuit]}]`)

            if (aSuit === trumpSuit || a === 13) {
                if (bSuit === trumpSuit || b === 13) {
                    
                    const rankings = getRankings(trumpSuit, true)

                    const aRanking = rankings.indexOf(a)
                    const bRanking = rankings.indexOf(b)
                    
                    console.log(`[${Rank[bRank]} of ${Suit[bSuit]}] is ${bRanking < aRanking ? 'better than' : 'not better than'} [${Rank[aRank]} of ${Suit[aSuit]}]`)
                    return bRanking < aRanking ? 1 : -1

                }

                return -1
            }

            if (bSuit === suit) {
                
                if (aSuit !== suit) {
                    return 1
                }
                
                const rankings = getRankings(suit)

                const aRanking = rankings.indexOf(a)
                const bRanking = rankings.indexOf(b)
                
                console.log(`[${Rank[bRank]} of ${Suit[bSuit]}] is ${bRanking < aRanking ? 'better than' : 'not better than'} [${Rank[aRank]} of ${Suit[aSuit]}]`)
                return bRanking < aRanking ? 1 : -1

            }

            return 0

        })
    }, [table, trump, suit])

    const [hands, setHands] = useState<Hands>({
        0: Array(5).fill(undefined),
        1: Array(5).fill(undefined),
        2: Array(5).fill(undefined),
        3: Array(5).fill(undefined),
        4: Array(5).fill(undefined),
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

        // let availableCards = [...Array(52).keys()].sort(() => Math.random() - .5)
        // for (const i in players) {
        //     if (hands[i].length > 5) {
        //         continue;
        //     }
        //     const playersCards = availableCards.slice(0, 5)
        //     availableCards = availableCards.filter(availableCard => !playersCards.includes(availableCard))
        //     setHands(prevState => ({
        //         ...prevState,
        //         [i]: playersCards,
        //     }))
        // }

        const availableCards = deck

        const trumpCard = availableCards.shift() as number

        setDeck(availableCards)

        setTrump({
            robbed: false,
            card: trumpCard,
        })

        setState('dealing')
    }

    useEffect(() => {
        
        if (state === 'dealing') {
            
            const receiver = currentlyReceivingCards === undefined ? 1 : currentlyReceivingCards

            setTimeout(() => {
                
                if(currentlyReceivingCards === 0) {
                    setCurrentlyReceivingCards(undefined)
                    setState('playing')
                    return
                }

                const playersCards = deck.slice(0, 5)
                setDeck(deck.filter(availableCard => !playersCards.includes(availableCard)))
                setHands(prevState => ({
                    ...prevState,
                    [receiver]: playersCards,
                }))
                if(currentlyReceivingCards === 4) {
                    setCurrentlyReceivingCards(0)
                    return
                }
                setCurrentlyReceivingCards(receiver + 1)
            }, 1000)
        }

    }, [state, hands, currentlyReceivingCards, deck])

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
        if (winner.length === players.length) {
            setTimeout(() => alert(`Player ${(table.indexOf([...winner].shift() as number)) + 1} wins!`))
        }
    },[players, winner, table])

    return (
        <section className="p-4 h-full flex flex-wrap" style={{backgroundImage: "url('/images/wallpapers/vintage-wallpaper.webp')"}}>
            <Button variant={trump ? Style.DANGER : Style.DEFAULT} className="absolute" onClick={deal}>
                {trump ? 'Restart game' : 'Start game'}
            </Button>
            <div className="mt-auto grid grid-cols-5 grid-flow-row w-full gap-y-4">
                <Deck trump={trump} card={releasedCard} deckRef={deckRef} />
                <div className="col-span-3 col-start-2 row-start-2 grid grid-flow-row gap-4 grid-cols-9">
                    <Table cards={table} className="col-start-3 col-end-8" players={players} />
                </div>
                <div className="col-span-5 grid grid-flow-row grid-cols-5">
                    {
                        players.map(
                            player => {
                                return (
                                    <Player name={`Player ${player + 1}`}>
                                        { 
                                            hands[player].map((card, index) => (
                                                <div className='border border-dashed aspect-[5/7] rounded' ref={el => cardRef.current[index] = el}>
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