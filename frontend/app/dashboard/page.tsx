"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/auth.store"
import { dailyLogService } from "@/services/daily-log.service"
import { getWeekDates } from "@/lib/dates"
import DayCard from "@/components/cards/day-card"
import { DailyLog } from "@/types"

export default function DashboardPage() {
    const { user, logout, hydrate } = useAuthStore()
    const router = useRouter()
    const [logs, setLogs] = useState<Record<string, DailyLog>>({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        hydrate()
    }, [])

    useEffect(() => {
        if (!user) {
            router.push("/login")
            return
        }
        loadWeek()
    }, [user])

    async function loadWeek() {
        const dates = getWeekDates()
        const start = dates[0]
        const end = dates[6]
        try {
            const data = await dailyLogService.getWeek(start, end)
            const map: Record<string, DailyLog> = {}
            data.forEach((log) => { map[log.date] = log })
            setLogs(map)
        } finally {
            setLoading(false)
        }
    }

    if (!user || loading) return null

    const dates = getWeekDates()

    return (
        <main className="min-h-screen p-6">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-xl font-bold">dchfit</h1>
                <button
                    onClick={() => { logout(); router.push("/login") }}
                    className="text-sm text-zinc-500 hover:text-white"
                >
                    Salir
                </button>
            </div>
            <h2 className="text-sm text-zinc-500 mb-4">Semana actual</h2>
            <div className="grid gap-3">
                {dates.map((date) => (
                    <DayCard key={date} date={date} log={logs[date] ?? null} />
                ))}
            </div>
        </main>
    )
}