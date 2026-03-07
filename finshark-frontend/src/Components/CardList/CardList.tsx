import React, { JSX } from "react"
import Card from "../Card/Card"
import type { CompanySearch } from "@/company"
import type { SubmitEvent } from "react"

type Props = {
    companies: CompanySearch[]
    onPortfolioCreate: (event: SubmitEvent<HTMLFormElement>) => void
}

const CardList: React.FC<Props> = (props: Props): JSX.Element => {
    if (props.companies.length === 0) {
        return <p className="mb-3 mt-3 text-xl font-semibold text-center md:text-xl">No results!</p>
    }

    return (
        <div>
            {props.companies.map((company) => (
                <Card
                    id={company.symbol}
                    key={company.symbol}
                    searchResult={company}
                    onPortfolioCreate={props.onPortfolioCreate}
                />
            ))}
        </div>
    )
}

export default CardList
