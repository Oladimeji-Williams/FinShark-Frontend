"use client"

import {
    createContext,
    type ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react"
import {
    FaCheckCircle,
    FaExclamationCircle,
    FaInfoCircle,
    FaTimes,
} from "react-icons/fa"

type ToastType = "success" | "error" | "info"

type Toast = {
    id: number
    title?: string
    message: string
    type: ToastType
    duration?: number
}

type ToastContextType = {
    showToast: (message: string, type?: ToastType, duration?: number, title?: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

const TOAST_MAX = 4
const FADE_OUT_MS = 220

const toastVariantClassNames: Record<ToastType, string> = {
    success:
        "border-emerald-200 bg-emerald-50/92 text-emerald-950 dark:border-emerald-500/30 dark:bg-emerald-950/25 dark:text-emerald-100",
    error: "border-red-200 bg-red-50/92 text-red-950 dark:border-red-500/30 dark:bg-red-950/25 dark:text-red-100",
    info: "border-sky-200 bg-sky-50/92 text-sky-950 dark:border-sky-500/30 dark:bg-sky-950/25 dark:text-sky-100",
}

const toastIcons = {
    success: <FaCheckCircle className="h-4 w-4" />,
    error: <FaExclamationCircle className="h-4 w-4" />,
    info: <FaInfoCircle className="h-4 w-4" />,
} satisfies Record<ToastType, ReactNode>

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([])
    const [exitingIds, setExitingIds] = useState<number[]>([])

    const showToast = (
        message: string,
        type: ToastType = "info",
        duration = 3000,
        title?: string
    ) => {
        setToasts((previous) => {
            const next = [
                ...previous,
                { id: Date.now() + Math.random(), title, message, type, duration },
            ]
            return next.slice(-TOAST_MAX)
        })
    }

    const removeToast = (id: number) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id))
        setExitingIds((prev) => prev.filter((existing) => existing !== id))
    }

    const dismissToast = useCallback((id: number) => {
        setExitingIds((prev) => {
            if (prev.includes(id)) return prev
            window.setTimeout(() => removeToast(id), FADE_OUT_MS)
            return [...prev, id]
        })
    }, [])

    useEffect(() => {
        if (toasts.length === 0) return

        const timers = toasts.map((toast) => {
            return window.setTimeout(() => {
                dismissToast(toast.id)
            }, toast.duration ?? 3000)
        })

        return () => {
            timers.forEach((timer) => window.clearTimeout(timer))
        }
    }, [toasts, dismissToast])

    const value = useMemo(() => ({ showToast }), [])

    return (
        <ToastContext.Provider value={value}>
            {children}
            <div className="fixed right-4 top-4 z-50 flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-3">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        role="status"
                        aria-live="polite"
                        className={`flex items-start justify-between gap-3 rounded-[1.2rem] border px-4 py-3 text-sm shadow-[0_18px_40px_rgba(15,23,42,0.14)] backdrop-blur-xl transition-all duration-200 ${
                            exitingIds.includes(toast.id)
                                ? "-translate-y-2 opacity-0"
                                : "translate-y-0 opacity-100"
                        } ${toastVariantClassNames[toast.type]}`}
                    >
                        <div className="flex min-w-0 grow items-start gap-3">
                            <div className="mt-0.5 shrink-0">{toastIcons[toast.type]}</div>
                            <div className="min-w-0 grow">
                                {toast.title ? (
                                    <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-current/75">
                                        {toast.title}
                                    </div>
                                ) : null}
                                <div className="text-sm leading-6 text-current">{toast.message}</div>
                            </div>
                        </div>
                        <button
                            onClick={() => dismissToast(toast.id)}
                            className="rounded-lg p-2 text-current/80 transition hover:bg-black/5 hover:text-current dark:hover:bg-white/10"
                            aria-label="Dismiss toast"
                        >
                            <FaTimes className="h-3.5 w-3.5" />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    )
}

export const useToast = () => {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error("useToast must be used within ToastProvider")
    }
    return context
}
