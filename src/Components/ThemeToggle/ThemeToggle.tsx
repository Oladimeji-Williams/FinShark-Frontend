"use client"

import { useTheme } from "next-themes"
import { useSyncExternalStore } from "react"
import { FaSun, FaMoon } from "react-icons/fa"

const emptySubscribe = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const mounted = useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot)

    if (!mounted) return null

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-subtle bg-surface text-strong shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-surface-soft"
            aria-label="Toggle theme"
        >
            {theme === "dark" ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
        </button>
    )
}
