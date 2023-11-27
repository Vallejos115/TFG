import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Modal from 'react-modal'

import '../styles/MultiTableModal.css'

function MultiTableModal(){
	const history = useNavigate()
	const [modalIsOpen, setModalIsOpen] = useState(true)
	const [mode, setMode] = useState(null)
	const [gameCode, setGameCode] = useState(null)
  
	const handleNewGame = (event) => {
		event.preventDefault()
		setMode('new')
		const code = Math.random().toString(36).substring(2, 8).toUpperCase()
		setGameCode(code)
		//TODO mandar código al servidor
	}

	const handleJoinGame = (event) => {
		event.preventDefault()
		setMode('join')
	}

	const handlePlay = (event) => {
		event.preventDefault()
		//TODO comprobar código
		history('/game:multi')
		setModalIsOpen(false)
	}

	const handleExit = (event) => {
		event.preventDefault()
		history('/')
		setModalIsOpen(false)
	}

	const closeModal = (event) => {
		event.preventDefault()

		setModalIsOpen(false)
	}

	return (
		<Modal 
			isOpen={modalIsOpen}
			onRequestClose={closeModal}
			contentLabel="Búsqueda de partida"
		>
			<div className='style'>
				<h1 className='title'>Modo de partida</h1>
				{mode ? (
					<div>
						{mode === 'new' ? (
							<p style={{ textAlign: 'center' }}>Tu código de juego es:<br/><br/>
								<strong style={{ color: 'dodgerblue', fontSize: '1.5em' }}>{gameCode}</strong></p>
						) : (
							<div style={{ textAlign: 'center' }} className='code-input'>
								<p>Introduce el código de la partida:</p>
								<form>
									<input type="text" name="gameCode" 
										placeholder='Código de la partida'
										value={gameCode}
									/>
								</form>
							</div>
						)}
						<div className='buttons'>
							<button onClick={handlePlay}>Jugar</button>
							<button onClick={handleExit}>Salir</button>
						</div>
					</div>
				) : (
					<div className='buttons'>
						<button onClick={handleNewGame}>Nueva</button>
						<button onClick={handleJoinGame}>Unirse</button>
					</div>
				)}
			</div>
		</Modal>
	)
}

export default MultiTableModal