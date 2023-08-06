import React, { Children, FC, PropsWithChildren } from 'react';

interface PlayerProps {
  name: string;
  cards?: number[];
}

const Player: FC<PropsWithChildren<PlayerProps>> = ({ name, children }) => {
  return (
    <div className="flex absolute p-4 bottom-0 left-0 right-0">{children}</div>
  );
};

export default Player;
