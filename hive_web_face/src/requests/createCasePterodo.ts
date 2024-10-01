export interface CreateCasePterodoRequest {
	ip: string
	hostname: string
	responsible: string
	responsible_is: string
	unit: string
	internet: 'Dnipro' | 'Internet'
	critical: 1 | 2 | 3
	edr: '-' | '+'
	av: '-' | '+'
}
