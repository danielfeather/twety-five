import React, {useEffect, useState} from 'react'
import Card, {Rank, Suit} from './components/Card'
import Button, {Style} from './components/Button'
import {createPortal} from 'react-dom'
import Alert, {Severity} from "./components/Alert";

interface Hands {
	[player: number]: number[]
}

interface Trump {
	robbed: boolean
	card: number
	suit: Suit
	rank: Rank
}

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

function isAceOfTrumps(card: number, suit: Suit) {
	return getRank(suit, card) === Rank.ACE;
}

function App() {

	const [trump, setTrump] = useState<Trump>()
	const players = [...Array(5).keys()]
	const [currentPlayer, setCurrentPlayer] = useState<number>(0)
	const [releasedCard, setReleasedCard] = useState<boolean>()
	const [robbing, setRobbing] = useState<boolean>(false)
	const [table, setTable] = useState<number[]>([])

	const [hands, setHands] = useState<Hands>({
		0: [],
		1: [],
		2: [],
		3: [],
		4: [],
	})

	function getCard(card: number, index: number, player: number) {

		const suit = getSuit(card)
		const rank = getRank(suit, card)

		function onCardClick() {
			console.log(robbing)
			if (robbing) {
				robTrump(card, player)
				return
			}
			playCard(card, player)
		}

		return <Card suit={suit} rank={rank} key={index} flipped={currentPlayer === player} onClick={onCardClick} />
	}

	function deal() {
		setTable([])
		setCurrentPlayer(0)
		setReleasedCard(false)

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
			robbed: false,
			card: trumpCard,
			suit: trumpSuit,
			rank: getRank(trumpSuit, trumpCard)
		})
	}

	function playCard(card: number, player: number) {
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

	function robTrump(card: number, player: number) {
		if (!trump) {
			return
		}
		setReleasedCard(true)
		setTrump({
			...trump,
			robbed: true,
		})
		setHands(prevState => {

			const hand = prevState[player]
				.filter(playerCard => playerCard !== card)

			hand.push(trump.card)

			return {
				...prevState,
				[player]: hand
			}

		})
		setRobbing(false)
	}

	useEffect(() => {
		if (!trump) {
			return
		}

		if (currentPlayer !== 0) {
			return;
		}

		if (!isAceOfTrumps(trump.card, trump.suit)) {
			return;
		}

		if (trump.robbed) {
			return;
		}

		setRobbing(true)
		// If the A of trumps is turned up then the player may rob immediately and discard one of their cards
	}, [currentPlayer, trump])

	function getTrumpCard(suit: Suit, rank: Rank, robbed: boolean) {
		if (!robbed) {
			return <Card suit={suit} rank={rank} flipped={true} />
		}

		return (
			<div className="relative">
				<Card suit={suit} rank={rank} flipped={true} />
				<div className="absolute inset-0 bg-black bg-opacity-25">
					!
				</div>
			</div>
		)
	}

	return (
		<section className="p-4 h-full flex flex-wrap" style={{backgroundImage: "url('/images/wallpapers/vintage-wallpaper.webp')"}}>
			<Button variant={trump ? Style.DANGER : Style.DEFAULT} className="absolute" onClick={deal}>
				{trump ? 'Restart game' : 'Start game'}
			</Button>
			<div className="mt-auto grid grid-cols-5 grid-flow-row w-full gap-y-4">
				<div className="grid grid-flow-row row-start-1 grid-cols-3 gap-4 col-start-3">
					<div>
						<Card flipped={false} />
					</div>
					<div>
						{
							trump ? getTrumpCard(trump.suit, trump.rank, trump.robbed) : ''
						}
					</div>
					<div>
						{ releasedCard ? <Card flipped={false} /> : '' }
					</div>
				</div>
				<div className="col-span-3 col-start-2 row-start-2 grid grid-flow-row gap-4 grid-cols-9">
					<div className="grid grid-flow-row grid-cols-5 col-start-3 col-end-8 gap-4">
						{
							table.map(card => {
								const suit = getSuit(card)
								const rank = getRank(suit, card)
								return ( <Card key={card} suit={suit} rank={rank} flipped={true} /> )
							})
						}
					</div>
				</div>
				<div className="col-span-5 grid grid-flow-row grid-cols-5">
					{
						robbing ? createPortal(
							<Alert severity={Severity.CRITICAL} onConfirm={() => setRobbing(true)} onDeny={() => setRobbing(false)}>
								Since you dealt and the Ace of Trumps is turned up, you may rob it and
								discard one of your current cards. You can also choose not to do this.
							</Alert>, document.body) : false
					}
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
			</div>
		</section>
	);
}

export default App;
