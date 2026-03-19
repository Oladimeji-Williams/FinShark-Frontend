import type { CompanySearch } from "@/company"
import type { SubmitEvent } from "react"
import CardList from "@/Components/CardList/CardList"
import CollapsiblePanel from "@/Components/Layout/CollapsiblePanel"

type Props = {
    companies: CompanySearch[]
    hasSearched: boolean
    isLoading: boolean
    lastQuery: string
    onPortfolioCreate: (event: SubmitEvent<HTMLFormElement>) => void
    portfolioValues: string[]
    serverError: string
}

const SearchResultsSection = ({
    companies,
    hasSearched,
    isLoading,
    lastQuery,
    onPortfolioCreate,
    portfolioValues,
    serverError,
}: Props) => {
    if (!hasSearched && !isLoading && !serverError) {
        return null
    }

    const resultCountLabel = `${companies.length} match${companies.length === 1 ? "" : "es"}`
    const canToggleWrap = !isLoading && !serverError && companies.length > 0

    return (
        <CollapsiblePanel
            badge={
                <span className="inline-flex items-center rounded-full bg-[var(--surface-soft)] px-4 py-2 text-sm font-semibold text-[var(--text-strong)]">
                    {isLoading ? "Searching..." : resultCountLabel}
                </span>
            }
            collapsible={canToggleWrap}
            collapseLabel="Wrap results"
            expandLabel="Unfold results"
            eyebrow="Result Set"
            resetKey={lastQuery}
            title={
                isLoading
                    ? "Searching companies"
                    : serverError
                      ? "We hit a search error"
                      : companies.length > 0
                        ? `${companies.length} compan${companies.length === 1 ? "y" : "ies"} found`
                        : "No companies matched"
            }
            description={
                isLoading
                    ? `Pulling the latest matches for "${lastQuery}".`
                    : serverError
                      ? "Try the search again in a moment or adjust the query."
                      : companies.length > 0
                        ? `Showing the latest matches for "${lastQuery}".`
                        : `No matches were found for "${lastQuery}". Try a shorter company name, a ticker symbol, or a different exchange keyword.`
            }
            collapsedContent={
                <div className="rounded-[1.4rem] border border-dashed border-subtle bg-surface-soft px-4 py-3 text-sm text-[var(--text-muted)]">
                    Result cards are wrapped. Press{" "}
                    <span className="font-semibold text-[var(--text-strong)]">Unfold results</span>{" "}
                    to expand the full set again.
                </div>
            }
        >
            {serverError ? (
                <div className="rounded-[1.6rem] border border-red-200 bg-red-50/80 p-5 text-red-700 dark:border-red-500/30 dark:bg-red-950/20 dark:text-red-200">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em]">
                        Search Error
                    </p>
                    <p className="mt-2 text-sm leading-6">{serverError}</p>
                </div>
            ) : isLoading ? (
                <div className="grid gap-4 lg:grid-cols-2">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-56 rounded-[1.9rem] border border-subtle bg-surface-soft animate-pulse"
                        />
                    ))}
                </div>
            ) : companies.length > 0 ? (
                <CardList
                    companies={companies}
                    onPortfolioCreate={onPortfolioCreate}
                    portfolioValues={portfolioValues}
                />
            ) : (
                <div className="rounded-[1.8rem] border border-dashed border-subtle bg-surface-soft p-8 text-center">
                    <p className="text-lg font-semibold text-strong">
                        No matches for &quot;{lastQuery}&quot;
                    </p>
                    <p className="mt-3 text-sm leading-6 text-muted">
                        Try a shorter company name, a ticker symbol, or a different exchange
                        keyword.
                    </p>
                </div>
            )}
        </CollapsiblePanel>
    )
}

export default SearchResultsSection
