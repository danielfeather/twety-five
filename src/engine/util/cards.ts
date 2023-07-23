import { SuitType, Suits, RankType, Ranks } from '../types/card'

export function getSuit(card: number): SuitType {
    if (card >= Suits.DIAMONDS) {
        return Suits.DIAMONDS
    }
    if (card >= Suits.CLUBS) {
        return Suits.CLUBS
    }
    if (card >= Suits.HEARTS) {
        return Suits.HEARTS
    }

    return Suits.SPADES
}

export function getRank(suit: SuitType, card: number): RankType|false {
    const rank = card - suit
    
    if (rank <= 12 && rank >= 0) {
        return rank as RankType
    }

    return false
}

export function getRankings(suit: SuitType, trump = false) {

    if (suit === Suits.CLUBS || suit === Suits.SPADES) {
        return (!trump ? [
            Ranks.KING, Ranks.QUEEN, Ranks.JACK, Ranks.ACE, Ranks.TWO, Ranks.THREE, Ranks.FOUR, Ranks.FIVE, Ranks.SIX, Ranks.SEVEN, Ranks.EIGHT, Ranks.NINE, Ranks.TEN
        ] : [
            Ranks.FIVE, Ranks.JACK, [Suits.HEARTS, Ranks.ACE], Ranks.ACE, Ranks.KING, Ranks.QUEEN, Ranks.TWO, Ranks.THREE, Ranks.FOUR, Ranks.SIX, Ranks.SEVEN, Ranks.EIGHT, Ranks.NINE, Ranks.TEN
        ]).map(rankOrArray => {
            if (Array.isArray(rankOrArray)) {
                return rankOrArray.reduce<number>((prev, current) => prev + current, 0)
            }

            return rankOrArray + suit
        })
    }

    if (suit === Suits.HEARTS) {
        return (!trump ? [
            Ranks.KING, Ranks.QUEEN, Ranks.JACK, Ranks.TEN, Ranks.NINE, Ranks.EIGHT, Ranks.SEVEN, Ranks.SIX, Ranks.FIVE, Ranks.FOUR, Ranks.THREE, Ranks.TWO
        ] : [
            Ranks.FIVE, Ranks.JACK, Ranks.ACE, Ranks.KING, Ranks.QUEEN, Ranks.TEN, Ranks.NINE, Ranks.EIGHT, Ranks.SEVEN, Ranks.SIX, Ranks.FOUR, Ranks.THREE, Ranks.TWO
        ]).map(rankOrArray => {
            if (Array.isArray(rankOrArray)) {
                return rankOrArray.reduce((prev, current) => prev + current)
            }

            return rankOrArray + suit
        })
    }

    return (!trump ? [
        Ranks.KING, Ranks.QUEEN, Ranks.JACK, Ranks.TEN, Ranks.NINE, Ranks.EIGHT, Ranks.SEVEN, Ranks.SIX, Ranks.FIVE, Ranks.FOUR, Ranks.THREE, Ranks.TWO, Ranks.ACE
    ] : [
        Ranks.FIVE, Ranks.JACK, [Suits.HEARTS, Ranks.ACE], Ranks.ACE, Ranks.KING, Ranks.QUEEN, Ranks.TEN, Ranks.NINE, Ranks.EIGHT, Ranks.SEVEN, Ranks.SIX, Ranks.FOUR, Ranks.THREE, Ranks.TWO
    ]).map(rankOrArray => {
        if (Array.isArray(rankOrArray)) {
            return rankOrArray.reduce<number>((prev, current) => prev + current, 0)
        }

        return rankOrArray + suit
    })

}