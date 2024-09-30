import { InputHTMLAttributes, forwardRef } from 'react'

interface DatePickerProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string
	error?: string
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
	({ label, error, className, ...props }, ref) => {
		return (
			<div className='w-full'>
				{label && (
					<label className='block text-sm font-medium text-gray-300 mb-1'>
						{label}
					</label>
				)}
				<input
					ref={ref}
					type='date'
					className={`
            w-full px-3 py-2 rounded-md border
            bg-gray-800 text-white
            border-gray-700
            focus:outline-none focus:ring-2 focus:ring-blue-500
            placeholder-gray-500
            disabled:bg-gray-900 disabled:text-gray-600 disabled:cursor-not-allowed
            ${error ? 'border-red-500' : 'border-gray-700'}
            ${className || ''}
          `}
					{...props}
					onClick={e => e.currentTarget.showPicker()}
				/>
				{error && <p className='mt-1 text-sm text-red-400'>{error}</p>}
			</div>
		)
	}
)

DatePicker.displayName = 'DatePicker'

export default DatePicker
