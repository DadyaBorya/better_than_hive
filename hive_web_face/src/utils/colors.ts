function generateRandomColor(opacity: number = 0.6): string {
	const r = Math.floor(Math.random() * 256)
	const g = Math.floor(Math.random() * 256)
	const b = Math.floor(Math.random() * 256)
	return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

function generateColorArray(size: number, opacity: number = 0.6): string[] {
	const colors: string[] = []
	for (let i = 0; i < size; i++) {
		colors.push(generateRandomColor(opacity))
	}
	return colors
}

export const BACKGROUND_COLORS_PIE = generateColorArray(256, 0.6)

export const BORDER_COLORS_PIE = BACKGROUND_COLORS_PIE.map(i =>
	i.replace(' 0.6)', ' 1.0)')
)

export const BORDER_COLORS_LINE = generateColorArray(256, 1)

export const BACKGROUND_COLORS_LINE = BORDER_COLORS_LINE.map(i =>
	i.replace(' 1)', ' 0.2)')
)
