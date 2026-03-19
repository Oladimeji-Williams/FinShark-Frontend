import { ReactNode } from "react"
import { Outlet } from "react-router-dom"
import CollapsiblePanel from "@/Components/Layout/CollapsiblePanel"

type Props = {
    children: ReactNode
    ticker: string
}

const CompanyDashboard = ({ children, ticker }: Props) => {
    return (
        <div className="relative w-full">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-80 rounded-[2.5rem] bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.18),transparent_34%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.9),rgba(255,255,255,0))] dark:bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.12),transparent_34%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.14),transparent_30%),linear-gradient(180deg,rgba(2,6,23,0.88),rgba(2,6,23,0))]" />
            <div className="relative space-y-8">{children}</div>
            <CollapsiblePanel
                badge={
                    <span className="inline-flex items-center rounded-full bg-surface px-4 py-2 text-sm font-semibold tracking-[0.24em] text-strong uppercase border border-subtle">
                        {ticker}
                    </span>
                }
                className="relative mt-8"
                collapseLabel="Wrap statements"
                expandLabel="Unfold statements"
                eyebrow={
                    <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-primary">
                        Deep Dive
                    </span>
                }
                title="Financial Statements & Ratios"
                description="Move through core company metrics, income statement, balance sheet, and cashflow views without leaving the broader research context."
                bodyClassName="px-4 py-5 sm:px-6 lg:px-8"
            >
                <Outlet context={ticker} />
            </CollapsiblePanel>
        </div>
    )
}

export default CompanyDashboard
