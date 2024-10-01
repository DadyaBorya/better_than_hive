import { AxiosResponse } from 'axios'
import { instance } from '../http'
import { CaseQueryRequest } from '../requests/caseQuerry'
import { CreateCaseEsetRequest } from '../requests/createCaseEset'
import { CreateCasePterodoRequest } from '../requests/createCasePterodo'
import { CaseResponse } from '../responses/case'
import { CreateCaseResponse } from '../responses/caseEset'

const queryPterodo = {
	query: [
		{
			_name: 'listCase',
		},
		{
			_name: 'filter',
			_and: [
				{
					_field: 'assignee',
					_value: '6czi@cyber.ua',
				},
				{
					_like: {
						_field: 'title',
						_value: 'Malicious Code',
					},
				},
				{
					_like: {
						_field: 'tags',
						_value: 'Mannually',
					},
				},
				{
					_like: {
						_field: 'description',
						_value: '*"Pterodo"*',
					},
				},
			],
		},
		{
			_name: 'sort',
			_fields: [
				{
					flag: 'desc',
				},
				{
					number: 'desc',
				},
			],
		},
	],
}

export class CaseRepo {
	static async case(
		query: CaseQueryRequest
	): Promise<AxiosResponse<CaseResponse[]>> {
		return instance.post<CaseResponse[]>('/case', query)
	}

	static async createEsetCase(
		data: CreateCaseEsetRequest
	): Promise<AxiosResponse<CreateCaseResponse>> {
		return instance.post<CreateCaseResponse>('/case/eset', data)
	}

	static async createPterodoCase(
		data: CreateCasePterodoRequest
	): Promise<AxiosResponse<CreateCaseResponse>> {
		return instance.post<CreateCaseResponse>('/case/pterodo', data)
	}

	static async caseEset(date: string): Promise<AxiosResponse<CaseResponse[]>> {
		return instance.post<CaseResponse[]>('/case/eset/today', { date })
	}

	static async findCasesPterodo(): Promise<AxiosResponse<CaseResponse[]>> {
		return instance.post<CaseResponse[]>('/case', {
			query: JSON.stringify(queryPterodo),
		})
	}
}
