export interface DailyResponse
	extends DailyTotalResponse,
		DailyClosedResponse,
		DailyTotalAvResponse,
		DailyTotalCasesResponse,
		DailyClosedCasesResponse,
		DailyOpenedResponse,
		DailyOpenedCasesResponse {}

export interface DailyOpenedResponse {
	opened: number
}

export interface DailyTotalResponse {
	total: number
}

export interface DailyClosedResponse {
	closed: number
}

export interface DailyTotalAvResponse {
	total_av: number
}

export interface DailyTotalCasesResponse {
	cases: { name: string; count: number }[]
}

export interface DailyClosedCasesResponse {
	cases_closed: { name: string; count: number }[]
}

export interface DailyOpenedCasesResponse {
	cases_opened: { name: string; count: number }[]
}
