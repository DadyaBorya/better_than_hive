import { useEffect, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { SubmitHandler, useForm } from 'react-hook-form'
import Button from '../components/Button'
import Collapsible from '../components/Collapsible'
import DatePicker from '../components/DatePicker'
import Input from '../components/Input'
import Select from '../components/Select'
import StyledLink from '../components/StyledLink'
import Table from '../components/Table'
import TitleCard from '../components/TitleCard'
import { CaseController } from '../controllers/CaseController'
import { CreateCaseEsetRequest } from '../requests/caseEset'
import { CaseResponse } from '../responses/case'
import { fromTsToDateStr } from '../utils/date'

const internetOptions = [
	{ value: 'Internet', label: 'Internet' },
	{ value: 'Dnipro', label: 'Dnipro' },
]

const criticalCategoryOptions = [
	{ value: 1, label: '1' },
	{ value: 2, label: '2' },
	{ value: 3, label: '3' },
]

export function AVCaseFormPage() {
	const [esetCases, setEsetCases] = useState<CaseResponse[]>([])
	const [date, setDate] = useState<Date>(new Date())

	const { register, handleSubmit, formState, reset } =
		useForm<CreateCaseEsetRequest>({
			mode: 'onChange',
		})

	const fetchData = async () => {
		const data = await CaseController.caseEset(date)
		setEsetCases(data)
	}

	const getCaseUrl = (case_id: string) => {
		return `https://irm.cyber.ua/index.html#!/case/~${case_id}/details`
	}

	useEffect(() => {
		resetForm()
		fetchData()
	}, [])

	const errors = formState.errors

	const resetForm = () =>
		reset({
			content: 'АРМ без АВПЗ',
			critical: 3,
			internet: 'Internet',
		})

	const onSubmit: SubmitHandler<CreateCaseEsetRequest> = async data => {
		const res = await CaseController.createCaseEset(data)

		confirmAlert({
			title: 'Case was added',
			message: `Case #${res.case_number}. Do you want to clear the fields?`,
			buttons: [
				{
					label: 'Yes',
					onClick: () => reset(),
				},
				{
					label: 'No',
				},
			],
			overlayClassName: 'bg-red-300',
		})

		fetchData()
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

	return (
		<div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='flex flex-col gap-3 mb-8'
			>
				<Input
					label='IP'
					{...register('ip', {
						required: 'This field is required',
						pattern: {
							value:
								/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
							message: 'Value is not valid IP',
						},
					})}
					error={errors.ip?.message}
				/>
				<Input
					label='Hostname'
					{...register('hostname', { required: 'This field is required' })}
					error={errors.hostname?.message}
				/>
				<Input
					label='Responsible person'
					{...register('responsible', { required: 'This field is required' })}
					error={errors.responsible?.message}
				/>
				<Input
					label='Responsible person IS'
					{...register('responsible_is', {
						required: 'This field is required',
					})}
					error={errors.responsible_is?.message}
				/>
				<Input
					label='Unit'
					{...register('unit', { required: 'This field is required' })}
					error={errors.unit?.message}
				/>
				<Input
					label='Content'
					{...register('content', { required: 'This field is required' })}
					error={errors.content?.message}
				/>
				<Select
					options={internetOptions}
					label='Internet'
					{...register('internet')}
				/>
				<Select
					options={criticalCategoryOptions}
					label='Critical category'
					{...register('critical')}
				/>

				<Button type='submit' variant='outline' size='large'>
					Submit
				</Button>
			</form>

			<div className='flex flex-col gap-2'>
				<TitleCard title='ESET CASES' />
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
				<Table
					className=''
					headers={['Number', 'Resolved date', 'Status']}
					rows={esetCases.map(i => [
						<StyledLink href={getCaseUrl(i._id)} isExternal>
							#{i.number}
						</StyledLink>,
						fromTsToDateStr(i.endDate),
						i.status,
					])}
				/>
			</div>
		</div>
	)
}
