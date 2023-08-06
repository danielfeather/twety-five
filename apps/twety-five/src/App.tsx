import { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Index from './routes/Index';
import Lobbies from './routes/Lobbies';
import Lobby from './routes/Lobby';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/lobbies',
    element: <Lobbies />,
  },
  {
    path: '/lobbies/:id',
    element: <Lobby />,
  },
]);

const App: FC = () => {
  return <RouterProvider router={Router} />;
};

export default App;
