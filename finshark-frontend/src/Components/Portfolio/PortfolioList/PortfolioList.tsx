import React from 'react'
import PortfolioCard from '../PortfolioCard/PortfolioCard';
import type { SubmitEvent } from 'react'

type Props = {
    portfolioValues: string[];
    onPortfolioDelete: (event: SubmitEvent<HTMLFormElement>) => void;
}

const PortfolioList = (props: Props) => {
  return (
    <div>
        <h3>My Portfolio</h3>
        <ul>
            {props.portfolioValues.map((portfolioValue, index) => (
                <li key={`${portfolioValue}-${index}`}>
                    <PortfolioCard portfolioValue={portfolioValue} onPortfolioDelete={props.onPortfolioDelete} />
                </li>
            ))}
        </ul>
    </div>
  )
}

export default PortfolioList
