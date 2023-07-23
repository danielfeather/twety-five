import { FC, HTMLProps, forwardRef } from 'react'
import { RankType, SuitType } from '../engine/types/card'

interface CardProps {
	card?: number
	suit?: SuitType
	rank?: RankType
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