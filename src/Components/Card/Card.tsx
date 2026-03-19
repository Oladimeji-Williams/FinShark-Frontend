import React, { JSX } from "react"
import { CompanySearch } from "@/company"
import type { SubmitEvent } from "react"
import { FaArrowRight, FaChartLine, FaCoins, FaGlobeAmericas } from "react-icons/fa"
import CreatePortfolio from "../Portfolio/CreatePortfolio/CreatePortfolio"
import { Link } from "react-router-dom"

type Props = {
    id: string
    searchResult: CompanySearch
    onPortfolioCreate: (event: SubmitEvent<HTMLFormElement>) => void
    isSaved: boolean
}

const getInitials = (value: string) =>
    value
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? "")
        .join("")

const Card: React.FC<Props> = (props: Props): JSX.Element => {
    const { searchResult, id, onPortfolioCreate, isSaved } = props
    const exchangeLabel = [searchResult.exchangeShortName, searchResult.stockExchange]
        .filter(Boolean)
        .join(" • ")

    return (
        <div
            className="group relative overflow-hidden rounded-[1.9rem] border border-subtle bg-surface-soft p-6 shadow-soft backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(15,23,42,0.12)]"
            key={id}
            id={id}
        >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(45,212,191,0.16),transparent_28%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative flex h-full flex-col gap-6">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-start gap-4">
                        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.35rem] bg-surface text-sm font-semibold tracking-[0.18em] text-strong shadow-[0_16px_35px_rgba(15,23,42,0.18)]">
                            {getInitials(searchResult.name || searchResult.symbol)}
                        </span>
                        <div className="min-w-0">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted">
                                Search Match
                            </p>
                            <Link
                                to={`/company/${searchResult.symbol}/company-profile`}
                                className="mt-2 block text-xl font-semibold tracking-tight text-strong transition-colors hover:text-[var(--color-dark-blue)]"
                            >
                                {searchResult.name}
                            </Link>
                            <p className="mt-2 inline-flex items-center rounded-full bg-surface px-3 py-1 text-xs font-semibold tracking-[0.18em] text-muted uppercase">
                                {searchResult.symbol}
                            </p>
                        </div>
                    </div>

                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-emerald-700 uppercase dark:bg-emerald-500/20 dark:text-emerald-200">
                        {searchResult.currency || "N/A"}
                    </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[1.25rem] border border-subtle bg-surface p-4">
                        <div className="flex items-center gap-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-surface text-muted shadow-sm">
                                <FaChartLine className="h-4 w-4" />
                            </span>
                            <div className="min-w-0">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
                                    Exchange
                                </p>
                                <p className="mt-1 text-sm font-semibold text-strong">
                                    {exchangeLabel || "N/A"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[1.25rem] border border-subtle bg-surface p-4">
                        <div className="flex items-center gap-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-surface text-muted shadow-sm">
                                <FaGlobeAmericas className="h-4 w-4" />
                            </span>
                            <div className="min-w-0">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
                                    Market
                                </p>
                                <p className="mt-1 text-sm font-semibold text-strong">
                                    {searchResult.stockExchange || "N/A"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-auto flex flex-wrap items-center gap-3">
                    <Link
                        to={`/company/${searchResult.symbol}/company-profile`}
                        className="inline-flex items-center gap-2 rounded-2xl bg-[var(--primary)] px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[var(--primary-hover)]"
                    >
                        Open company
                        <FaArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <CreatePortfolio
                        onPortfolioCreate={onPortfolioCreate}
                        symbol={searchResult.symbol}
                        isSaved={isSaved}
                    />
                    <span className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-zinc-400">
                        <FaCoins className="h-3.5 w-3.5" />
                        {isSaved
                            ? "Already in your saved list"
                            : "Ready to save for later comparison"}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Card
