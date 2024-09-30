import { useEffect, useState } from 'react'
import Card from '../components/Card'
import { CaseController } from '../controllers/CaseController'
import { CaseResponse } from '../responses/case'

export function CaseListPage() {
	const [items, setItems] = useState<CaseResponse[]>([])

	const fetchData = async () => {
		try {
			const data = await CaseController.case({})
			data.sort((a: CaseResponse, b: CaseResponse) =>
				a.title.localeCompare(b.title)
			)

			setItems(data)
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	return (
		<Card>
			<div className='flex-1 text-gray-300 mb-4'>
				<div className='grid grid-cols-3 gap-4 text-sm font-medium border-b border-gray-700 pb-2 mb-4'>
					<div className='text-gray-400'>Case Number</div>
					<div className='text-gray-400'>Case Name</div>
					<div className='text-gray-400'>Status</div>
				</div>

				{items.map((item, index) => (
					<div
						key={index}
						className='grid grid-cols-4 gap-4 py-2 px-4 bg-gray-800 rounded-md mb-2 hover:bg-gray-700 transition duration-200 shadow-md'
					>
						<div>{item.number}</div>
						<div>{item.title}</div>
						<div>
							<span
								className={`px-2 py-1 rounded-full text-xs font-semibold ${
									item.status === 'Resolved'
										? 'bg-green-500 text-white'
										: 'bg-red-500 text-white'
								}`}
							>
								{item.status}
							</span>
						</div>
					</div>
				))}
			</div>
		</Card>
	)
}
