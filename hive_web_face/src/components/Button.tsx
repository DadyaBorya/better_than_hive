import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary' | 'outline'
	size?: 'small' | 'medium' | 'large'
	loading?: boolean // Add loading prop
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant = 'primary',
			size = 'medium',
			children,
			loading = false,
			...props
		},
		ref
	) => {
		const baseStyle =
			'font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors'

		const variants = {
			primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
			secondary: 'bg-gray-700 hover:bg-gray-600 text-white focus:ring-gray-500',
			outline:
				'bg-transparent hover:bg-gray-700 text-gray-300 border border-gray-600 hover:border-gray-500 focus:ring-gray-500',
		}

		const sizes = {
			small: 'px-3 py-1.5 text-sm',
			medium: 'px-4 py-2 text-base',
			large: 'px-6 py-3 text-lg',
		}

		const spinner = (
			<svg
				className='animate-spin h-5 w-5 text-white'
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'
			>
				<circle
					className='opacity-25'
					cx='12'
					cy='12'
					r='10'
					stroke='currentColor'
					strokeWidth='4'
				></circle>
				<path
					className='opacity-75'
					fill='currentColor'
					d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
				></path>
			</svg>
		)

		const classes = `${baseStyle} ${variants[variant]} ${sizes[size]} ${
			className || ''
		} ${loading ? 'cursor-not-allowed opacity-75' : ''}`

		return (
			<button ref={ref} className={classes} disabled={loading} {...props}>
				{loading ? (
					<div className='flex justify-center items-center'>{spinner}</div>
				) : (
					children
				)}
			</button>
		)
	}
)

Button.displayName = 'Button'

export default Button
