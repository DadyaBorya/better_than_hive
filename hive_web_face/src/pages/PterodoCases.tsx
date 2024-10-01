import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import LoadingWrapper from '../components/LoadingWrapper'
import StyledLink from '../components/StyledLink'
import Table from '../components/Table'
import TitleCard from '../components/TitleCard'
import { CaseController } from '../controllers/CaseController'
import { CaseResponse } from '../responses/case'
import { getCaseUrl } from '../utils/case'
import { fromTsToDateStr } from '../utils/date'

export function PterodoCasesPage() {
	const [cases, setCases] = useState<CaseResponse[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const navigate = useNavigate()

	const fetchData = async () => {
		try {
			setLoading(true)
			const data = await CaseController.findCasesPterodo()
			setCases(data)
		} catch (e) {
			console.log(e)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	return (
		<div className='flex flex-col gap-2'>
			<TitleCard title='PTERODO CASES' />
			<Button onClick={() => navigate('/case/pterodo/add')} variant='outline'>
				Create new pterodo case
			</Button>
			<LoadingWrapper loading={loading}>
				<Table
					headers={['Number', 'Creation date', 'Status']}
					rows={cases.map(i => [
						<StyledLink href={getCaseUrl(i._id)} isExternal>
							#{i.number}
						</StyledLink>,
						fromTsToDateStr(i._createdAt),
						<div
							className={
								i.status === 'Resolved' ? 'text-green-500' : 'text-red-500'
							}
						>
							{i.status}
						</div>,
					])}
				/>
			</LoadingWrapper>
		</div>
	)
}
