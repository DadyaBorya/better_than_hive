import { DailyStatPage } from '../pages/DailyStat'
import { EsetCaseFormPage } from '../pages/EsetCaseForm'
import { GeneralStatPage } from '../pages/GeneralStat'
import { MainPage } from '../pages/Main'
import { PterodoCasesPage } from '../pages/PterodoCases'
import { Route } from './AppRoutes'

export const publicRoutes: Route[] = [
	{
		path: '/',
		element: <MainPage />,
	},
	{
		path: '/case/eset/add',
		element: <EsetCaseFormPage />,
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
		element: <PterodoCasesPage />,
	},
]
