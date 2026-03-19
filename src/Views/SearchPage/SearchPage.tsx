"use client"

import type { CompanySearch } from "@/company"
import { useCallback, useEffect, useRef, useState } from "react"
import { searchCompanies } from "@/lib/fmpApi"
import type { ChangeEvent, SubmitEvent } from "react"
import { FaChartLine, FaFolderOpen, FaSearchDollar } from "react-icons/fa"
import PageContainer from "@/Components/Layout/PageContainer"
import PortfolioList from "@/Components/Portfolio/PortfolioList/PortfolioList"
import Search from "@/Components/Search/Search"
import SearchResultsSection from "@/Components/Search/SearchResultsSection"

const SearchPage = () => {
    const [search, setSearch] = useState<string>("")
    const [companies, setCompanies] = useState<CompanySearch[]>([])
    const [serverError, setServerError] = useState<string>("")
    const [portfolioValues, setPortfolioValues] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [hasSearched, setHasSearched] = useState(false)
    const [lastQuery, setLastQuery] = useState("")
    const requestSequence = useRef(0)

    const runSearch = useCallback(async (query: string) => {
        const requestId = ++requestSequence.current
        setHasSearched(true)
        setIsLoading(true)
        setLastQuery(query)

        const result = await searchCompanies(query)

        if (requestId !== requestSequence.current) {
            return
        }

        if (typeof result === "string") {
            setServerError(result)
            setCompanies([])
        } else {
            setServerError("")
            setCompanies(result)
        }

        setIsLoading(false)
    }, [])

    const resetSearch = useCallback(() => {
        requestSequence.current += 1
        setSearch("")
        setCompanies([])
        setServerError("")
        setHasSearched(false)
        setIsLoading(false)
        setLastQuery("")
    }, [])

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const nextValue = event.target.value
        setSearch(nextValue)
        if (!nextValue.trim()) {
            resetSearch()
        }
    }

    const onSearchSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        const query = search.trim()
        if (!query) {
            resetSearch()
            return
        }
        await runSearch(query)
    }

    const onPortfolioCreate = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const symbol = formData.get("symbol") as string | null
        if (!symbol) return
        if (portfolioValues.some((value) => value === symbol)) return
        setPortfolioValues((prev) => [...prev, symbol])
    }

    const onPortfolioDelete = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const symbol = formData.get("symbol") as string | null
        if (!symbol) return
        setPortfolioValues((prev) => prev.filter((value) => value !== symbol))
    }

    useEffect(() => {
        const query = search.trim()
        if (!query) return

        const debounce = setTimeout(() => {
            void runSearch(query)
        }, 300)

        return () => clearTimeout(debounce)
    }, [search, runSearch])

    return (
        <PageContainer className="space-y-8 pb-16">
            <section className="relative overflow-hidden rounded-[2.5rem] border border-subtle bg-surface p-6 shadow-soft backdrop-blur-xl">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.14),transparent_28%)]" />
                <div className="relative grid gap-8 p-6 sm:p-8 xl:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.95fr)]">
                    <div className="flex flex-col justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
                                Search Center
                            </p>
                            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-[var(--text-strong)] sm:text-5xl">
                                Research companies with a cleaner, faster workflow.
                            </h1>
                            <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--text-muted)] sm:text-base">
                                Move from a quick lookup to a full company dashboard without
                                breaking context. Search results, saved symbols, and company
                                drill-downs now live in one calmer workspace.
                            </p>
                        </div>

                        <div className="mt-8 grid gap-4 sm:grid-cols-3">
                            <div className="rounded-[1.5rem] border border-subtle bg-surface-soft p-5 shadow-sm">
                                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--surface)] text-[var(--foreground)]">
                                    <FaSearchDollar className="h-5 w-5" />
                                </span>
                                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--muted-foreground)]">
                                    Flexible Search
                                </p>
                                <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                                    Look up by ticker, company name, or exchange terms.
                                </p>
                            </div>
                            <div className="rounded-[1.5rem] border border-subtle bg-surface-soft p-5 shadow-sm">
                                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--surface)] text-[var(--foreground)]">
                                    <FaFolderOpen className="h-5 w-5" />
                                </span>
                                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--muted-foreground)]">
                                    Saved Symbols
                                </p>
                                <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                                    Keep a short watchlist close while you compare ideas.
                                </p>
                            </div>
                            <div className="rounded-[1.5rem] border border-subtle bg-surface-soft p-5 shadow-sm">
                                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--surface)] text-[var(--foreground)]">
                                    <FaChartLine className="h-5 w-5" />
                                </span>
                                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--muted-foreground)]">
                                    Faster Drill-Down
                                </p>
                                <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                                    Open a company page directly from each result card.
                                </p>
                            </div>
                        </div>
                    </div>

                    <Search
                        search={search}
                        handleSearchChange={handleSearchChange}
                        onSearchSubmit={onSearchSubmit}
                        onSearchReset={resetSearch}
                        hasSearched={hasSearched}
                        isLoading={isLoading}
                        lastQuery={lastQuery}
                        resultCount={companies.length}
                    />
                </div>
            </section>

            <PortfolioList
                portfolioValues={portfolioValues}
                onPortfolioDelete={onPortfolioDelete}
            />

            <SearchResultsSection
                companies={companies}
                hasSearched={hasSearched}
                isLoading={isLoading}
                lastQuery={lastQuery}
                onPortfolioCreate={onPortfolioCreate}
                portfolioValues={portfolioValues}
                serverError={serverError}
            />
        </PageContainer>
    )
}

export default SearchPage
