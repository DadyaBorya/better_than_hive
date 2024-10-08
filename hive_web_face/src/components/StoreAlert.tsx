import { AlertCircle, AlertTriangle, CheckCircle, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useAlertStore } from '../stores/alertStore'

const StoreAlert: React.FC = () => {
	const { type, message, isVisible, hideAlert } = useAlertStore()
	const [isRendered, setIsRendered] = useState(false)
	const [isAnimating, setIsAnimating] = useState(false)

	useEffect(() => {
		if (isVisible && !isRendered) {
			setIsRendered(true)
			setTimeout(() => setIsAnimating(true), 10)
			const timer = setTimeout(() => {
				hideAlert()
			}, 5000)
			return () => clearTimeout(timer)
		} else if (!isVisible && isRendered) {
			setIsAnimating(false)
			const timer = setTimeout(() => {
				setIsRendered(false)
			}, 300)
			return () => clearTimeout(timer)
		}
	}, [isVisible, hideAlert, isRendered])

	if (!isRendered) return null

	const alertClasses = {
		base: 'fixed bottom-8 right-8 p-6 rounded-xl shadow-2xl flex items-center max-w-md transition-all duration-300 ease-in-out transform',
		error: 'bg-red-900 text-red-100',
		warning: 'bg-yellow-900 text-yellow-100',
		success: 'bg-green-900 text-green-100',
	}

	const animationClasses = isAnimating
		? 'translate-y-0 opacity-100'
		: 'translate-y-full opacity-0'

	const icons = {
		error: <AlertCircle className='w-8 h-8 mr-4 flex-shrink-0' />,
		warning: <AlertTriangle className='w-8 h-8 mr-4 flex-shrink-0' />,
		success: <CheckCircle className='w-8 h-8 mr-4 flex-shrink-0' />,
	}

	return (
		<div
			className={`
        ${alertClasses.base} 
        ${alertClasses[type]} 
        ${animationClasses}
      `}
		>
			{icons[type]}
			<div className='flex-grow text-lg font-semibold'>{message}</div>
			<button
				onClick={() => {
					setIsAnimating(false)
					setTimeout(hideAlert, 300)
				}}
				className='ml-4 p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors duration-200 focus:outline-none'
			>
				<X className='w-6 h-6' />
			</button>
		</div>
	)
}

export default StoreAlert
