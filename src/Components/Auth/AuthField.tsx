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

const AuthField = ({
    label,
    icon: Icon,
    error,
    hint,
    endAdornment,
    ...inputProps
}: AuthFieldProps) => {
    return (
        <label className="block">
            <span className="mb-2 block text-sm font-semibold text-strong">
                {label}
            </span>

            <span className="relative block">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-muted">
                    <Icon className="h-4 w-4" />
                </span>

                <input
                    {...inputProps}
                    aria-invalid={Boolean(error)}
                    className={`input-base input-focus ${
                        error ? "input-error" : "input-default"
                    } ${inputProps.className ?? ""}`}
                />

                {endAdornment && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                        {endAdornment}
                    </span>
                )}
            </span>

            {error ? (
                <span className="mt-2 block text-sm font-medium text-[var(--danger)]">
                    {error}
                </span>
            ) : hint ? (
                <span className="mt-2 block text-sm text-muted">{hint}</span>
            ) : null}
        </label>
    )
}

export default AuthField