import { StatisticDailyRepo } from '../repos/StatisticDailyRepo'
import {
	DailyClosedCasesResponse,
	DailyClosedResponse,
	DailyOpenedCasesResponse,
	DailyOpenedResponse,
	DailyResponse,
	DailyTotalAvResponse,
	DailyTotalCasesResponse,
	DailyTotalResponse,
} from '../responses/daily'
import { formatDate } from '../utils/date'

export class StatisticDailyController {
	static async daily(date: Date, assignee: string): Promise<DailyResponse> {
		const dateStr = formatDate(date)

		const res = await StatisticDailyRepo.daily(dateStr, assignee)
		return res.data
	}

	static async opened(): Promise<DailyOpenedResponse> {
		const res = await StatisticDailyRepo.opened()

		return res.data
	}

	static async cases_opened(): Promise<DailyOpenedCasesResponse> {
		const res = await StatisticDailyRepo.cases_opened()

		return res.data
	}

	static async total(date: Date): Promise<DailyTotalResponse> {
		const dateStr = formatDate(date)

		const res = await StatisticDailyRepo.total(dateStr)
		return res.data
	}

	static async closed(date: Date): Promise<DailyClosedResponse> {
		const dateStr = formatDate(date)

		const res = await StatisticDailyRepo.closed(dateStr)
		return res.data
	}

	static async total_av(date: Date): Promise<DailyTotalAvResponse> {
		const dateStr = formatDate(date)

		const res = await StatisticDailyRepo.total_av(dateStr)
		return res.data
	}

	static async total_cases(date: Date): Promise<DailyTotalCasesResponse> {
		const dateStr = formatDate(date)

		const res = await StatisticDailyRepo.total_cases(dateStr)
		return res.data
	}

	static async closed_cases(date: Date): Promise<DailyClosedCasesResponse> {
		const dateStr = formatDate(date)

		const res = await StatisticDailyRepo.closed_cases(dateStr)
		return res.data
	}
}
