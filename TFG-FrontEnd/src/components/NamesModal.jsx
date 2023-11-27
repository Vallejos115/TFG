import { useState } from 'react'

import Modal from 'react-modal'
import { PlayerStates } from '../utils/Utils'

import '../styles/NamesModal.css'

function NamesModal({setPlayer1Name, setPlayer2Name, setInitTime, setPlayer1State, setStartGame}){
	const [modalIsOpen, setModalIsOpen] = useState(true)
	const [player1InputValue, setPlayer1InputValue] = useState('')
	const [player2InputValue, setPlayer2InputValue] = useState('')
	const [selectedValue, setSelectedValue] = useState(120)
	const [errMessage, setErrMessage] = useState('')

	const handlePlayer1InputChange = (event) => {
		setPlayer1InputValue(event.target.value)
	}

	const handlePlayer2InputChange = (event) => {
		setPlayer2InputValue(event.target.value)
	}

	const handleSelectChange = (event) => {
		setSelectedValue(event.target.value)
	}

	const closeModal = (event) => {
		event.preventDefault()
		if(player1InputValue === ''){
			setErrMessage('Jugador 1 no puede estar vacio')
			return
		}
		if(player1InputValue.length > 20){
			setErrMessage('Jugador 1 tiene un nombre de más de 20 caracteres')
			return
		}
		if(player2InputValue === ''){
			setErrMessage('Jugador 2 no puede estar vacio')
			return
		}
		if(player2InputValue.length > 20){
			setErrMessage('Jugador 2 tiene un nombre de más de 20 caracteres')
			return
		}

		setErrMessage('')
		setPlayer1Name(player1InputValue)
		setPlayer2Name(player2InputValue)
		setInitTime(selectedValue)
		setPlayer1State(PlayerStates.PLAYING)
		setStartGame(true)
		setModalIsOpen(false)
	}

	return(
		<Modal
			isOpen={modalIsOpen}
			onRequestClose={closeModal}
			contentLabel="Elección de nombres y tiempo"
		>
			<form className='names-modal' onSubmit={closeModal}>
				<h1>Decid vuestos nombres</h1>
				<div className='names-selector'>
					<div className='name-selector'>
						<h2>Jugador 1</h2>
						<input 
							autoFocus
							type='text'
							placeholder='Nombre del jugador 1'
							value={player1InputValue}
							onChange={handlePlayer1InputChange}
						/>
					</div>
					<div className='name-selector'>
						<h2>Jugador 2</h2>
						<input 
							type='text'
							placeholder='Nombre del jugador 2'
							value={player2InputValue}
							onChange={handlePlayer2InputChange}
						/>
					</div>
				</div>
				<div className='time-div'>
					<label htmlFor="time-options">Elegid el tiempo para cada concursante:</label>
					<select id="time-options" name="time-options" value={selectedValue} onChange={handleSelectChange}>
						<option value="120">120</option>
						<option value="180">180</option>
						<option value="240">240</option>
						<option value="300">300</option>
					</select>
				</div>
				<p>{errMessage}</p>
				<button>Ok</button>
			</form>
		</Modal>
	)
}

export default NamesModal