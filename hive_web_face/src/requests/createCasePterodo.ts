export interface CreateCasePterodoRequest {
	ip: string
	hostname: string
	responsible: string
	responsible_is: string
	unit: string
	internet: 'Dnipro' | 'Internet'
	critical: number
	edr: '-' | '+'
	av: '-' | '+'
	threat_actor: string
	malware_type: string
	delivery: string
	flash_drive_number: string
	date_detection: Date | string
	infected_files: string
	infected_disk: string
	creator: string
}
