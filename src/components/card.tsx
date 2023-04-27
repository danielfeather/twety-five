import {FC, HTMLProps, useEffect, useState} from 'react'

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
	const [audio] = useState(new Audio('/sounds/deal.ogg'))
	const [playing, setPlaying] = useState(false)
	const [flipped, setFlipped] = useState<boolean>(!!props.flipped)

	useEffect(() => {
			playing ? audio.play() : audio.pause()
			!playing ? audio.currentTime = 0 : void(0)
		},
		[playing, audio]
	);

	useEffect(() => {
		audio.addEventListener('ended', () => setPlaying(false));
		return () => {
			audio.removeEventListener('ended', () => setPlaying(false));
		};
	}, [audio]);

	const onClickHandler = () => {
		if (props.suit === undefined || !props.rank === undefined) {
			console.log(props)
			return
		}
		setFlipped(!flipped)
		setPlaying(true)
	}

	const getImage = () => {
		if (props.suit === undefined || props.rank === undefined) {
			return ''
		}

		return `/images/cards/front-${Math.round(props.suit) + Math.round(props.rank)}.png`
	}

	return (
		<div {...props} onClick={onClickHandler} className={"shadow-2xl overflow-hidden rounded relative " + props.className}>
			<img src={flipped ? getImage() : '/images/cards/back.png'} alt="Back of card" />
		</div>
	)
}

export default Card