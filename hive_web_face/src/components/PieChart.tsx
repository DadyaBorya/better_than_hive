import {
	ArcElement,
	Chart as ChartJS,
	ChartOptions,
	Legend,
	Tooltip,
} from 'chart.js'
import React from 'react'
import { Pie } from 'react-chartjs-2'
import { BACKGROUND_COLORS_PIE, BORDER_COLORS_PIE } from '../utils/colors'

ChartJS.register(ArcElement, Tooltip, Legend)

interface PieChartProps {
	labels: string[]
	data: number[]
	title?: string
	displayLegend?: boolean
}

const PieChart: React.FC<PieChartProps> = ({
	labels,
	data,
	title,
	displayLegend = true,
}) => {
	const chartData = {
		labels: labels,
		datasets: [
			{
				label: title,
				data: data,
				backgroundColor: BACKGROUND_COLORS_PIE,
				borderColor: BORDER_COLORS_PIE,
				borderWidth: 2,
			},
		],
	}

	const chartOptions: ChartOptions<'pie'> = {
		responsive: true,
		plugins: {
			legend: {
				display: displayLegend,
				position: 'top',
				labels: {
					color: '#fff',
				},
			},
			tooltip: {
				bodyColor: '#fff',
				titleColor: '#fff',
				backgroundColor: 'rgba(0, 0, 0, 0.7)',
			},
		},
	}

	if (labels.length === 0 && data.length === 0) {
		return (
			<div className='text-gray-300 text-center font-bold text-3xl'>
				No values present
			</div>
		)
	}

	return (
		<div className='bg-gray-800 rounded-lg '>
			<h2 className='text-sm font-medium text-gray-300 mb-4'>{title}</h2>
			<Pie data={chartData} options={chartOptions} />
		</div>
	)
}

export default PieChart
