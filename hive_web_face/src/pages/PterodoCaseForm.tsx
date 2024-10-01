import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Button from '../components/Button'
import Input from '../components/Input'
import Select from '../components/Select'
import TitleCard from '../components/TitleCard'
import { CreateCasePterodoRequest } from '../requests/createCasePterodo'
import {
	criticalCategoryOptions,
	internetOptions,
	isExistOptions,
} from '../utils/case'

export function PterodoCaseFormPage() {
	const { register, handleSubmit, formState, reset } =
		useForm<CreateCasePterodoRequest>({
			mode: 'onChange',
		})

	const errors = formState.errors

	const onSubmit: SubmitHandler<CreateCasePterodoRequest> = async data => {
		console.log(data)
	}

	useEffect(() => {
		reset({
			critical: 3,
			internet: 'Internet',
		})
	}, [])

	return (
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

				<Button type='submit' variant='outline' size='large'>
					Submit
				</Button>
			</form>
		</div>
	)
}
