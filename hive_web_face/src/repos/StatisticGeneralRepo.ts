import { AxiosResponse } from 'axios'
import { instance } from '../http'
import { GeneralRequest } from '../requests/general'
import { GeneralResponse } from '../responses/general'

export class StatisticGeneralRepo {
	static async general(
		payload: GeneralRequest,
	): Promise<AxiosResponse<GeneralResponse>> {
		return instance.post<GeneralResponse>('/statistic/general', payload)
	}
}
