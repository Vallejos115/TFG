import { useNavigate } from 'react-router-dom'

import AnimatedWheel from './AnimatedWheel'

import '../styles/HomePage.css'

function HomePage() {
	const history = useNavigate()

	const local = () => {
		history('/Game:local')
	}

	const multi = () => {
		history('/Game:multi')
	}

	const bot = () => {
		history('/Game:bot')
	}

	return (
		<div className='configuration'>
			<h1 className='title'>Pasapalabra :D</h1>
			<AnimatedWheel/>
			<div className='configuration-buttons'>
				<button onClick={local}>Local</button>
				<button onClick={multi}>Multiplayer</button>
				<button onClick={bot}>Bot</button>
			</div>
		</div>
	)
}

export default HomePage