import { StatisticGeneralRepo } from '../repos/StatisticGeneralRepo'
import { GeneralRequest } from '../requests/general'
import { GeneralResponse } from '../responses/general'

export class StatisticGeneralController {
	static async general(payload: GeneralRequest): Promise<GeneralResponse> {
		const res = await StatisticGeneralRepo.general(payload)
		return res.data
	}
}
