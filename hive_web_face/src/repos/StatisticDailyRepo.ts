import { AxiosResponse } from 'axios'
import { instance } from '../http'
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

export class StatisticDailyRepo {
	static async daily(date: string, assignee: string): Promise<AxiosResponse<DailyResponse>> {
		return instance.post<DailyResponse>('/statistic/daily', { date, assignee })
	}

	static async cases_opened(): Promise<
		AxiosResponse<DailyOpenedCasesResponse>
	> {
		return instance.post<DailyOpenedCasesResponse>(
			'/statistic/daily/opened/cases'
		)
	}

	static async opened(): Promise<AxiosResponse<DailyOpenedResponse>> {
		return instance.post<DailyOpenedResponse>('/statistic/daily/opened')
	}

	static async total(date: string): Promise<AxiosResponse<DailyTotalResponse>> {
		return instance.post<DailyTotalResponse>('/statistic/daily/total', {
			date,
		})
	}

	static async closed(
		date: string
	): Promise<AxiosResponse<DailyClosedResponse>> {
		return instance.post<DailyClosedResponse>('/statistic/daily/closed', {
			date,
		})
	}

	static async total_av(
		date: string
	): Promise<AxiosResponse<DailyTotalAvResponse>> {
		return instance.post<DailyTotalAvResponse>('/statistic/daily/total_av', {
			date,
		})
	}

	static async total_cases(
		date: string
	): Promise<AxiosResponse<DailyTotalCasesResponse>> {
		return instance.post<DailyTotalCasesResponse>(
			'/statistic/daily/total/cases',
			{
				date,
			}
		)
	}

	static async closed_cases(
		date: string
	): Promise<AxiosResponse<DailyClosedCasesResponse>> {
		return instance.post<DailyClosedCasesResponse>(
			'/statistic/daily/closed/cases',
			{
				date,
			}
		)
	}
}
