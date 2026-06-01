import { create } from "zustand"

interface AuthState {
    accessToken: string | null
    user: { id: string; username: string; email: string } | null
    setAuth: (token: string, user: AuthState["user"]) => void
    logout: () => void
    hydrate: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
    accessToken: null,
    user: null,
    setAuth: (token, user) => {
        localStorage.setItem("access_token", token)
        set({ accessToken: token, user })
    },
    logout: () => {
        localStorage.removeItem("access_token")
        localStorage.removeItem("auth_user")
        set({ accessToken: null, user: null })
    },
    hydrate: () => {
        const token = localStorage.getItem("access_token")
        const userRaw = localStorage.getItem("auth_user")
        if (token && userRaw) {
            set({ accessToken: token, user: JSON.parse(userRaw) })
        }
    },
}))