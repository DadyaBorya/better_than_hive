import { SelectHTMLAttributes, forwardRef } from 'react'

interface SelectOption {
	value: string | number
	label: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
	options: SelectOption[]
	label?: string
	error?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
	({ options, label, error, className, ...props }, ref) => {
		return (
			<div className='w-full'>
				{label && (
					<label className='block text-sm font-medium text-gray-300 mb-1'>
						{label}
					</label>
				)}
				<div className='relative'>
					<select
						ref={ref}
						className={`
              w-full px-3 py-2 rounded-md border
              appearance-none
              bg-gray-800 text-white
              border-gray-700
              focus:outline-none focus:ring-2 focus:ring-blue-500
              disabled:bg-gray-900 disabled:text-gray-600 disabled:cursor-not-allowed
              ${error ? 'border-red-500' : 'border-gray-700'}
              ${className || ''}
            `}
						{...props}
					>
						{options.map(option => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
					<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400'>
						<svg
							className='fill-current h-4 w-4'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 20 20'
						>
							<path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
						</svg>
					</div>
				</div>
				{error && <p className='mt-1 text-sm text-red-400'>{error}</p>}
			</div>
		)
	}
)

Select.displayName = 'Select'

export default Select
