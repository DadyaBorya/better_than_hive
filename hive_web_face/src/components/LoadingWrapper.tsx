import React from 'react'

interface LoadingWrapperProps {
	loading: boolean
	children: React.ReactNode
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({
	loading,
	children,
}) => {
	return (
		<>
			{loading ? (
				<div className='relative w-full h-full border-x bg-gray-800 p-4 rounded-md border border-gray-700'>
					<div className='flex items-center justify-center w-full h-full'>
						<div className='animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500'></div>
					</div>
				</div>
			) : (
				children
			)}
		</>
	)
}

export default LoadingWrapper
