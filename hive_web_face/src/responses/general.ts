export interface GeneralResponse {
	total_cases: number
	total_cases_eset: number
	avg_cases: number
	closed_avg_cases: number
	closed_avg_eset_cases: number
	cases_chart: GeneralLineChart
	closed_cases_chart: GeneralLineChart
	closed_eset_cases_chart: GeneralLineChart
	cases_pie_chart: { name: string; count: number }[]
}

export interface GeneralLineChart {
	labels: string[]
	datasets: GeneralLineChartDataset[]
}

export interface GeneralLineChartDataset {
	label: string
	data: number[]
}
