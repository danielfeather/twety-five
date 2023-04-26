import React, {useEffect, useState} from 'react'
import Card, {Rank, Suit} from './components/card'

interface Hands {
	[player: number]: number[]
}

function App() {

	const [cards, setCards] = useState([...Array(52).keys()])

	const players = [...Array(5).keys()]

	const [hands, setHands] = useState<Hands>({
		0: [],
		1: [],
		2: [],
		3: [],
		4: [],
	})

	function getSuit(card: number) {
		if (card >= Suit.DIAMONDS) {
			return Suit.DIAMONDS
		}
		if (card >= Suit.CLUBS) {
			return Suit.CLUBS
		}
		if (card >= Suit.HEARTS) {
			return Suit.HEARTS
		}

		return Suit.SPADES
	}

	function getRank(suit: number, card: number): Rank {
		return card - suit
	}

	function getCard(card: number, index: string) {

		const suit = getSuit(card)
		const rank = getRank(suit, card)

		return <Card suit={suit} rank={rank} key={index} />
	}

	function deal() {
		let availableCards = [...cards]

		for (const i in players) {
			if (hands[i].length > 5) {
				continue;
			}
			const playersCards = availableCards.slice(0, 5)
			availableCards = availableCards.filter(availableCard => !playersCards.includes(availableCard))
			setHands(prevState => ({
				...prevState,
				[i]: playersCards,
			}))
		}

		setCards(availableCards)
	}

	return (
		<section className="p-4">
			<button className="bg-neutral-200 px-4 py-2 mb-4" onClick={deal}>Start game</button>
			<div className="grid grid-cols-5 grid-flow-row gap-4">
				{
					players.map(
						(player) => {
							return (
								<div key={player}>
									<h2 className="text-2xl font-bold">Player {player + 1}</h2>
									{
										hands[player].map((card, index) => getCard(card, `${player}-${index}`))
									}
								</div>
							)
						}
					)
				}
			</div>
		</section>
	);
}

export default App;
