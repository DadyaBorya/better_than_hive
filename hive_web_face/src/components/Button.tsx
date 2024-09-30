import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary' | 'outline'
	size?: 'small' | 'medium' | 'large'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{ className, variant = 'primary', size = 'medium', children, ...props },
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

		const classes = `${baseStyle} ${variants[variant]} ${sizes[size]} ${
			className || ''
		}`

		return (
			<button ref={ref} className={classes} {...props}>
				{children}
			</button>
		)
	}
)

Button.displayName = 'Button'

export default Button
