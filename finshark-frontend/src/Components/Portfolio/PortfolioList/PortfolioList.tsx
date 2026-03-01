import React from 'react'
import PortfolioCard from '../PortfolioCard/PortfolioCard';

type Props = {
    portfolioValues: string[];
}

const PortfolioList = (props: Props) => {
  return (
    <div>
        <h3>My Portfolio</h3>
        <ul>
            {props.portfolioValues.map((portfolioValue, index) => (
                <li key={`${portfolioValue}-${index}`}>
                    <PortfolioCard portfolioValue={portfolioValue} />
                </li>
            ))}
        </ul>
    </div>
  )
}

export default PortfolioList
