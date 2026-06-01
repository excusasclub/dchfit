export interface DailyLog {
    id: string
    user_id: string
    date: string
    steps: number | null
    weight: number | null
    sleep_hours: number | null
    notes: string | null
    custom_fields: { label: string; value: string }[]
}