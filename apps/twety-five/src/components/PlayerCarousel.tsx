import { FC } from 'react';

type PlayerCarouselProps = {
  current: number;
  players: number[];
};

const PlayerCarousel: FC<PlayerCarouselProps> = ({ current, players }) => {
  return (
    <div className="flex h-full w-full gap-5">
      {players.map((score, index) => (
        <div key={index} className={`${current === index ? 'w-1/4' : ''}`}>
          <div className="relative">
            <img
              className="w-full border-4 rounded border-black"
              src={`https://ui-avatars.com/api/?name=Player+${index}`}
              alt=""
            />
            <span className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 inline-block w-6 h-6 rounded-full bg-black align-middle text-white text-center leading-6">
              {score}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayerCarousel;
