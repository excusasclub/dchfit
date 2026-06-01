import api from "@/lib/axios"

export const authService = {
    async register(username: string, email: string, password: string) {
        const res = await api.post("/auth/register", { username, email, password })
        return res.data
    },

    async login(email: string, password: string) {
        const res = await api.post("/auth/login", { email, password })
        return res.data
    },

    async me() {
        const res = await api.get("/auth/me")
        return res.data
    },
}