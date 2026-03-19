import type { ReactNode } from "react"
import { useState } from "react"
import { FaChevronDown, FaChevronUp } from "react-icons/fa"

type Props = {
    badge?: ReactNode
    children: ReactNode
    className?: string
    collapsedContent?: ReactNode
    collapsible?: boolean
    collapseLabel?: string
    defaultCollapsed?: boolean
    description?: ReactNode
    expandLabel?: string
    eyebrow?: ReactNode
    headerClassName?: string
    id?: string
    resetKey?: string
    title: ReactNode
    bodyClassName?: string
}

const CollapsiblePanel = ({
    badge,
    children,
    className = "",
    collapsedContent,
    collapsible = true,
    collapseLabel = "Wrap section",
    defaultCollapsed = false,
    description,
    expandLabel = "Unfold section",
    eyebrow,
    headerClassName = "",
    id,
    resetKey = "",
    title,
    bodyClassName = "px-6 py-6 sm:px-8",
}: Props) => {
    const [collapseState, setCollapseState] = useState({
        key: resetKey,
        value: defaultCollapsed,
    })

    const isCollapsed = collapseState.key === resetKey ? collapseState.value : defaultCollapsed
    const shellClassName =
        "overflow-hidden rounded-[2rem] border border-subtle bg-surface shadow-soft backdrop-blur-xl"
    const resolvedHeaderClassName =
        `flex flex-col gap-4 border-b border-subtle px-6 py-6 sm:flex-row sm:items-end sm:justify-between ${headerClassName}`.trim()

    return (
        <section id={id} className={`${shellClassName} ${className}`.trim()}>
            <div className={resolvedHeaderClassName}>
                <div>
                    {eyebrow ? (
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted">
                            {eyebrow}
                        </p>
                    ) : null}
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-strong">
                        {title}
                    </h2>
                    {description ? (
                        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">{description}</p>
                    ) : null}
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    {badge}
                    {collapsible ? (
                        <button
                            type="button"
                            onClick={() =>
                                setCollapseState((current) => {
                                    const currentValue =
                                        current.key === resetKey ? current.value : defaultCollapsed

                                    return {
                                        key: resetKey,
                                        value: !currentValue,
                                    }
                                })
                            }
                            aria-expanded={!isCollapsed}
                            className="inline-flex items-center gap-2 rounded-full border border-subtle bg-surface px-4 py-2 text-sm font-semibold text-strong transition hover:-translate-y-0.5 hover:bg-surface-soft"
                        >
                            {isCollapsed ? expandLabel : collapseLabel}
                            {isCollapsed ? (
                                <FaChevronDown className="h-3.5 w-3.5" />
                            ) : (
                                <FaChevronUp className="h-3.5 w-3.5" />
                            )}
                        </button>
                    ) : null}
                </div>
            </div>

            {!isCollapsed ? <div className={bodyClassName}>{children}</div> : null}

            {isCollapsed ? (
                <div className="px-6 py-4 sm:px-8">
                    {collapsedContent ?? (
                        <div className="rounded-[1.4rem] border border-dashed border-subtle bg-surface-soft px-4 py-3 text-sm text-muted">
                            This section is wrapped. Press{" "}
                            <span className="font-semibold">{expandLabel}</span> to expand it again.
                        </div>
                    )}
                </div>
            ) : null}
        </section>
    )
}

export default CollapsiblePanel
