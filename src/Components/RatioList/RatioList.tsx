import type { ReactNode } from "react"

export type RatioListConfig<T> = {
    label: ReactNode
    subtitle?: string
    render: (item: T) => ReactNode
}

type RatioListProps<T> = {
    config: RatioListConfig<T>[]
    data: T
}

const RatioList = <T,>({ config, data }: RatioListProps<T>) => {
    const renderedRows = config.map((row, index) => {
        return (
            <li
                key={index}
                className="rounded-xl border border-subtle/70 bg-gradient-to-br from-surface via-surface to-surface-soft px-3 py-3 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md"
            >
                <div className="min-h-[4.25rem]">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="min-w-0 max-w-[65%]">
                            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                                {row.subtitle ?? "Ratio"}
                            </div>
                            <div className="mt-1 text-sm font-semibold text-strong">
                                {row.label}
                            </div>
                        </div>
                        <div className="flex shrink-0 items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary">
                            {row.render(data)}
                        </div>
                    </div>
                </div>
            </li>
        )
    })

    return (
        <div className="overflow-hidden rounded-[1.9rem] border border-subtle bg-surface shadow-soft backdrop-blur-xl transition-colors">
            <div className="grid gap-2 p-2 sm:gap-3 sm:p-3">{renderedRows}</div>
        </div>
    )
}

export default RatioList
