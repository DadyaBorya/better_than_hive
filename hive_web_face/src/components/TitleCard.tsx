import React from 'react'
import Card from './Card' // Make sure to import your Card component

interface TitleCardProps {
	title: string
}

const TitleCard: React.FC<TitleCardProps> = ({ title }) => {
	return (
		<Card>
			<div className='text-3xl font-bold text-gray-300 text-center'>
				{title}
			</div>
		</Card>
	)
}

export default TitleCard
