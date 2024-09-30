import { FC } from 'react'
import { Link } from 'react-router-dom'

interface HeaderProps {
	logoSrc: string
	title?: string
}

interface ILink {
	to: string
	title: string
}

const links: ILink[] = [
	{ to: '/', title: 'HOME' },
	{ to: 'daily', title: 'DAILY STAT' },
	{ to: 'general', title: 'GENERAL STAT' },
	{ to: 'case/add', title: 'ADD AV CASE' },
]

export const Header: FC<HeaderProps> = ({ logoSrc, title }) => {
	return (
		<header className='w-full bg-gray-800 py-4 px-6 flex items-center justify-between mb-6 rounded'>
			<Link to='/'>
				<div className='flex items-center space-x-4'>
					<img src={logoSrc} alt='Logo' className='h-8 w-auto' />
					{title && (
						<h1 className='text-lg font-semibold text-white'>{title}</h1>
					)}
				</div>
			</Link>

			<nav className='flex space-x-4'>
				{links.map(item => (
					<Link
						key={item.to}
						to={item.to}
						className='text-white hover:text-blue-400'
					>
						{item.title}
					</Link>
				))}
			</nav>
		</header>
	)
}

export default Header
