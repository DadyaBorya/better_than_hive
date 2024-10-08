import { create } from 'zustand'

type AlertType = 'error' | 'warning' | 'success'

interface AlertState {
	type: AlertType
	message: string
	isVisible: boolean
	showAlert: (type: AlertType, message: string) => void
	hideAlert: () => void
}

export const useAlertStore = create<AlertState>(set => ({
	type: 'error',
	message: '',
	isVisible: false,
	showAlert: (type, message) => set({ type, message, isVisible: true }),
	hideAlert: () => set({ isVisible: false }),
}))
