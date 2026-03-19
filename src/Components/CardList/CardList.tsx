import React, { JSX } from "react"
import Card from "../Card/Card"
import type { CompanySearch } from "@/company"
import type { SubmitEvent } from "react"

type Props = {
    companies: CompanySearch[]
    onPortfolioCreate: (event: SubmitEvent<HTMLFormElement>) => void
    portfolioValues: string[]
}

const CardList: React.FC<Props> = (props: Props): JSX.Element => {
    return (
        <div className="grid gap-4 lg:grid-cols-2">
            {props.companies.map((company) => (
                <Card
                    id={company.symbol}
                    key={company.symbol}
                    searchResult={company}
                    onPortfolioCreate={props.onPortfolioCreate}
                    isSaved={props.portfolioValues.includes(company.symbol)}
                />
            ))}
        </div>
    )
}

export default CardList
