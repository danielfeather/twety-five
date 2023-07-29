import React, {FC, HTMLProps, Ref} from 'react'
import Card from './Card'

interface DeckProps {
    trump?: {
        card: number
        robbed: boolean
    }
    deckRef?: Ref<HTMLDivElement>
    card: number | undefined
}

function getTrumpCard(card: number, robbed: boolean) {
    if (!robbed) {
        return <Card card={card} flipped={true} />
    }

    return (
        <div className="relative">
            <Card card={card} flipped={true} />
            <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center">
                <span className="absolute bg-red-500 w-6 h-6 text-center text-white rounded-full -top-3">💸️</span>
            </div>
        </div>
    )
}

const Deck: FC<DeckProps & HTMLProps<HTMLDivElement>> = ({ trump, card, deckRef, ...props }) => {
    return (
        <div className={`grid grid-flow-row grid-cols-3 gap-4 ${props.className}`} {...props}>
            <div ref={deckRef}>
                <Card flipped={false} />
            </div>
            <div>
                {
                    trump ? getTrumpCard(trump.card, trump.robbed) : ''
                }
            </div>
            <div>
                { card ? <Card flipped={false} /> : '' }
            </div>
        </div>
    )
}

export default Deck