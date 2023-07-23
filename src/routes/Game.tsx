import React, { FC, useState, useEffect } from 'react'
import Lift from '../components/Lift'
import Deck from '../components/Deck'
import { ActionType } from '../components/Lift'

const Game: FC = () => {

    const [trump, setTrump] = useState<number>()
    const [discarded, setDiscarded] = useState<number>()
    const [players, setPlayers] = useState<number[][]>(Array(5).fill(Array(5).fill(undefined)))
    const [nextPlayer, setNextPlayer] = useState<number>(2)
    const [score, setScore] = useState<number[]>(Array(5).fill(0))
    
    // function robTrump(card: number, player: number) {
    //     if (!trump) {
    //         return
    //     }
    //     setReleasedCard(true)
    //     setTrump({
    //         ...trump,
    //         robbed: true,
    //     })
    //     setHands(prevState => {

    //         const hand = prevState[player]
    //             .filter(playerCard => playerCard !== card)

    //         hand.push(trump.card)

    //         return {
    //             ...prevState,
    //             [player]: hand
    //         }

    //     })
    //     setRobbing(false)
    // }

    // useEffect(() => {
    //     if (!trump) {
    //         return
    //     }

    //     if (currentPlayer !== 0) {
    //         return;
    //     }

    //     if (!isAceOfTrumps(trump.card, getSuit(trump.card))) {
    //         return;
    //     }

    //     if (trump.robbed) {
    //         return;
    //     }

    //     setRobbing(true)
    //     // If the A of trumps is turned up then the player may rob immediately and discard one of their cards
    // }, [currentPlayer, trump])

    function onFinishHandler(winner: number) {
        // setScore
        console.log(winner)
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
            <div className="mt-auto grid grid-cols-5 grid-flow-row w-full gap-y-4">
                <Deck card={discarded} trump={ trump ? { card: trump, robbed: false } : undefined}></Deck>
                { trump ? <Lift players={players} player={nextPlayer} trump={trump} onPlay={onPlayHandler} onFinish={onFinishHandler} /> : undefined }
            </div>
        </section>
    );
}

export default Game