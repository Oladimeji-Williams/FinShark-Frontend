import { IconType } from "react-icons"

type Props = {
    title: string
    subtitle: string
    icon?: IconType
}

const Tile = ({ title, subtitle, icon: Icon }: Props) => {
    return (
        <div className="group relative overflow-hidden rounded-[1.75rem] border border-subtle bg-surface-soft p-5 shadow-soft backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(15,23,42,0.12)]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(45,212,191,0.16),transparent_28%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted">
                        {title}
                    </p>
                    <p className="mt-4 text-2xl font-semibold tracking-tight text-strong sm:text-[1.7rem]">
                        {subtitle}
                    </p>
                </div>
                {Icon ? (
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-surface text-muted transition-colors group-hover:bg-[var(--color-light-green)] group-hover:text-strong">
                        <Icon className="h-5 w-5" />
                    </span>
                ) : null}
            </div>
            <div className="relative mt-6 h-px bg-surface border-subtle" />
            <p className="relative mt-4 text-sm leading-6 text-muted">
                Snapshot metric for the current company overview.
            </p>
        </div>
    )
}

export default Tile
