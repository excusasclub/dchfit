import { create } from "zustand"

interface AuthState {
    accessToken: string | null
    user: { id: string; username: string; email: string } | null
    setAuth: (token: string, user: AuthState["user"]) => void
    logout: () => void
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
        set({ accessToken: null, user: null })
    },
}))