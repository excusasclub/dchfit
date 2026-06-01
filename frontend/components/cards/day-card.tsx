import { DailyLog } from "@/types"
import { formatDayLabel, isToday } from "@/lib/dates"

interface DayCardProps {
    date: string
    log: DailyLog | null
}

export default function DayCard({ date, log }: DayCardProps) {
    const today = isToday(date)

    return (
        <div className={`rounded-xl border p-4 space-y-2 ${today ? "border-white/20 bg-zinc-800" : "border-zinc-800 bg-zinc-900"}`}>
            <p className={`text-sm font-medium capitalize ${today ? "text-white" : "text-zinc-400"}`}>
                {formatDayLabel(date)}
            </p>
            <div className="space-y-1 text-sm text-zinc-500">
                <p>{log?.steps != null ? `${log.steps} pasos` : "sin pasos"}</p>
                <p>{log?.sleep_hours != null ? `${log.sleep_hours}h sueño` : "sin sueño"}</p>
                <p>{log?.weight != null ? `${log.weight} kg` : "sin peso"}</p>
                {log?.notes && <p className="text-zinc-400 italic">{log.notes}</p>}
            </div>
        </div>
    )
}