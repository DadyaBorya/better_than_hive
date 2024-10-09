import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Collapsible from '../components/Collapsible'
import DatePicker from '../components/DatePicker'
import LoadingWrapper from '../components/LoadingWrapper'
import StyledLink from '../components/StyledLink'
import Table from '../components/Table'
import TitleCard from '../components/TitleCard'
import { CaseController } from '../controllers/CaseController'
import { CaseResponse } from '../responses/case'
import { useAlertStore } from '../stores/alertStore'
import { getCaseUrl } from '../utils/case'
import { fromTsToDateStr } from '../utils/date'

export function EsetCasesPage() {
	const [cases, setCases] = useState<CaseResponse[]>([])
	const [date, setDate] = useState<Date>(new Date())
	const [loading, setLoading] = useState<boolean>(true)
	const showAlert = useAlertStore(state => state.showAlert)

	const navigate = useNavigate()

	const fetchData = async () => {
		try {
			setLoading(true)
			const data = await CaseController.caseEset(date)
			console.log(date)
			console.log(data)

			setCases(data)
		} catch (error) {
			if (error instanceof AxiosError) {
				showAlert('error', error.message)
			}
		} finally {
			setLoading(false)
		}
	}

	const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newDate = new Date(event.target.value)
		if (!isNaN(newDate.getTime())) {
			setDate(newDate)
		}
	}

	const handleSubmitCases = () => {
		fetchData()
	}

	useEffect(() => {
		fetchData()
	}, [])

	return (
		<div className='flex flex-col gap-2'>
			<TitleCard title='ESET CASES' />
			<Button onClick={() => navigate('/case/eset/add')} variant='outline'>
				Create new eset case
			</Button>
			<Collapsible title='Filter'>
				<DatePicker
					value={date.toISOString().split('T')[0]}
					onChange={handleDateChange}
					label='Select Date'
				/>
				<Button variant='outline' onClick={handleSubmitCases}>
					Submit
				</Button>
			</Collapsible>
			<LoadingWrapper loading={loading}>
				<Table
					className=''
					headers={['Number', 'Tags', 'Resolved date', 'Status']}
					rows={cases.map(i => [
						<StyledLink href={getCaseUrl(i._id)} isExternal>
							#{i.number}
						</StyledLink>,
						<div className='flex gap-2'>
							{i.tags.map(t => (
								<div className='inline-block bg-gray-800 text-gray-200 px-2 py-1 rounded-full text-sm font-semibold border border-gray-600'>
									{t}
								</div>
							))}
						</div>,
						fromTsToDateStr(i.endDate),
						<div
							className={
								i.status === 'Resolved' ? 'text-green-500' : 'text-red-500'
							}
						>
							{i.status}
						</div>,
					])}
				/>
			</LoadingWrapper>
		</div>
	)
}
