import { useEffect, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { SubmitHandler, useForm } from 'react-hook-form'
import Button from '../components/Button'
import Input from '../components/Input'
import LoadingWrapper from '../components/LoadingWrapper'
import Select from '../components/Select'
import TitleCard from '../components/TitleCard'
import { CaseController } from '../controllers/CaseController'
import { CreateCaseEsetRequest } from '../requests/createCaseEset'
import { criticalCategoryOptions, internetOptions } from '../utils/case'

export function EsetCaseFormPage() {
	const [loading, setLoading] = useState<boolean>(false)
	const { register, handleSubmit, formState, reset } =
		useForm<CreateCaseEsetRequest>({
			mode: 'onChange',
		})

	useEffect(() => {
		resetForm()
	}, [])

	const errors = formState.errors

	const resetForm = () =>
		reset({
			content: 'АРМ без АВПЗ',
			critical: 3,
			internet: 'Internet',
		})

	const onSubmit: SubmitHandler<CreateCaseEsetRequest> = async data => {
		try {
			setLoading(true)
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
		} catch (e) {
			console.log(e)
		} finally {
			setLoading(false)
		}
	}

	return (
		<LoadingWrapper loading={loading}>
			<div className='flex flex-col gap-2'>
				<TitleCard title='ADD ESET CASE' />
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
			</div>
		</LoadingWrapper>
	)
}
