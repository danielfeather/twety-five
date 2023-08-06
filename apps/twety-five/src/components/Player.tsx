import React, { Children, FC, PropsWithChildren } from 'react'

interface PlayerProps {
    name: string,
    cards?: number[]
}

const Player: FC<PropsWithChildren<PlayerProps>> = ({ name, children }) => {
    return (
        <div className='flex'>
            {children}
        </div>
    )
}

export default Player