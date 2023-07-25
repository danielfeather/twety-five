import React, { FC, useState, useEffect } from 'react'
import Lift from '../components/Lift'
import Deck from '../components/Deck'
import { ActionType } from '../components/Lift'

const Game: FC = () => {

    const [trump, setTrump] = useState<number>()
    const [discarded, setDiscarded] = useState<number>()
    const [players, setPlayers] = useState<number[][]>(Array(5).fill(Array(5).fill(undefined)))
    const [nextPlayer, setNextPlayer] = useState<number>(2)
    const [score, setScore] = useState<{[id: number]: number}>([])
    const [lift, setLift] = useState<number>(0)

    function onFinishHandler(winner: number) {
        setScore(prev => ({
            ...prev,
            [winner]: prev[winner] ? prev[winner] + 5 : 5
        }))
        setLift(prev => prev + 1)
        setNextPlayer(winner)
    }

    function onPlayHandler(type: ActionType, from: number, card: number) {
        setPlayers((prevState) => {
            prevState[from] = prevState[from].filter(playerCard => playerCard !== card)
            return prevState
        })
        setNextPlayer((previousPlayer) => {
            if (previousPlayer + 1 === players.length) {
                return 0
            }

            return ++previousPlayer
        })
        console.log('on play')
    }

    useEffect(() => {
        if (!trump) {
            let availableCards = [...Array(52).keys()].sort(() => Math.random() - .5)
            const playerHands: number[][] = []
            players.forEach((player, index) => {
                const playersCards: number[] = availableCards.splice(0, 5)
                playerHands[index] = playersCards
            })
            setPlayers(playerHands)
            setTrump(availableCards.shift())
        }
    }, [players, trump])

    return (
        <section className="p-4 h-full flex flex-wrap" style={{backgroundImage: "url('/images/wallpapers/vintage-wallpaper.webp')"}}>
            <ul>
                {
                    Object.keys(score).map(id => <li key={id}>{id}: {score[parseInt(id)]}</li>)
                }
            </ul>
            <div className="mt-auto grid grid-cols-5 grid-flow-row w-full gap-y-4">
                <Deck card={discarded} trump={ trump ? { card: trump, robbed: false } : undefined}></Deck>
                { trump ? <Lift key={`${lift}`} players={players} player={nextPlayer} trump={trump} onPlay={onPlayHandler} onFinish={onFinishHandler} /> : undefined }
            </div>
        </section>
    );
}

export default Game