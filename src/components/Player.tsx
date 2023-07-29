import React, { Children, FC, PropsWithChildren } from 'react'

interface PlayerProps {
    name: string,
    cards?: number[]
}

const Player: FC<PropsWithChildren<PlayerProps>> = ({ name, children }) => {
    return (
        <div className='col-start-3'>
            <h2 className="text-2xl font-bold text-center text-white mb-4">{name}</h2>
            <div className='flex'>
                {children}
            </div>
        </div>
    )
}

export default Player