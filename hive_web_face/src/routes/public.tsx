import { DailyStatPage } from '../pages/DailyStat'
import { EsetCaseFormPage } from '../pages/EsetCaseForm'
import { EsetCasesPage } from '../pages/EsetCases'
import { GeneralStatPage } from '../pages/GeneralStat'
import { MainPage } from '../pages/Main'
import { PterodoCaseFormPage } from '../pages/PterodoCaseForm'
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
		path: '/cases/pterodo',
		element: <PterodoCasesPage />,
	},
	{
		path: '/cases/eset',
		element: <EsetCasesPage />,
	},
	{
		path: '/case/pterodo/add',
		element: <PterodoCaseFormPage />,
	},
]
