import { AxiosResponse } from 'axios'
import { instance } from '../http'
import { CreateCaseEsetRequest } from '../requests/caseEset'
import { CaseQueryRequest } from '../requests/caseQuerry'
import { CaseResponse } from '../responses/case'
import { CaseEsetResponse } from '../responses/caseEset'

export class CaseRepo {
	static async case(
		query: CaseQueryRequest
	): Promise<AxiosResponse<CaseResponse[]>> {
		return instance.post<CaseResponse[]>('/case', query)
	}

	static async createEsetCase(
		data: CreateCaseEsetRequest
	): Promise<AxiosResponse<CaseEsetResponse>> {
		console.log(data)

		return instance.post<CaseEsetResponse>('/case/eset', data)
	}

	static async caseEset(date: string): Promise<AxiosResponse<CaseResponse[]>> {
		return instance.post<CaseResponse[]>('/case/eset/today', { date })
	}
}
