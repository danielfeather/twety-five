import React, { FC, useState, useEffect } from 'react';
import Lift from './Lift';
import Deck from './Deck';
import { ActionType } from './Lift';
import PlayerCarousel from './PlayerCarousel';

const Game: FC = () => {
  const [trump, setTrump] = useState<number>();
  const [discarded, setDiscarded] = useState<number>();
  const [players, setPlayers] = useState<number[][]>(
    Array(5).fill(Array(5).fill(undefined))
  );
  const [nextPlayer, setNextPlayer] = useState<number>(2);
  const [score, setScore] = useState<number[]>(Array(5).fill(0));
  const [lift, setLift] = useState<number>(0);

  function onFinishHandler(winner: number) {
    setScore((prev) => {
      const newScore = [...prev];
      newScore[winner] += 5;
      return newScore;
    });
    setLift((prev) => prev + 1);
    setNextPlayer(winner);
  }

  function onPlayHandler(type: ActionType, from: number, card: number) {
    setPlayers((prevState) => {
      prevState[from] = prevState[from].filter(
        (playerCard) => playerCard !== card
      );
      return prevState;
    });
    setNextPlayer((previousPlayer) => {
      if (previousPlayer + 1 === players.length) {
        return 0;
      }

      return ++previousPlayer;
    });
    console.log('on play');
  }

  useEffect(() => {
    if (!trump) {
      let availableCards = [...Array(52).keys()].sort(
        () => Math.random() - 0.5
      );
      const playerHands: number[][] = [];
      players.forEach((player, index) => {
        const playersCards: number[] = availableCards.splice(0, 5);
        playerHands[index] = playersCards;
      });
      setPlayers(playerHands);
      setTrump(availableCards.shift());
    }
  }, [players, trump]);

  return (
    <section
      className="h-full flex flex-wrap justify-center items-center"
      style={{ backgroundImage: "url('/images/wallpapers/wood.png')" }}
    >
      <div className="absolute top-0">
        <PlayerCarousel players={score} current={nextPlayer} />
      </div>

      {trump ? (
        <Lift
          key={`${lift}`}
          players={players}
          player={nextPlayer}
          trump={trump}
          onPlay={onPlayHandler}
          onFinish={onFinishHandler}
          deck={
            <Deck
              card={discarded}
              trump={trump ? { card: trump, robbed: false } : undefined}
            ></Deck>
          }
        />
      ) : undefined}
    </section>
  );
};

export default Game;
