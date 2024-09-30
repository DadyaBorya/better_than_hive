import React from 'react'

interface StatCardProps {
	title: string
	value: string | number
	className?: string
}

export const StatCard: React.FC<StatCardProps> = ({
	title,
	value,
	className = '',
}) => {
	return (
		<div
			className={`bg-gray-800 p-4 rounded-md border border-gray-700 w-full ${className}`}
		>
			<h2 className='text-sm font-medium text-gray-300 mb-1'>{title}</h2>
			<p className='text-2xl font-bold text-white'>{value}</p>
		</div>
	)
}

StatCard.displayName = 'StatCard'

export default StatCard
