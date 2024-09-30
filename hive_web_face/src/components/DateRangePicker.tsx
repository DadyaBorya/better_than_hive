import React, { ChangeEvent } from 'react'
import Card from './Card'
import DatePicker from './DatePicker'

interface DateRangePickerProps {
	date1: Date | null
	date2: Date | null
	onChange1: (e: ChangeEvent<HTMLInputElement>) => void
	onChange2: (e: ChangeEvent<HTMLInputElement>) => void
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
	date1,
	date2,
	onChange1,
	onChange2,
}) => {
	return (
		<div className='grid grid-cols-2 gap-2'>
			<Card>
				<DatePicker
					label='From'
					value={date1 ? date1.toISOString().split('T')[0] : ''}
					onChange={onChange1}
				/>
			</Card>
			<Card>
				<DatePicker
					label='To'
					value={date2 ? date2.toISOString().split('T')[0] : ''}
					onChange={onChange2}
				/>
			</Card>
		</div>
	)
}

export default DateRangePicker
