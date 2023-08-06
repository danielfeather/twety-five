import { FC } from 'react';
import css from './Lobbies.module.css';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

type Lobby = {
  id: number;
  name: string;
  slots: number;
  players: number;
};

const Lobbies: FC = () => {
  const lobbies = [...Array(5)].map<Lobby>((value, index) => ({
    id: index + 1,
    name: `Lobby ${index + 1}`,
    slots: 5,
    players: 0,
  }));

  return (
    <div className={`px-4 flex flex-wrap h-full ${css.page}`}>
      {lobbies.map(({ id, name, players, slots }) => (
        <div className="flex w-full place-content-between items-center">
          {name}
          <span>
            {players} / {slots}
          </span>
          <span>
            <Link to={`/lobbies/${id}`}>
              <Button size="small">Join</Button>
            </Link>
          </span>
        </div>
      ))}
    </div>
  );
};

export default Lobbies;
