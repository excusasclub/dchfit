import api from "@/lib/axios"
import { DailyLog } from "@/types"

export const dailyLogService = {
    async getWeek(start: string, end: string): Promise<DailyLog[]> {
        const res = await api.get("/daily-logs/week", { params: { start, end } })
        return res.data
    },

    async getDay(date: string): Promise<DailyLog> {
        const res = await api.get(`/daily-logs/${date}`)
        return res.data
    },

    async updateDay(date: string, data: Partial<DailyLog>): Promise<DailyLog> {
        const res = await api.patch(`/daily-logs/${date}`, data)
        return res.data
    },
}