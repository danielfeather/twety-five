class Game {

    public dealer: number|undefined

    constructor(
        private players: number[]
    ){}

    public init() {
        this.dealer = Math.floor(Math.random() * this.players.length)
    }
}

export default Game