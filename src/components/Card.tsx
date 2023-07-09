import { FC, HTMLProps, forwardRef } from 'react'

export enum Suit {
	SPADES = 0,
	HEARTS = 13,
	CLUBS = 26,
	DIAMONDS = 39,
}

export enum Rank {
	ACE = 0,
	TWO = 1,
	THREE = 2,
	FOUR = 3,
	FIVE = 4,
	SIX = 5,
	SEVEN = 6,
	EIGHT = 7,
	NINE = 8,
	TEN = 9,
	JACK = 10,
	QUEEN = 11,
	KING = 12,
}

interface CardProps {
	card?: number
	suit?: Suit
	rank?: Rank
	flipped?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps & HTMLProps<HTMLDivElement>>((props, ref) => {

	const getImage = () => {
		if (props.suit !== undefined && props.rank !== undefined) {
			return `/images/cards/front-${props.suit + props.rank}.png`
		}

		if (props.card !== undefined) {
			return `/images/cards/front-${props.card}.png`
		}

		return ''
	}

	return (
		<div onClick={props.onClick} className={"shadow-2xl overflow-hidden rounded relative transition-transform " + props.className} ref={ref}>
			<img src={props.flipped ? getImage() : '/images/cards/back.png'} alt="Card" />
		</div>
	)
})

export default Card