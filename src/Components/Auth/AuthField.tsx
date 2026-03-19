"use client"

import { InputHTMLAttributes, ReactNode } from "react"
import { IconType } from "react-icons"

type AuthFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string
    icon: IconType
    error?: string
    hint?: string
    endAdornment?: ReactNode
}

const AuthField = ({ label, icon: Icon, error, hint, endAdornment, ...inputProps }: AuthFieldProps) => {
    const inputClassName = error
        ? "border-red-300 bg-red-50/70 pr-12 text-red-950 placeholder:text-red-400 focus:border-red-400 focus:ring-red-200 dark:border-red-500/60 dark:bg-red-950/20 dark:text-red-50 dark:placeholder:text-red-300/60 dark:focus:ring-red-500/20"
        : "border-slate-200 bg-white/80 text-slate-950 placeholder:text-slate-400 focus:border-slate-300 focus:ring-slate-200 dark:border-zinc-700 dark:bg-zinc-950/70 dark:text-white dark:placeholder:text-zinc-500 dark:focus:ring-zinc-700"

    return (
        <label className="block">
            <span className="mb-2 block text-sm font-semibold tracking-[0.02em] text-slate-800 dark:text-zinc-100">
                {label}
            </span>
            <span className="relative block">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 dark:text-zinc-500">
                    <Icon className="h-4 w-4" />
                </span>
                <input
                    {...inputProps}
                    aria-invalid={Boolean(error)}
                    className={`w-full rounded-2xl border py-3.5 pl-11 pr-4 text-sm shadow-sm outline-none ring-4 ring-transparent transition focus:ring-inset ${inputClassName} ${inputProps.className ?? ""}`}
                />
                {endAdornment ? (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                        {endAdornment}
                    </span>
                ) : null}
            </span>
            {error ? (
                <span className="mt-2 block text-sm font-medium text-red-600 dark:text-red-300">
                    {error}
                </span>
            ) : hint ? (
                <span className="mt-2 block text-sm text-slate-500 dark:text-zinc-400">{hint}</span>
            ) : null}
        </label>
    )
}

export default AuthField
