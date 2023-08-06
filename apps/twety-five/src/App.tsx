import {FC} from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Index from './routes/Index'
import Game from "./routes/Game";

const Router = createBrowserRouter([
	{
		path: '/',
		element: <Index />
	},
	{
		path: '/games/:gameId',
		element: <Game />
	}
])

const App: FC = () => {
	return (
		<RouterProvider router={Router} />
	)
}

export default App;
