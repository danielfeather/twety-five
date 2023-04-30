import React, {FC} from 'react'
import Button, {Style} from "../components/Button";
import {Link} from "react-router-dom";

const Index: FC = () => {
    return (
        <section className="p-4 h-full flex flex-wrap items-center justify-center text-white" style={{backgroundImage: "url('/images/wallpapers/denim.webp')"}}>
            <h1 className="text-4xl">
                25 The Card Game
            </h1>
            <Link to={`/games/${crypto.randomUUID()}`}>
                <Button variant={Style.DEFAULT}>
                    New game
                </Button>
            </Link>
        </section>
    )
}

export default Index