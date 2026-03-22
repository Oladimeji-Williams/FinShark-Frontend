"use client"

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react"
import type { User } from "@/types"
import {
    register as apiRegister,
    login as apiLogin,
    logout as apiLogout,
    getProfile as apiGetProfile,
    isAuthenticated,
} from "@/lib/usersApi"

type AuthState = {
    user: User | null
    token: string | null
    isAuthenticated: boolean
    loading: boolean
    login: (email: string, password: string) => Promise<void>
    register: (userName: string, email: string, password: string) => Promise<void>
    logout: () => void
}

const AuthContext = createContext<AuthState | undefined>(undefined)

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    // Initialize auth on mount by checking stored token and fetching profile
    useEffect(() => {
        const initAuth = async () => {
            try {
                if (isAuthenticated()) {
                    const profile = await apiGetProfile()
                    setUser(profile)
                    setToken(localStorage.getItem("auth_token"))
                }
            } catch (error) {
                console.error("Failed to restore auth:", error)
                apiLogout()
            } finally {
                setLoading(false)
            }
        }

        void initAuth()
    }, [])

    const login = async (email: string, password: string) => {
        try {
            const response = await apiLogin({ email, password })
            if (response.user && response.token) {
                setUser(response.user)
                setToken(response.token)
            } else {
                throw new Error("Invalid login response")
            }
        } catch (error) {
            throw error
        }
    }

    const register = async (userName: string, email: string, password: string) => {
        try {
            const response = await apiRegister({
                userName,
                email,
                password,
            })
            if (response.user && response.token) {
                setUser(response.user)
                setToken(response.token)
            } else {
                throw new Error("Invalid register response")
            }
        } catch (error) {
            throw error
        }
    }

    const logout = () => {
        setUser(null)
        setToken(null)
        apiLogout()
    }

    const value = useMemo(
        () => ({
            user,
            token,
            isAuthenticated: Boolean(user && token),
            loading,
            login,
            register,
            logout,
        }),
        [user, token, loading]
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
