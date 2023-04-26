import {FC, useState} from 'react'

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
	suit: Suit
	rank: Rank
}

const Card: FC<CardProps> = (props) => {
	const [flipped, setFlipped] = useState<boolean>(true)

	const onClickHandler = () => {
		setFlipped(!flipped)
	}

	let rankName = Rank[props.rank].toLowerCase()
	rankName = rankName.charAt(0).toUpperCase() + rankName.slice(1)
	let suitName = Suit[props.suit].toLowerCase()
	suitName = suitName.charAt(0).toUpperCase() + suitName.slice(1)

	const label = `${rankName} of ${suitName}`

	const getImage = () => {
		return `/images/cards/front-${(Math.round(props.suit) + Math.round(props.rank))}.png`
	}

	return (
		<div className="pl-4" onClick={onClickHandler}>
			<span className="mb-2">{label}</span>
			<div className="shadow-2xl overflow-hidden rounded">
				<img className="" src={flipped ? getImage() : '/images/cards/back.png'} alt="Back of card" />
			</div>
		</div>
	)
}

export default Card