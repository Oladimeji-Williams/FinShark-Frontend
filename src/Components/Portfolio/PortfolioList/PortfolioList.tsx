import React from "react"
import CollapsiblePanel from "@/Components/Layout/CollapsiblePanel"
import PortfolioCard from "../PortfolioCard/PortfolioCard"
import type { SubmitEvent } from "react"

type Props = {
    portfolioValues: string[]
    onPortfolioDelete: (event: SubmitEvent<HTMLFormElement>) => void
}

const PortfolioList = (props: Props) => {
    if (props.portfolioValues.length === 0) {
        return null
    }

    return (
        <CollapsiblePanel
            id="portfolio"
            badge={
                <span className="inline-flex items-center rounded-full bg-surface px-4 py-2 text-sm font-semibold text-muted">
                    {props.portfolioValues.length} saved
                </span>
            }
            collapseLabel="Wrap watchlist"
            expandLabel="Unfold watchlist"
            eyebrow="Watchlist"
            title="Saved Watchlist"
            description="Keep a lightweight comparison list while you explore companies."
        >
            <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
                {props.portfolioValues.map((portfolioValue, index) => (
                    <PortfolioCard
                        key={`${portfolioValue}-${index}`}
                        portfolioValue={portfolioValue}
                        onPortfolioDelete={props.onPortfolioDelete}
                    />
                ))}
            </div>
        </CollapsiblePanel>
    )
}

export default PortfolioList
