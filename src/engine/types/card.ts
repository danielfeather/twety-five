const Suits = {
    SPADES: 0,
    HEARTS: 13,
    CLUBS: 26,
    DIAMONDS: 39
} as const

const Ranks = {
    ACE: 0,
    TWO: 1,
	THREE: 2,
	FOUR: 3,
	FIVE: 4,
	SIX: 5,
	SEVEN: 6,
	EIGHT: 7,
	NINE: 8,
	TEN: 9,
	JACK: 10,
	QUEEN: 11,
	KING: 12,
} as const

type ObjectValues<T> = T[keyof T]

export type SuitType = ObjectValues<typeof Suits>
export type RankType = ObjectValues<typeof Ranks>

export { Suits, Ranks }