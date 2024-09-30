import { AnchorHTMLAttributes, forwardRef } from 'react'

interface StyledLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	label?: string
	error?: string
	isExternal?: boolean
}

export const StyledLink = forwardRef<HTMLAnchorElement, StyledLinkProps>(
	({ label, error, className, isExternal, children, ...props }, ref) => {
		const baseClasses = `
      w-full px-3 py-2 rounded-md border
      bg-gray-800 text-white
      border-gray-700
      focus:outline-none focus:ring-2 focus:ring-blue-500
      placeholder-gray-500
      disabled:bg-gray-900 disabled:text-gray-600 disabled:cursor-not-allowed
      ${error ? 'border-red-500' : 'border-gray-700'}
    `

		const combinedClasses = `${baseClasses} ${className || ''}`.trim()

		const externalProps = isExternal
			? { target: '_blank', rel: 'noopener noreferrer' }
			: {}

		return (
			<div className='w-full'>
				{label && (
					<label className='block text-sm font-medium text-gray-300 mb-1'>
						{label}
					</label>
				)}
				<a ref={ref} className={combinedClasses} {...externalProps} {...props}>
					{children}
					{isExternal && (
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-5 w-5 ml-2 inline'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
							/>
						</svg>
					)}
				</a>
				{error && <p className='mt-1 text-sm text-red-400'>{error}</p>}
			</div>
		)
	}
)

StyledLink.displayName = 'StyledLink'

export default StyledLink
