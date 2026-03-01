import React from 'react'

type Props = {
    portfolioValue: string;
}

const PortfolioCard = (props: Props) => {
  return (
    <div>
      <div>{props.portfolioValue}</div>
      <button>x</button>
    </div>
  )
}

export default PortfolioCard