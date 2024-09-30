import React, { ReactNode } from 'react'

interface TableProps {
	headers: string[]
	rows: ReactNode[][]
	className?: string
}

export const Table: React.FC<TableProps> = ({ headers, rows, className }) => {
	return (
		<div className='w-full overflow-x-auto'>
			<table
				className={`w-full border-collapse rounded-lg overflow-hidden ${
					className || ''
				}`}
			>
				<thead>
					<tr>
						{headers.map((header, index) => (
							<th
								key={index}
								className={`
                  px-4 py-3 text-left text-base font-semibold text-white bg-gray-700 border-b-2 border-gray-600
                  ${index === 0 ? 'rounded-tl-lg' : ''}
                  ${index === headers.length - 1 ? 'rounded-tr-lg' : ''}
                `}
							>
								{header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows.map((row, rowIndex) => (
						<tr key={rowIndex}>
							{row.map((cell, cellIndex) => (
								<td
									key={cellIndex}
									className={`
                    px-4 py-3 text-base text-white bg-gray-800 border-b border-gray-700
                    ${
											rowIndex === rows.length - 1 && cellIndex === 0
												? 'rounded-bl-lg'
												: ''
										}
                    ${
											rowIndex === rows.length - 1 &&
											cellIndex === row.length - 1
												? 'rounded-br-lg'
												: ''
										}
                  `}
								>
									{cell}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Table
