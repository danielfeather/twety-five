import React, { FC, HTMLProps, PropsWithChildren } from 'react';
import Card from './Card';
import table from './Table.module.css';

interface TableProps {
  cards: number[];
  players: number[][];
  deck: React.ReactNode;
}

const Table: FC<PropsWithChildren<TableProps & HTMLProps<HTMLDivElement>>> = ({
  cards,
  players,
  deck,
  ...props
}) => {
  return (
    <div
      className={`relative w-full border-gray-900 p-4 pt-12 bg-green-900 border-y-8 md:w-8/12`}
    >
      <div className="absolute w-full left-0 top-0 right-0 -translate-y-1/2">
        <div className="mx-auto grid grid-cols-5 gap-4 mb-4">
          <div className="col-start-2 col-span-3">{deck}</div>
        </div>
      </div>
      <div className={`px-4 w-full flex place-content-between`}>
        {players.map((playerCards, playerNumber) => {
          return (
            <div className={`aspect-[5/7] flex-1 -ml-4`} key={playerNumber}>
              {cards[playerNumber] ? (
                <Card
                  key={playerNumber}
                  card={cards[playerNumber]}
                  flipped={true}
                />
              ) : (
                ''
              )}
            </div>
          );
        })}
      </div>

      <div className="">
        <div className="mx-auto w-4/12">{props.children}</div>
      </div>
    </div>
  );
};

export default Table;
