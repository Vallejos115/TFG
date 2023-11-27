import { useState } from 'react'

import LetterWheel from './LetterWheel'
import Timer from './Timer'
import Answer from './Answer'
import WrongAnswerModal from './WrongAnswerModal'
import { PlayerStates } from '../utils/Utils'

import '../styles/Player.css'

function Player({initialTime, playerName, playerState, setPlayerState, changeTurn, questions, setQuestions}) {
	const [questionPos, setQuestionsPos] = useState(0)
	const [openWAModal, setWAModalOpen] = useState(false)
	const [wrongAnswer, setWrongAnswer] = useState('')

	const [firstPart, secondPart] = questions[questionPos].description.split(':')

	const findValueFromArray = (array, targetValue, startIndex) => {
		const firstSearch = array.slice(startIndex).indexOf(targetValue)
		
		if(firstSearch !== -1) {
			return firstSearch + startIndex 
		}

		const secondSearch = array.slice(0, startIndex).indexOf(targetValue)
		if (secondSearch !== -1) {
			return secondSearch
		}
		
		return -1 // Value not found in the array
	}

	const verifyAnswer = (myAnswer) => {
		const answer = questions[questionPos].word
		const isCorrect = (myAnswer.toLowerCase() === answer) ? 1 : 2

		let newState
		setQuestions(prevState => {
			newState = [...prevState]
			newState[questionPos].state = isCorrect
			return newState
		})

		setQuestionsPos(preValue => findValueFromArray(newState.map(question => question.state), 0, preValue))

		console.log(answer)

		if(isCorrect === 2){
			setWrongAnswer(answer)
			setPlayerState(PlayerStates.CHANGING)
			setWAModalOpen(true)
		}
	}

	const onAnswerWrong = () => {
		if(!questions.map(question => question.state).includes(0)) 
			onPlayerEnd()
		else
			changeTurn()
		setWAModalOpen(false)
	}

	const skip = () => {
		changeTurn()
		setQuestionsPos(preValue => findValueFromArray(questions.map(question => question.state), 0, preValue + 1))
	}

	const onPlayerEnd = () => {
		changeTurn()
		setPlayerState(PlayerStates.END)
	}

	return(
		<div className='player'>
			<WrongAnswerModal isOpen={openWAModal} onAnswerWrong={() => onAnswerWrong()} correctAnswer={wrongAnswer} />
			<h1 className='player-name'>{playerName}</h1>
			{playerState === PlayerStates.PLAYING
				? <p className='question'>
					<span style={{ color: 'dodgerblue' }}><strong>{firstPart}:</strong></span>
					{secondPart}
				</p> 
				: ''
			}
			<LetterWheel playerState={playerState} questionsState={questions.map(question => question.state)} questionPos={questionPos} />
			<div className='bottom-player'>
				{playerState === PlayerStates.PLAYING
					? <button className='skip' onClick={skip}>Pasapalabra</button>
					: <p></p>
				}
				<div className='player-info'>
					<Timer initialTime={initialTime} isActive={playerState === PlayerStates.PLAYING} onTimerEnd={onPlayerEnd}/>
					<p className='correct-answers'>{questions.map(question => question.state).filter(item => (item === 1)).length}</p>
				</div>
			</div>
			{playerState === PlayerStates.PLAYING
				? <Answer verifyAnswer={verifyAnswer}/>
				: ''
			}
		</div>
	)
}

export default Player