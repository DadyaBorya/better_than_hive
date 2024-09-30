import {
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Tooltip,
} from 'chart.js'
import React from 'react'
import { Line } from 'react-chartjs-2'
import { Dataset } from '../utils/charts'
import { BACKGROUND_COLORS_LINE, BORDER_COLORS_LINE } from '../utils/colors'

ChartJS.register(
	LineElement,
	CategoryScale,
	LinearScale,
	PointElement,
	Tooltip,
	Legend
)

interface LineChartProps {
	labels: string[]
	datasets: Dataset[]
	title?: string
}

const LineChart: React.FC<LineChartProps> = ({ labels, datasets, title }) => {
	const chartData = {
		labels: labels,
		datasets: datasets.map((dataset, i) => ({
			label: dataset.label,
			data: dataset.data,
			borderColor: BORDER_COLORS_LINE[i],
			backgroundColor: BACKGROUND_COLORS_LINE[i],
			borderWidth: 2,
			fill: true,
		})),
	}

	const chartOptions = {
		responsive: true,
		scales: {
			x: {
				grid: {
					color: '#444',
				},
				ticks: {
					color: '#fff',
				},
			},
			y: {
				grid: {
					color: '#444',
				},
				ticks: {
					color: '#fff',
				},
			},
		},
		plugins: {
			legend: {
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

	return (
		<div className='bg-gray-800 p-5 rounded-lg shadow-lg'>
			<h2 className='text-sm font-medium text-gray-300 mb-4'>{title}</h2>
			<Line data={chartData} options={chartOptions} />
		</div>
	)
}

export default LineChart
