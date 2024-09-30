export function formatDate(date: Date): string {
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const day = String(date.getDate()).padStart(2, '0')

	return `${year}-${month}-${day}`
}

export function fromTsToDateStr(ts: number): string {
	const date = new Date(ts)

	return date.toLocaleString('en-GB', {
		hour: '2-digit',
		minute: '2-digit',
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	})
}
