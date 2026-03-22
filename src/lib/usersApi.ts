import axios from "axios"
import type {
    User,
    AuthResponse,
    RegisterRequest,
    LoginRequest,
    UpdateProfileRequest,
} from "@/types"

const api = axios.create({
    baseURL: "https://localhost:5001/api/auth",
    headers: { "Content-Type": "application/json" },
})

// Add authorization header when token exists
api.interceptors.request.use((config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

type ApiWrapper<T> = {
    success: boolean
    data?: T
    message?: string
    errors?: string[]
}

export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
    try {
        const { data: wrapper } = await api.post<ApiWrapper<AuthResponse>>("/register", data)
        if (!wrapper.success || !wrapper.data) {
            const message =
                wrapper.message ||
                (wrapper.errors ? wrapper.errors.join("; ") : "Registration failed")
            throw new Error(`Registration failed: ${message}`)
        }

        const authData = wrapper.data

        if (authData.token) {
            localStorage.setItem("auth_token", authData.token)
        }

        return authData
    } catch (error) {
        const axiosError = error as any
        const serverMessage =
            axiosError?.response?.data?.message ||
            (axiosError?.response?.data?.errors
                ? axiosError.response.data.errors.join("; ")
                : undefined) ||
            (error instanceof Error ? error.message : "Unknown error")

        throw new Error(`Registration failed: ${serverMessage}`)
    }
}

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
    try {
        const { data: wrapper } = await api.post<ApiWrapper<AuthResponse>>("/login", data)
        if (!wrapper.success || !wrapper.data) {
            const message =
                wrapper.message || (wrapper.errors ? wrapper.errors.join("; ") : "Login failed")
            throw new Error(`Login failed: ${message}`)
        }

        const authData = wrapper.data

        if (authData.token) {
            localStorage.setItem("auth_token", authData.token)
        }

        return authData
    } catch (error) {
        const axiosError = error as any
        const serverMessage =
            axiosError?.response?.data?.message ||
            (axiosError?.response?.data?.errors
                ? axiosError.response.data.errors.join("; ")
                : undefined) ||
            (error instanceof Error ? error.message : "Unknown error")

        throw new Error(`Login failed: ${serverMessage}`)
    }
}

export const getProfile = async (): Promise<User> => {
    try {
        const { data } = await api.get<User>("/profile")
        return data
    } catch (error) {
        throw new Error(
            `Failed to fetch profile: ${error instanceof Error ? error.message : "Unknown error"}`
        )
    }
}

export const updateProfile = async (data: UpdateProfileRequest): Promise<User> => {
    try {
        const { data: response } = await api.patch<User>("/profile", data)
        return response
    } catch (error) {
        throw new Error(
            `Failed to update profile: ${error instanceof Error ? error.message : "Unknown error"}`
        )
    }
}

export const logout = (): void => {
    localStorage.removeItem("auth_token")
}

export const getToken = (): string | null => {
    return typeof window !== "undefined" ? localStorage.getItem("auth_token") : null
}

export const isAuthenticated = (): boolean => {
    return !!getToken()
}
