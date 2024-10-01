export const getCaseUrl = (case_id: string) => {
	return `https://irm.cyber.ua/index.html#!/case/~${case_id}/details`
}

export const internetOptions = [
	{ value: 'Internet', label: 'Internet' },
	{ value: 'Dnipro', label: 'Dnipro' },
]

export const criticalCategoryOptions = [
	{ value: 1, label: '1' },
	{ value: 2, label: '2' },
	{ value: 3, label: '3' },
]

export const isExistOptions = [
	{value: '-', label: '-'},
	{value: '+', label: '+'},
]
