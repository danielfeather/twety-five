import React, { FC, PropsWithChildren } from 'react'

interface PlayerProps {
    name: string,
    cards?: number[]
}

const Player: FC<PropsWithChildren<PlayerProps>> = ({ name, children }) => {
    return (
        <div className="first:border-l-0 border-l-4 p-4">
            <h2 className="text-2xl font-bold text-center text-white mb-4">{name}</h2>
            <div className="grid grid-cols-3 grid-flow-row gap-4">
                { children }
            </div>
        </div>
    )
}

export default Player