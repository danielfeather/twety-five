import { FC, useEffect, useMemo, useState } from 'react'
import Deck from './Deck'
import Table from './Table'
import Player from './Player'
import Card from './Card'
import { getSuit, getRank, getRankings } from '../engine/util/cards'
import { Ranks, cardLabel } from '../engine/types/card'

export const ACTIONS = {
    CARD: 'card',
    ROB: 'rob', 
} as const

type ObjectValues<T> = T[keyof T]

export type ActionType = ObjectValues<typeof ACTIONS>

type LiftProps = {
    trump: number
    player: number
    players: number[][]
    onPlay: ((type: ActionType, player: number, card: number) => void) | undefined
    onFinish: ((winner: number) => void) | undefined
}

const Lift: FC<LiftProps> = ({ players, player, trump, onPlay, onFinish }) => {
    
    const [startingPlayer, setStartingPlayer] = useState<number>(player)
    const [table, setTable] = useState<number[]>([])
    const [suit, setSuit] = useState<number>()

    const winner = useMemo(() => {

        return [...table].sort((a, b) => {
                
            const trumpSuit = getSuit(trump)
            const aSuit = getSuit(a)
            const aRank = getRank(aSuit, a)
            const bSuit = getSuit(b)
            const bRank = getRank(bSuit, b)

            if (aRank === false || bRank === false) {
                throw new Error('Unable to determine rank')
            }

            if (aSuit === trumpSuit || a === 13) {
                if (bSuit === trumpSuit || b === 13) {
                    
                    const rankings = getRankings(trumpSuit, true)

                    const aRanking = rankings.indexOf(a)
                    const bRanking = rankings.indexOf(b)
                    

                    console.log(`[${cardLabel(b)}] is ${bRanking < aRanking ? 'better than' : 'not better than'} [${cardLabel(a)}]`)
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
                
                console.log(`[${cardLabel(b)}] is ${bRanking < aRanking ? 'better than' : 'not better than'} [${cardLabel(a)}]`)
                return bRanking < aRanking ? 1 : -1

            }

            return 0

        })
    }, [table, trump, suit])

    useEffect(() => {
        if (winner.length === players.length) {
            if (onFinish) {
                const position = table.indexOf(winner.shift() as number)
                const order: number[] = []
                for(let i = startingPlayer; i < players.length + startingPlayer; i++) {
                    if (i > players.length - 1) {
                        order.push(i - players.length)
                        continue
                    }
                    order.push(i)
                }
                // TODO: Ensure this only runs once. This is running twice?
                onFinish(order[position])
            }
        }
    }, [winner, table, startingPlayer, onFinish, players])

    function getCard(card: number, index: number, to: number) {

        const suit = getSuit(card)
        const rank = getRank(suit, card)

        if (rank === false) {
            throw new Error('Unknown card')
        }

        function onCardClick() {
            // if (robbing) {
            //     robTrump(card, player)
            //     return
            // }
            playCard(card, player)
        }

        return <Card suit={suit} rank={rank} key={index} flipped={player === to} onClick={onCardClick} />
    }

    function playCard(card: number, from: number) {
        if (table.length === players.length) {
            return
        }
        if (player === from) {
            if (player === startingPlayer) {
                setSuit(getSuit(card))
            }
            setTable([
                ...table,
                card
            ])
            if (onPlay) {
                onPlay(ACTIONS.CARD, player, card)
            }
        }
    }
    
    return (
        <>
            <Table cards={table} players={players}></Table>
            <div className="col-span-5 grid grid-flow-row grid-cols-5">
                {
                    players.map(
                        (playerCards, playerNumber) => {
                            return (
                                <Player name={`Player ${playerNumber + 1}`} key={playerNumber}>
                                    { playerCards.map((card, index) => (
                                        <div className='border border-dashed aspect-[5/7] rounded' key={index}>
                                            { card !== undefined ? getCard(card, index, playerNumber) : undefined }
                                        </div>
                                    )) }
                                </Player>
                            )
                        }
                    )
                }
            </div>
        </>
    )

}

export default Lift