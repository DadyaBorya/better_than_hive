import React, { useState } from 'react'

interface PaginationProps {
	items: { name: string; count: number }[]
}

const PaginationPieChart: React.FC<PaginationProps> = ({ items }) => {
	const itemsPerPage = 10
	const [currentPage, setCurrentPage] = useState(1)

	const totalPages = Math.ceil(items.length / itemsPerPage)

	const currentItems = items.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	)

	const changePage = (page: number) => {
		if (page < 1 || page > totalPages) return
		setCurrentPage(page)
	}

	if (items.length === 0) {
		return (
			<div className='text-gray-300 text-center font-bold text-3xl'>
				No values present
			</div>
		)
	}

	return (
		<div className='bg-gray-800 p-5 rounded-lg h-full flex flex-col'>
			<div className='flex-1 text-gray-300 mb-4'>
				<ul className='list-disc list-inside space-y-2 border-gray-700 pt-2'>
					{currentItems.map((item, index) => (
						<li
							key={index}
							className='py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-200 shadow-md cursor-pointer'
						>
							{item.name} - {item.count}
						</li>
					))}
				</ul>
			</div>

			<div className='flex justify-between items-center'>
				<button
					onClick={() => changePage(currentPage - 1)}
					disabled={currentPage === 1}
					className='px-4 py-2 bg-gray-600 text-white rounded disabled:opacity-50'
				>
					Previous
				</button>
				<span className='text-gray-300'>
					Page {currentPage} of {totalPages}
				</span>
				<button
					onClick={() => changePage(currentPage + 1)}
					disabled={currentPage === totalPages}
					className='px-4 py-2 bg-gray-600 text-white rounded disabled:opacity-50'
				>
					Next
				</button>
			</div>
		</div>
	)
}

export default PaginationPieChart
