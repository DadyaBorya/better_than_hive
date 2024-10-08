import { CaseRepo } from '../repos/CaseRepo'
import { CaseQueryRequest } from '../requests/caseQuerry'
import { CreateCaseEsetRequest } from '../requests/createCaseEset'
import { CreateCasePterodoRequest } from '../requests/createCasePterodo'
import { CaseResponse } from '../responses/case'
import { CreateCaseResponse } from '../responses/caseEset'
import { formatDate } from '../utils/date'

export class CaseController {
	static async case(query: CaseQueryRequest): Promise<CaseResponse[]> {
		const res = await CaseRepo.case(query)
		return res.data
	}

	static async createCaseEset(
		data: CreateCaseEsetRequest
	): Promise<CreateCaseResponse> {
		const res = await CaseRepo.createEsetCase(data)
		return res.data
	}

	static async createCasePterodo(
		data: CreateCasePterodoRequest
	): Promise<CreateCaseResponse> {
		const res = await CaseRepo.createPterodoCase(data)
		return res.data
	}

	static async caseEset(date: Date): Promise<CaseResponse[]> {
		const formatedDate = formatDate(date)
		const res = await CaseRepo.caseEset(formatedDate)
		return res.data
	}

	static async findCasesPterodo(): Promise<CaseResponse[]> {
		const res = await CaseRepo.findCasesPterodo()
		return res.data
	}
}
