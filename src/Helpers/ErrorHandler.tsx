import axios, { AxiosError } from "axios"
import { toast } from "react-toastify"

type ValidationErrorPayload = {
    errors?: string[] | Record<string, string[]>
}

export const handleError = (error: unknown): void => {
    if (!axios.isAxiosError(error)) return

    const axiosError = error as AxiosError<ValidationErrorPayload | string>
    const status = axiosError.response?.status
    const data = axiosError.response?.data

    if (data && typeof data === "object" && "errors" in data) {
        const errors = data.errors

        if (Array.isArray(errors)) {
            errors.forEach((message) => {
                toast.warning(message)
            })
            return
        }

        if (errors && typeof errors === "object") {
            Object.values(errors).forEach((messages) => {
                if (Array.isArray(messages) && messages[0]) {
                    toast.warning(messages[0])
                }
            })
            return
        }
    }

    if (typeof data === "string") {
        toast.warning(data)
        return
    }

    if (status === 401) {
        toast.warning("Please login")
        window.history.pushState({}, "LoginPage", "/login")
        return
    }

    toast.warning("An unexpected error occurred.")
}
