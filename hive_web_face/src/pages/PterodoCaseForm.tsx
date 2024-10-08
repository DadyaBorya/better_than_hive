import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import DatePicker from '../components/DatePicker'
import Input from '../components/Input'
import LoadingWrapper from '../components/LoadingWrapper'
import Select from '../components/Select'
import TextArea from '../components/TextArea'
import TitleCard from '../components/TitleCard'
import { CaseController } from '../controllers/CaseController'
import { CreateCasePterodoRequest } from '../requests/createCasePterodo'
import { useAlertStore } from '../stores/alertStore'
import {
	criticalCategoryOptions,
	internetOptions,
	isExistOptions,
} from '../utils/case'

export function PterodoCaseFormPage() {
	const [loading, setLoading] = useState<boolean>(false)
	const showAlert = useAlertStore(state => state.showAlert)

	const { register, handleSubmit, formState, reset } =
		useForm<CreateCasePterodoRequest>({
			mode: 'onChange',
		})
	const navigate = useNavigate()

	const errors = formState.errors

	const onSubmit: SubmitHandler<CreateCasePterodoRequest> = async data => {
		try {
			setLoading(true)
			await CaseController.createCasePterodo(data)
			navigate('/cases/pteroda')
		} catch (error) {
			if (error instanceof AxiosError) {
				showAlert('error', error.message)
			}
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		reset({
			critical: 3,
			internet: 'Internet',
			threat_actor: 'UAC-0010',
			malware_type: 'Trojan',
			delivery: 'Flesh Drive',
			edr: '+',
			av: '+',
		})
	}, [])

	return (
		<LoadingWrapper loading={loading}>
			<div className='flex flex-col gap-2'>
				<TitleCard title='ADD PTERODA CASE' />
				<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
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

					<Select options={isExistOptions} label='EDR' {...register('edr')} />

					<Select options={isExistOptions} label='AV' {...register('av')} />

					<Input
						label='Threat Actor'
						{...register('threat_actor', {
							required: 'This field is required',
						})}
						error={errors.threat_actor?.message}
					/>

					<Input
						label='Malware Type'
						{...register('malware_type', {
							required: 'This field is required',
						})}
						error={errors.malware_type?.message}
					/>

					<Input
						label='Delivery'
						{...register('delivery', { required: 'This field is required' })}
						error={errors.delivery?.message}
					/>

					<Input
						label='Flash Drive Number'
						{...register('flash_drive_number', {
							required: 'This field is required',
						})}
						error={errors.flash_drive_number?.message}
					/>

					<DatePicker
						label='Detection date'
						{...register('date_detection', {
							required: 'This field is required',
						})}
						error={errors.date_detection?.message}
						time={true}
					/>

					<TextArea
						label='Infected files'
						{...register('infected_files', {
							required: 'This field is required',
						})}
						rows={5}
						error={errors.infected_files?.message}
					/>

					<Input
						label='Infected disk'
						{...register('infected_disk', {
							required: 'This field is required',
						})}
						error={errors.infected_disk?.message}
					/>

					<Input
						label='Creator rank and name'
						{...register('creator', {
							required: 'This field is required',
						})}
						error={errors.creator?.message}
					/>

					<Button type='submit' variant='outline' size='large'>
						Submit
					</Button>
				</form>
			</div>
		</LoadingWrapper>
	)
}
