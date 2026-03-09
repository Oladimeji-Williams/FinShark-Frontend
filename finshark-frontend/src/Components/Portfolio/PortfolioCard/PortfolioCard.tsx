import React from "react"
import type { SubmitEvent } from "react"
import DeletePortfolio from "../DeletePortfolio/DeletePortfolio"
import { Link } from "react-router-dom"

type Props = {
    portfolioValue: string
    onPortfolioDelete: (event: SubmitEvent<HTMLFormElement>) => void
}

const PortfolioCard = (props: Props) => {
    return (
        <div className="flex flex-col w-full p-8 space-y-4 text-center rounded-lg shadow-lg md:w-1/3 bg-white dark:bg-gray-800 transition-colors">
            <Link
                to={`/company/${props.portfolioValue}/company-profile`}
                className="pt-6 text-xl font-bold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-lightGreen"
            >
                {props.portfolioValue}
            </Link>
            <DeletePortfolio
                onPortfolioValue={props.portfolioValue}
                onPortfolioDelete={props.onPortfolioDelete}
            />
        </div>
    )
}

export default PortfolioCard
