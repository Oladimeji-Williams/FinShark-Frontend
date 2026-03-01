import React from 'react'
import type { SubmitEvent } from 'react'
import DeletePortfolio from '../DeletePortfolio/DeletePortfolio';

type Props = {
    portfolioValue: string;
    onPortfolioDelete: (event: SubmitEvent<HTMLFormElement>) => void;
}

const PortfolioCard = (props: Props) => {
  return (
    <div>
      <div>{props.portfolioValue}</div>
      <DeletePortfolio onPortfolioDelete={props.onPortfolioDelete} onPortfolioValue={props.portfolioValue} />
    </div>
  )
}

export default PortfolioCard