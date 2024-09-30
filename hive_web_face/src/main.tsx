import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Header from './components/Header'
import Logo from './images/logo.png'
import './index.css'
import Layer from './pages/Layer'
import { AppRoutes } from './routes/AppRoutes'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<Layer>
				<Header title='6 Cyber ayseL' logoSrc={Logo} />
				<AppRoutes />
			</Layer>
		</BrowserRouter>
	</StrictMode>
)
