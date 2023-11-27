import { useState } from 'react'

import '../styles/Answer.css'

function Answer({verifyAnswer}){
	const [inputValue, setInputValue] = useState('')

	const handleInputChange = (event) => {
		setInputValue(event.target.value)
	}
  
	const answer = (event) => {
		event.preventDefault()
		if(inputValue === '') 
			return
		verifyAnswer(inputValue)
		setInputValue('')
	}

	return(
		<form className='answer' onSubmit={answer}>
			<input 
				autoFocus 
				type='text'
				placeholder='Escribe tu respuesta'
				value={inputValue}
				onChange={handleInputChange}
			/>
			<button>Responder</button>
		</form>
	)
}

export default Answer