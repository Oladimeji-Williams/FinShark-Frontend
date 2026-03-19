"use client"

import { FC, JSX } from "react"
import type { ChangeEvent, SubmitEvent } from "react"
import { FaArrowRight, FaSearch, FaTimes } from "react-icons/fa"

type Props = {
    search: string
    handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void
    onSearchSubmit: (event: SubmitEvent<HTMLFormElement>) => void
    onSearchReset: () => void
    hasSearched: boolean
    isLoading: boolean
    lastQuery: string
    resultCount: number
}

const Search: FC<Props> = ({
    search,
    handleSearchChange,
    onSearchSubmit,
    onSearchReset,
    hasSearched,
    isLoading,
    lastQuery,
    resultCount,
}: Props): JSX.Element => {
    return (
        <section className="overflow-hidden rounded-[2rem] border border-subtle bg-surface shadow-soft backdrop-blur-xl">
            <div className="border-b border-subtle px-6 py-6 sm:px-7">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--muted-foreground)]">
                    Search Workspace
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--text-strong)]">
                    Find a company in seconds
                </h2>
                <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
                    Search by ticker, company name, or exchange keywords and jump straight into the
                    company dashboard.
                </p>
            </div>
            <div className="space-y-5 px-6 py-6 sm:px-7">
                <form className="space-y-4" onSubmit={onSearchSubmit}>
                    <label
                        htmlFor="search-input"
                        className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted"
                    >
                        Company Search
                    </label>
                    <div className="flex flex-col gap-3 lg:flex-row">
                        <div className="relative flex-1">
                            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-muted">
                                <FaSearch className="h-4 w-4" />
                            </span>
                            <input
                                id="search-input"
                                type="text"
                                enterKeyHint="search"
                                placeholder="Try Microsoft, MSFT, Apple, NASDAQ..."
                                value={search}
                                onChange={handleSearchChange}
                                className="h-14 w-full rounded-2xl border border-subtle bg-surface-soft pl-11 pr-12 text-sm text-[var(--text-strong)] outline-none transition-all placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:bg-surface focus:ring-4 focus:ring-[var(--primary)]/20"
                            />
                            {search ? (
                                <button
                                    type="button"
                                    onClick={onSearchReset}
                                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-muted transition hover:text-strong"
                                    aria-label="Clear search"
                                >
                                    <FaTimes className="h-4 w-4" />
                                </button>
                            ) : null}
                        </div>
                        <button
                            type="submit"
                            disabled={!search.trim() || isLoading}
                            className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-[var(--primary)] px-6 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-55"
                        >
                            {isLoading ? "Searching..." : "Search company"}
                            <FaArrowRight className="h-3.5 w-3.5" />
                        </button>
                    </div>
                </form>

                <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-[1.35rem] border border-subtle bg-surface-soft p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
                            Status
                        </p>
                        <p className="mt-2 text-sm font-semibold text-strong">
                            {isLoading
                                ? "Refreshing matches..."
                                : hasSearched
                                  ? "Results ready"
                                  : "Waiting for your search"}
                        </p>
                    </div>
                    <div className="rounded-[1.35rem] border border-subtle bg-surface-soft p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
                            Query
                        </p>
                        <p className="mt-2 truncate text-sm font-semibold text-strong">
                            {lastQuery || "No active query"}
                        </p>
                    </div>
                    <div className="rounded-[1.35rem] border border-subtle bg-surface-soft p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
                            Matches
                        </p>
                        <p className="mt-2 text-sm font-semibold text-strong">
                            {hasSearched ? resultCount : 0}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Search
