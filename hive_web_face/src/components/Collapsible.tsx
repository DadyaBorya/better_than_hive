import React, { useEffect, useRef, useState } from 'react'

interface CollapsibleProps {
	title: string
	children: React.ReactNode
}

const Collapsible: React.FC<CollapsibleProps> = ({ title, children }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [maxHeight, setMaxHeight] = useState('0px')
	const contentRef = useRef<HTMLDivElement>(null)

	const toggleOpen = () => {
		setIsOpen(!isOpen)
	}

	useEffect(() => {
		if (contentRef.current) {
			setMaxHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px')
		}
	}, [isOpen])

	return (
		<div className='w-full bg-gray-800 border border-gray-700 rounded-md'>
			<div
				className='flex items-center justify-between p-4 cursor-pointer'
				onClick={toggleOpen}
			>
				<h2 className='text-lg font-bold text-gray-300'>{title}</h2>
				<span
					className={`text-2xl text-gray-400 transform transition-transform duration-500 ${
						isOpen ? 'rotate-0' : 'rotate-180'
					}`}
				>
					↑
				</span>
			</div>
			<div
				ref={contentRef}
				style={{ maxHeight }}
				className='overflow-hidden transition-all duration-700 ease-in-out'
			>
				<div className='flex flex-col gap-y-2 py-2 border-t border-gray-700 bg-gray-900'>
					{children}
				</div>
			</div>
		</div>
	)
}

export default Collapsible
