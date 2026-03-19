import React from "react"
import type { SubmitEvent } from "react"
import { FaArrowRight } from "react-icons/fa"
import DeletePortfolio from "../DeletePortfolio/DeletePortfolio"
import { Link } from "react-router-dom"

type Props = {
    portfolioValue: string
    onPortfolioDelete: (event: SubmitEvent<HTMLFormElement>) => void
}

const PortfolioCard = (props: Props) => {
    return (
        <div className="flex items-center justify-between gap-4 rounded-[1.5rem] border border-subtle bg-surface-soft p-5 shadow-sm">
            <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
                    Saved Symbol
                </p>
                <Link
                    to={`/company/${props.portfolioValue}/company-profile`}
                    className="mt-2 inline-flex items-center gap-2 text-lg font-semibold tracking-tight text-strong transition-colors hover:text-[var(--color-dark-blue)]"
                >
                    {props.portfolioValue}
                    <FaArrowRight className="h-3.5 w-3.5" />
                </Link>
            </div>
            <DeletePortfolio
                onPortfolioValue={props.portfolioValue}
                onPortfolioDelete={props.onPortfolioDelete}
            />
        </div>
    )
}

export default PortfolioCard
