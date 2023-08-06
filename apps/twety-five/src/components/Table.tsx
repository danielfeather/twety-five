import React, {FC, HTMLProps, PropsWithChildren} from 'react'
import Card from './Card'
import table from './Table.module.css'

interface TableProps {
    cards: number[]
    players: number[][]
    deck: React.ReactNode
}

const Table: FC<PropsWithChildren<TableProps & HTMLProps<HTMLDivElement>>> = ({ cards, players, deck, ...props }) => {

    return (
        <div className={`relative border-gray-900 p-12 bg-green-900 border-8 rounded-full w-8/12`}>
            <div className='border border-green-800 border-2 p-16 rounded-full'>
                <div className='mx-auto w-6/12 grid grid-cols-5 gap-4 mb-4'>
                    <div className='col-start-2 col-span-3'>
                        {deck}
                    </div>
                </div>
                <div className={`mx-auto w-6/12 grid grid-flow-row grid-cols-5 gap-4`} >
                    {
                        players.map((playerCards, playerNumber) => {
                            return (
                                <div className={`outline-2 outline-green-800 aspect-[5/7] rounded ${ cards[playerNumber] ? '' : 'outline' }`} key={playerNumber}>
                                    { cards[playerNumber] ? <Card key={playerNumber} card={cards[playerNumber]} flipped={true} /> : '' }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='absolute w-full left-0 bottom-0 right-0  translate-y-3/4'>
                <div className='mx-auto w-4/12'>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default Table