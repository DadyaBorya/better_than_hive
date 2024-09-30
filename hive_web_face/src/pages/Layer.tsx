import React from 'react'

interface LayerProps {
	children: React.ReactNode
}

const Layer: React.FC<LayerProps> = ({ children }) => {
	return (
		<div className='min-h-screen bg-gray-900 flex justify-center'>
			<div className='max-[1280px] w-full px-4 sm:px-6 lg:px-8 py-4'>
				{children}
			</div>
		</div>
	)
}

export default Layer
