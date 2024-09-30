import { AVCaseFormPage } from '../pages/AVCaseForm'
import { CaseListPage } from '../pages/CaseList'
import { DailyStatPage } from '../pages/DailyStat'
import { GeneralStatPage } from '../pages/GeneralStat'
import { MainPage } from '../pages/Main'
import { Route } from './AppRoutes'

export const publicRoutes: Route[] = [
	{
		path: '/',
		element: <MainPage />,
	},
	{
		path: '/case/add',
		element: <AVCaseFormPage />,
	},
	{
		path: '/general',
		element: <GeneralStatPage />,
	},
	{
		path: '/daily',
		element: <DailyStatPage />,
	},
	{
		path: '/cases',
		element: <CaseListPage />,
	},
]
