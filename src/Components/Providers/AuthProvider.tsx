"use client"

import { createContext, ReactNode, useContext, useMemo, useState } from "react"
import {
    storedAuthSchema,
    storedUsersSchema,
    userSchema,
    loginSchema,
    registerCredentialsSchema,
    type User,
} from "@/Components/Auth/authSchemas"

type AuthState = {
    user: User | null
    token: string | null
    isAuthenticated: boolean
    login: (email: string, password: string) => Promise<void>
    register: (email: string, fullName: string, password: string) => Promise<void>
    logout: () => void
}

const AuthContext = createContext<AuthState | undefined>(undefined)

const AUTH_STORAGE_KEY = "finshark-auth"
const USERS_STORAGE_KEY = "finshark-registered-users"

const getStoredAuth = (): { user: User; token: string } | null => {
    if (typeof window === "undefined") return null
    try {
        const serialized = localStorage.getItem(AUTH_STORAGE_KEY)
        if (!serialized) return null
        const parsed = storedAuthSchema.safeParse(JSON.parse(serialized))
        return parsed.success ? parsed.data : null
    } catch {
        return null
    }
}

const saveStoredAuth = (data: { user: User; token: string } | null) => {
    if (typeof window === "undefined") return
    if (!data) {
        localStorage.removeItem(AUTH_STORAGE_KEY)
        return
    }
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data))
}

const getUsers = (): Array<{ email: string; fullName: string; password: string }> => {
    if (typeof window === "undefined") return []
    try {
        const parsed = storedUsersSchema.safeParse(JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) ?? "[]"))
        return parsed.success ? parsed.data : []
    } catch {
        return []
    }
}

const setUsers = (users: Array<{ email: string; fullName: string; password: string }>) => {
    if (typeof window === "undefined") return
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
}

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(() => getStoredAuth()?.user ?? null)
    const [token, setToken] = useState<string | null>(() => getStoredAuth()?.token ?? null)
    const login = async (email: string, password: string) => {
        const credentials = loginSchema.safeParse({ email, password })
        if (!credentials.success) {
            throw new Error(
                credentials.error.issues[0]?.message ?? "Please review your credentials and try again."
            )
        }
        const users = getUsers()
        const existing = users.find((u) => u.email.toLowerCase() === credentials.data.email)
        if (!existing || existing.password !== password) {
            throw new Error("Invalid credentials. Please check your email and password.")
        }

        const userData = userSchema.parse({ email: existing.email, fullName: existing.fullName })
        const fakeToken = `token-${Date.now()}`
        setUser(userData)
        setToken(fakeToken)
        saveStoredAuth({ user: userData, token: fakeToken })
    }

    const register = async (email: string, fullName: string, password: string) => {
        const credentials = registerCredentialsSchema.safeParse({ email, fullName, password })
        if (!credentials.success) {
            throw new Error(
                credentials.error.issues[0]?.message ??
                    "Please review your registration details and try again."
            )
        }
        const users = getUsers()
        const alreadyExists = users.some((u) => u.email.toLowerCase() === credentials.data.email)
        if (alreadyExists) {
            throw new Error("An account with that email already exists.")
        }

        const nextUsers = [...users, credentials.data]
        setUsers(nextUsers)
    }

    const logout = () => {
        setUser(null)
        setToken(null)
        saveStoredAuth(null)
    }

    const value = useMemo(
        () => ({
            user,
            token,
            isAuthenticated: Boolean(user && token),
            login,
            register,
            logout,
        }),
        [user, token]
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider")
    }
    return context
}

export { AuthProvider, useAuth }
