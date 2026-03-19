import type { ReactNode } from "react"

type Variant = "error" | "info" | "success" | "warning"

type Props = {
    children: ReactNode
    title?: string
    variant?: Variant
    className?: string
}

const variantClassNames: Record<Variant, string> = {
    error: "border-red-200 bg-red-50/85 text-red-800 dark:border-red-500/30 dark:bg-red-950/20 dark:text-red-100",
    info: "border-sky-200 bg-sky-50/85 text-sky-800 dark:border-sky-500/30 dark:bg-sky-950/20 dark:text-sky-100",
    success:
        "border-emerald-200 bg-emerald-50/85 text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-950/20 dark:text-emerald-100",
    warning:
        "border-amber-200 bg-amber-50/85 text-amber-800 dark:border-amber-500/30 dark:bg-amber-950/20 dark:text-amber-100",
}

const InlineNotice = ({ children, title, variant = "info", className = "" }: Props) => {
    return (
        <div
            className={`rounded-[1.35rem] border px-4 py-3 text-sm leading-6 shadow-sm ${variantClassNames[variant]} ${className}`.trim()}
        >
            {title ? (
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-current/80">
                    {title}
                </p>
            ) : null}
            <div>{children}</div>
        </div>
    )
}

export default InlineNotice
