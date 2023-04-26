import {FC, useEffect, useState} from 'react'

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
	const [audio] = useState(new Audio('/sounds/deal.ogg'))
	const [playing, setPlaying] = useState(false)
	const [flipped, setFlipped] = useState<boolean>(true)

	useEffect(() => {
			playing ? audio.play() : audio.pause()
			!playing ? audio.currentTime = 0 : void(0)
		},
		[playing]
	);

	useEffect(() => {
		audio.addEventListener('ended', () => setPlaying(false));
		return () => {
			audio.removeEventListener('ended', () => setPlaying(false));
		};
	}, [audio]);

	const onClickHandler = () => {
		setFlipped(!flipped)
		setPlaying(true)
	}

	let rankName = Rank[props.rank].toLowerCase()
	rankName = rankName.charAt(0).toUpperCase() + rankName.slice(1)
	let suitName = Suit[props.suit].toLowerCase()
	suitName = suitName.charAt(0).toUpperCase() + suitName.slice(1)

	const label = `${rankName} of ${suitName}`

	const getImage = () => {
		return `/images/cards/front-${Math.round(props.suit) + Math.round(props.rank)}.png`
	}

	return (
		<div onClick={onClickHandler}>
			<span className="mb-2">{label}</span>
			<div className="shadow-2xl overflow-hidden rounded">
				<img className="" src={flipped ? getImage() : '/images/cards/back.png'} alt="Back of card" />
			</div>
		</div>
	)
}

export default Card