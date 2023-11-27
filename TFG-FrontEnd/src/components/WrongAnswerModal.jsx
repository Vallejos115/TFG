import Modal from 'react-modal'

import '../styles/WrongAnswerModal.css'

Modal.setAppElement('#root')

const WrongAnswerModal = ({isOpen, onAnswerWrong, correctAnswer }) => {
	const closeModal = (event) => {
		event.preventDefault()
		onAnswerWrong()
	}

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={closeModal}
			contentLabel= 'Respuesta incorrecta'
		>
			<form className='WA-modal' onSubmit={closeModal}>
				<h1>¡WROOOOONG!</h1>
				<p>La respuesta correcta era:</p>
				<p className='correct-answer'>{correctAnswer}</p>
				<button autoFocus>Ok</button>
			</form>
		</Modal>
	)
}

export default WrongAnswerModal
