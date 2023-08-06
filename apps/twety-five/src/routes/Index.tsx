import React, { FC } from 'react';
import Button, { Style } from '../components/Button';
import { Link } from 'react-router-dom';

import translations from '../locales/en/translation.json';
import css from './Index.module.css';

const Index: FC = () => {
  const items = [
    { name: translations.home.menu.play, to: '/play' },
    { name: translations.home.menu.findLobby, to: '/lobbies' },
    { name: translations.home.menu.createLobby, to: '/lobbies/create' },
    { name: translations.home.menu.settings, to: '/settings' },
  ];
  return (
    <section
      className={`p-4 h-full flex flex-wrap items-center justify-center text-white ${css.page}`}
    >
      <div className="w-full">
        <h1 className="w-full text-4xl mb-4 text-center font-bold">
          {translations.name}
        </h1>
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <Link to={item.to} className="w-full">
              <Button variant={Style.DEFAULT} size={'default'}>
                {item.name}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Index;
