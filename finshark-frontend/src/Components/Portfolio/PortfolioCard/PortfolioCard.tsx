import React from 'react'
import type { SubmitEvent } from 'react'
import DeletePortfolio from '../DeletePortfolio/DeletePortfolio';

type Props = {
    portfolioValue: string;
    onPortfolioDelete: (event: SubmitEvent<HTMLFormElement>) => void;
}

const PortfolioCard = (props: Props) => {
  return (
    <div className="flex flex-col w-full p-8 space-y-4 text-center rounded-lg shadow-lg md:w-1/3">
        <p className="pt-6 text-xl font-bold">{props.portfolioValue}</p>
        <DeletePortfolio
        onPortfolioValue={props.portfolioValue}
        onPortfolioDelete={props.onPortfolioDelete}
        />
    </div>
  )
}

export default PortfolioCard