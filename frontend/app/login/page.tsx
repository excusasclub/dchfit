"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { authService } from "@/services/auth.service"
import { useAuthStore } from "@/store/auth.store"

export default function LoginPage() {
    const router = useRouter()
    const { setAuth } = useAuthStore()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError("")
        try {
            const data = await authService.login(email, password)
            localStorage.setItem("access_token", data.access_token)
            const me = await authService.me()
            localStorage.setItem("auth_user", JSON.stringify(me))
            setAuth(data.access_token, me)
            router.push("/dashboard")
        } catch {
            setError("Credenciales incorrectas")
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center px-4">
            <div className="w-full max-w-sm space-y-6">
                <h1 className="text-2xl font-bold text-center">dchfit</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm outline-none focus:border-zinc-500"
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm outline-none focus:border-zinc-500"
                    />
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-md bg-white py-2 text-sm font-medium text-black hover:bg-zinc-200 disabled:opacity-50"
                    >
                        {loading ? "Entrando..." : "Entrar"}
                    </button>
                </form>
                <p className="text-center text-sm text-zinc-500">
                    ¿No tienes cuenta?{" "}
                    <a href="/register" className="text-white hover:underline">
                        Regístrate
                    </a>
                </p>
            </div>
        </main>
    )
}