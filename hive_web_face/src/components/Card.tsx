import React from 'react'

interface CardProps {
	children: React.ReactNode
}

export const Card: React.FC<CardProps> = ({ children }) => {
	return (
		<div className={`bg-gray-800 p-4 rounded-md border border-gray-700 w-full`}>
			{children}
		</div>
	)
}

Card.displayName = 'Card'

export default Card
