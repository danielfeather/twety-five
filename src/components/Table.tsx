import React, {FC, HTMLProps, PropsWithChildren} from 'react'
import Card from './Card'

interface TableProps {
    cards: number[]
    players: number[]
}

const Table: FC<PropsWithChildren<TableProps & HTMLProps<HTMLDivElement>>> = ({ cards, players, ...props }) => {

    return (
        <div {...props} className={`grid grid-flow-row grid-cols-5 gap-4 ${props.className}`} >
            {
                players.map((player) => {
                    return (
                        <div className="border border-dashed aspect-[5/7] rounded">
                            { cards[player] ? <Card card={cards[player]} flipped={true} /> : '' }
                        </div>
                    )
                })
            }
        </div>
    )


}

export default Table