import { AxiosError } from 'axios'
import React, { useEffect, useState } from 'react'
import { StatisticDailyController } from '../controllers/StatisticDailyController'
import { DailyResponse } from '../responses/daily'
import { useAlertStore } from '../stores/alertStore'
import { ASSIGNEES } from '../utils/assigne'
import Button from './Button'
import Card from './Card'
import Collapsible from './Collapsible'
import DatePicker from './DatePicker'
import LoadingWrapper from './LoadingWrapper'
import PaginationPieChart from './Pagination'
import PieChart from './PieChart'
import Select from './Select'
import StatCard from './StatCard'
import TitleCard from './TitleCard'

export function DailyStat() {
	const [date, setDate] = useState<Date>(new Date())
	const [data, setData] = useState<DailyResponse | null>(null)
	const [assignee, setAssignee] = useState<string>('6czi@cyber.ua')
	const [loading, setLoading] = useState<boolean>(true)
	const showAlert = useAlertStore(state => state.showAlert)

	const fetchData = async () => {
		console.log('fetch')
		setLoading(true)
		try {
			const res = await StatisticDailyController.daily(date, assignee)
			setData(res)
		} catch (error) {
			if (error instanceof AxiosError) {
				showAlert('error', error.message)
			}
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchData()
	}, [assignee])

	const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newDate = new Date(event.target.value)
		if (!isNaN(newDate.getTime())) {
			setDate(newDate)
		}
	}

	const handleAssignee = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setAssignee(event.target.value)
	}

	const handleSubmit = () => {
		fetchData()
	}

	return (
		<>
			<Select
				options={ASSIGNEES}
				label='Assignee'
				value={assignee}
				onChange={handleAssignee}
			/>
			<Collapsible title='Filter'>
				<DatePicker
					value={date.toISOString().split('T')[0]}
					onChange={handleDateChange}
					label='Select Date'
				/>
				<Button variant='outline' onClick={handleSubmit}>
					Submit
				</Button>
			</Collapsible>
			<LoadingWrapper loading={loading}>
				<TitleCard title='DAILY STATISTIC' />
				<StatCard title='Opened cases' value={data ? data.opened : 'N/A'} />
				<TitleCard title='OPENED CASES BY THREAD TYPE' />
				<div className='grid grid-cols-2 gap-2'>
					<Card>
						<PaginationPieChart items={data ? data.cases_opened : []} />
					</Card>
					<Card>
						<PieChart
							labels={data ? data.cases_opened.map(i => i.name) : []}
							data={data ? data.cases_opened.map(i => i.count) : []}
						/>
					</Card>
				</div>
				<div className='grid grid-cols-3 gap-2'>
					<StatCard
						title='New cases'
						value={data ? data.total - data.total_av : 'N/A'}
					/>
					<StatCard
						title='Closed cases'
						value={data ? data.closed - data.total_av : 'N/A'}
					/>
					<StatCard
						title='Closed cases (ESET)'
						value={data ? data.total_av : 'N/A'}
					/>
				</div>

				<TitleCard title='TOTAL NEW CASES BY THREAD TYPE' />
				<div className='grid grid-cols-2 gap-2'>
					<Card>
						<PaginationPieChart items={data ? data.cases : []} />
					</Card>
					<Card>
						<PieChart
							labels={data ? data.cases.map(i => i.name) : []}
							data={data ? data.cases.map(i => i.count) : []}
						/>
					</Card>
				</div>

				<TitleCard title='CLOSED CASES BY THREAD TYPE' />
				<div className='grid grid-cols-2 gap-2'>
					<Card>
						<PaginationPieChart items={data ? data.cases_closed : []} />
					</Card>
					<Card>
						<PieChart
							labels={data ? data.cases_closed.map(i => i.name) : []}
							data={data ? data.cases_closed.map(i => i.count) : []}
						/>
					</Card>
				</div>
			</LoadingWrapper>
		</>
	)
}
