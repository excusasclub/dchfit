export function getWeekDates(date: Date = new Date()): string[] {
    const day = date.getDay()
    const monday = new Date(date)
    monday.setDate(date.getDate() - (day === 0 ? 6 : day - 1))

    return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(monday)
        d.setDate(monday.getDate() + i)
        return d.toISOString().split("T")[0]
    })
}

export function formatDayLabel(dateStr: string): string {
    const date = new Date(dateStr + "T00:00:00")
    return date.toLocaleDateString("es-ES", { weekday: "long", day: "numeric" })
}

export function isToday(dateStr: string): boolean {
    return dateStr === new Date().toISOString().split("T")[0]
}