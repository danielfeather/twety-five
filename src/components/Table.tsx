import React, {FC, HTMLProps, PropsWithChildren} from 'react'
import Card from './Card'

interface TableProps {
    cards: number[]
    players: number[][]
}

const Table: FC<PropsWithChildren<TableProps & HTMLProps<HTMLDivElement>>> = ({ cards, players, ...props }) => {

    return (
        <div className="col-span-3 col-start-2 row-start-2 grid grid-flow-row gap-4 grid-cols-9 p-8 bg-green-900 border-yellow-950 border-8 rounded-full shadow-inner-lg">
            <div className={`grid grid-flow-row grid-cols-5 gap-4 col-start-3 col-end-8`} >
                {
                    players.map((playerCards, playerNumber) => {
                        return (
                            <div className={`outline-1 outline-green-800 aspect-[5/7] rounded ${ cards[playerNumber] ? '' : 'outline' }`} key={playerNumber}>
                                { cards[playerNumber] ? <Card key={playerNumber} card={cards[playerNumber]} flipped={true} /> : '' }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Table