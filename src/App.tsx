import React, {useEffect, useState} from 'react'
import Card, {Rank, Suit} from './components/card'

interface Hands {
	[player: number]: number[]
}

interface Trump {
	suit: Suit
	rank: Rank
}

function App() {

	const [cards, setCards] = useState<number[]>([])
	const [trump, setTrump] = useState<Trump>()
	const players = [...Array(5).keys()]
	const [currentPlayer, setCurrentPlayer] = useState<number>(0)
	const [releasedCard, setReleasedCard] = useState<number>()

	const [table, setTable] = useState<number[]>([])

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

	function getCard(card: number, index: number, player: number) {

		const suit = getSuit(card)
		const rank = getRank(suit, card)

		function onCardClick() {
			if (currentPlayer === player) {
				setTable([
					...table,
					card
				])
				setHands((prevState) => ({
					...prevState,
					[player]: prevState[player].filter(playerCard => playerCard !== card)
				}))
				setCurrentPlayer((previousPlayer) => ++previousPlayer)
			}
		}

		return <Card suit={suit} rank={rank} key={index} flipped={currentPlayer === player} onClick={onCardClick} />
	}

	function deal() {
		setTable([])
		setCurrentPlayer(0)

		let availableCards = [...Array(52).keys()].sort(() => Math.random() - .5)
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

		const trumpCard = availableCards.shift() as number
		const trumpSuit = getSuit(trumpCard)

		setTrump({
			suit: trumpSuit,
			rank: getRank(trumpSuit, trumpCard)
		})

		setCards(availableCards)
	}

	return (
		<section className="p-4 h-full flex flex-wrap" style={{backgroundImage: "url('/images/wallpapers/vintage-wallpaper.webp')"}}>
			<button className="bg-neutral-200 px-4 py-2 mb-4 absolute" onClick={deal}>Start game</button>
			<div className="w-1/5 mx-auto grid grid-cols-3 grid-flow-row gap-4">
				<div>
					<Card flipped={false} />
				</div>
				<div>
					{ trump ? <Card suit={trump.suit} rank={trump.rank} flipped={true} /> : ''}
				</div>
			</div>
			<div className="grid grid-flow-row gap-4 grid-cols-5">
				{
					table.map(card => {
						const suit = getSuit(card)
						const rank = getRank(suit, card)
						return ( <Card key={card} suit={suit} rank={rank} flipped={true} /> )
					})
				}
			</div>
			<div className="mt-auto grid grid-cols-5 grid-flow-row w-full">
				{
					players.map(
						(player) => {
							return (
								<div className="first:border-l-0 border-l-4 p-4" key={player}>
									<h2 className="text-2xl font-bold text-center text-white mb-4">Player {player + 1}</h2>
									<div className="grid grid-cols-3 grid-flow-row gap-4">
										{
											hands[player].map((card, index) => getCard(card, index, player))
										}
									</div>
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
