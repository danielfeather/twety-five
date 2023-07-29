import Game from "./Game";

class Lift {

    private deck: number[] = [...Array(52).keys()].sort(() => Math.random() - .5)

    /**
     * The trump suit for the lift
     */
    private trump: number|undefined

    /**
     * The suit for the lift, set by the first player
     */
    private suit: number|undefined
    /**
     * The current player
     */
    private player: number
    /**
     * The player who is currently winning the lift
     */
    private leader: number|undefined

    private hands: {
        [player: number]: number[]
    }

    public onFinish: ((winner: number) => void) | undefined
    // public onPlay: ((player: number, type: ActionType) => void) | undefined
    public onReady: (() => void) | undefined
    public onTake: ((player: number, card: number) => void) | undefined

    constructor(
        private players: number[],
        private dealer: number,
    ){
        this.hands = players.map(player => Array(5).fill(undefined))
        this.player = dealer + 1 > this.players.length - 1 ? 0 : dealer + 1
    }

    /**
     * Will deal all the players 3 cards each and then 2, followed by turning up the trump card
     */
    public deal() {
        this.players.forEach((player) => {        
            const cards = this.pick(3)
            if (this.onTake !== undefined) {
                // cards.forEach(card => this.onTake(player, card))
            }
        })
        this.hands[this.player] = this.pick(2)
        this.trump = this.deck.shift() as number
    }

    private pick(count: number): number[] {
        return this.deck.splice(0, count)
    }

    /**
     * Plays a card for the current player
     */
    public play(card: number): void {
        
    }

    /**
     * Determine whether the current player can rob
     */
    public canRob() {
        if (!this.trump) {
            throw new GameNotStartedError()
        }
        if (this.player === this.dealer && this.trump % 12 === 0) {
            return true
        }

        // TODO: Check whether the current player has the ace of trumps

        return false
    }

    /**
     * Will fire on completion of the lift with the player who won 
     */
    private finish(winner :number) {
        if (this.onFinish) {
            this.onFinish(winner)
        }
    }

}

class GameNotStartedError extends Error {
    message = 'The game has not started'
}

class CardNotPlayableError extends Error {
    message = 'Cannot play the specified card, check player hand and rules'
}

export default Lift