import { useEffect, useState } from 'react'
import { StatisticGeneralController } from '../controllers/StatisticGeneralController'
import { GeneralRequest } from '../requests/general'
import { GeneralResponse } from '../responses/general'
import { ASSIGNEES } from '../utils/assigne'
import { formatDate } from '../utils/date'
import Button from './Button'
import Card from './Card'
import Collapsible from './Collapsible'
import DateRangePicker from './DateRangePicker'
import LineChart from './LineChart'
import LoadingWrapper from './LoadingWrapper'
import PaginationPieChart from './Pagination'
import PieChart from './PieChart'
import Select from './Select'
import StatCard from './StatCard'
import TitleCard from './TitleCard'

export function GeneralStat() {
	const [data, setData] = useState<GeneralResponse | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [startDate, setStartDate] = useState<Date | null>(null)
	const [endDate, setEndDate] = useState<Date | null>(null)
	const [assignee, setAssignee] = useState<string>('6czi@cyber.ua')

	const fetchData = async () => {
		setLoading(true)
		try {
			const payload: GeneralRequest = { assignee }

			if (startDate) {
				payload['start_date'] = formatDate(startDate)
			}
			if (endDate) {
				payload['end_date'] = formatDate(endDate)
			}
			const res = await StatisticGeneralController.general(payload)

			setData(res)
		} catch (error) {
			console.error(`Error fetching`, error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchData()
	}, [assignee])

	const handleStartDateChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const newDate = new Date(event.target.value)
		if (!isNaN(newDate.getTime())) {
			setStartDate(newDate)
		}
	}

	const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newDate = new Date(event.target.value)
		if (!isNaN(newDate.getTime())) {
			setEndDate(newDate)
		}
	}

	const handleSubmit = () => {
		fetchData()
	}

	const handleAssignee = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setAssignee(event.target.value)
	}

	return (
		<>
			<Select
				options={ASSIGNEES}
				label='Assignee'
				value={assignee}
				onChange={handleAssignee}
			/>
			<TitleCard title='GENERAL STATISTIC' />
			<LoadingWrapper loading={loading}>
				<Collapsible title='Filter'>
					<DateRangePicker
						date1={startDate}
						onChange1={handleStartDateChange}
						date2={endDate}
						onChange2={handleEndDateChange}
					/>
					<Button variant='outline' onClick={() => handleSubmit()}>
						Submit
					</Button>
				</Collapsible>

				<div className='grid grid-cols-3 gap-2'>
					<StatCard
						title='Avg new cases per day'
						value={data ? data.avg_cases : 'N/A'}
					/>
					<StatCard
						title='Avg closed cases per day'
						value={data ? data.closed_avg_cases : 'N/A'}
					/>
					<StatCard
						title='Avg closed cases per day (ESET)'
						value={data ? data.closed_avg_eset_cases : 'N/A'}
					/>
				</div>

				<div className='grid grid-cols-2 gap-2'>
					<StatCard
						title='Total cases'
						value={data ? data.total_cases : 'N/A'}
					/>
					<StatCard
						title='Total cases (ESET)'
						value={data ? data.total_cases_eset : 'N/A'}
					/>
				</div>

				<TitleCard title='CASES BY THREAD TYPE' />
				<div className='grid grid-cols-2 gap-2'>
					<Card>
						<PaginationPieChart items={data ? data.cases_pie_chart : []} />
					</Card>
					<Card>
						<PieChart
							labels={data ? data.cases_pie_chart.map(i => i.name) : []}
							data={data ? data.cases_pie_chart.map(i => i.count) : []}
							displayLegend={false}
						/>
					</Card>
				</div>

				<TitleCard title='TOTAL CASES CHART' />
				<Card>
					<LineChart
						labels={data ? data.cases_chart.labels : []}
						datasets={data ? data.cases_chart.datasets : []}
					/>
				</Card>

				<TitleCard title='CLOSED CASES CHART' />

				<Card>
					<LineChart
						labels={data ? data.closed_cases_chart.labels : []}
						datasets={data ? data.closed_cases_chart.datasets : []}
					/>
				</Card>

				<TitleCard title='TOTAL CASES CHART (ESET)' />
				<Card>
					<LineChart
						labels={data ? data.closed_eset_cases_chart.labels : []}
						datasets={data ? data.closed_eset_cases_chart.datasets : []}
					/>
				</Card>
			</LoadingWrapper>
		</>
	)
}
