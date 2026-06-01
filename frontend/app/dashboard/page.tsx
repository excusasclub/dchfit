"use client"

import { useAuthStore } from "@/store/auth.store"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardPage() {
    const { user, logout, hydrate } = useAuthStore()
    const router = useRouter()

    useEffect(() => {
        hydrate()
    }, [])

    useEffect(() => {
        if (!user) {
            router.push("/login")
        }
    }, [user, router])

    if (!user) return null

    return (
        <main className="min-h-screen p-6">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-xl font-bold">dchfit</h1>
                <button
                    onClick={() => {
                        logout()
                        router.push("/login")
                    }}
                    className="text-sm text-zinc-500 hover:text-white"
                >
                    Salir
                </button>
            </div>
            <p className="text-zinc-400">Hola, {user.username}</p>
        </main>
    )
}