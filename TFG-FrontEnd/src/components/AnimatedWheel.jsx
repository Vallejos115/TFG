import { useEffect } from 'react'
import { Letters } from '../utils/Utils.jsx'

import '../styles/AnimatedWheel.css'

function AnimatedWheel() {
	useEffect(() => {
		const styleElement = document.createElement('style')
		styleElement.className = 'animations'
		for(let i = 0; i < Letters.length; ++i){
			const angle = 270 + i * 14.4
			const animationName = `animatedLetter-${i}`
			const keyframes = `
				@keyframes ${animationName} {
					from {
						transform: rotate(${angle}deg) translate(650%) rotate(${-angle}deg);
					}
					to {
						transform: rotate(${angle + 360}deg) translate(650%) rotate(${-(angle + 360)}deg);
					}
				}
			`
			styleElement.appendChild(document.createTextNode(keyframes))
			document.head.appendChild(styleElement)
		}

		return () => {	
			document.head.removeChild(styleElement)
		}
	}, [])

	return (
		<ul className='animated-wheel'>
			{Letters.map((letter, index) => (
				<AnimatedLetter key={letter} i ={index} letter={letter}/>
			))}
		</ul>
	)
}

function AnimatedLetter({i, letter}){
	//Set the animation name
	const animationName = `animatedLetter-${i}`
	const state = Math.floor(Math.random() * 3)
  
	return (
		<li
			style={{
				backgroundColor: state === 0 ? '#2995EA' : state === 1 ? 'green' : '#DC3535',
				animation:`${animationName} 30s infinite linear`
			}}
		>
			{letter}
		</li>
	)
}

export default AnimatedWheel