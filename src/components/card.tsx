import {FC, useState} from 'react'

export enum Suit {
	SPADES = 's',
	HEARTS = 'h',
	CLUBS = 'c',
	DIAMONDS = 'd',
}

export enum Rank {
	ACE = 'ace',
	TWO = 'two',
	THREE = 'three',
	FOUR = 'four',
	FIVE = 'five',
	SIX = 'six',
	SEVEN = 'seven',
	EIGHT = 'eight',
	NINE = 'nine',
	TEN = 'ten',
	JACK = 'jack',
	QUEEN = 'queen',
	KING = 'king',
}

interface CardProps {
	state?: string
	suite?: Suit
	rank?: Rank
}

const Card: FC<CardProps> = (props) => {
	const [flipped, setFlipped] = useState<boolean>(false)

	const onClickHandler = () => {
		setFlipped(!flipped)
	}

	const getImage = () => {
		return '/images/cards/front-53.png'
	}

	return (
		<div className="rounded overflow-hidden shadow-2xl" onClick={onClickHandler}>
			<img src={flipped ? getImage() : '/images/cards/back.png'} alt="Back of card" />
		</div>
	)
}

export default Card