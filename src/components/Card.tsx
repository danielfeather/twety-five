import { FC, HTMLProps } from 'react'

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
	suit?: Suit
	rank?: Rank
	flipped?: boolean
}

const Card: FC<CardProps & HTMLProps<HTMLDivElement>> = (props) => {

	const getImage = () => {
		if (props.suit === undefined || props.rank === undefined) {
			return ''
		}

		return `/images/cards/front-${Math.round(props.suit) + Math.round(props.rank)}.png`
	}

	return (
		<div onClick={props.onClick} className={"shadow-2xl overflow-hidden rounded relative " + props.className}>
			<img src={props.flipped ? getImage() : '/images/cards/back.png'} alt="Back of card" />
		</div>
	)
}

export default Card