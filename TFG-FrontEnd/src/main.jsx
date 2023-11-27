import ReactDOM from 'react-dom/client'
import HomePage from './components/HomePage.jsx'
import ErrorPage from './components/ErrorPage.jsx'
import Game from './components/Game.jsx'
import './styles/HomePage.css'
import {
	createBrowserRouter,
	RouterProvider,
} from 'react-router-dom'

const router = createBrowserRouter([
	{
		path: '/',
		element: <HomePage/>,
		errorElement: <ErrorPage />,
	},
	{
		path: '/Game:local',
		element: <Game mode='local'/>,
		errorElement: <ErrorPage/>,
	},
	{
		path: '/Game:multi',
		element: <Game mode='multi'/>,
		errorElement: <ErrorPage/>,
	},
	{
		path: '/Game:bot',
		element: <Game mode='bot'/>,
		errorElement: <ErrorPage/>,
	}
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<>
		<RouterProvider router={router} />
	</>,
)
