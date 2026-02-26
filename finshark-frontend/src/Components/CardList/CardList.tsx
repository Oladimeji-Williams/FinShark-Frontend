import React, { JSX } from 'react'
import Card from '../Card/Card'
import type { CompanySearch } from '@/company'

type Props = {
  companies: CompanySearch[]
}

const CardList: React.FC<Props> = (props: Props): JSX.Element => {
  if (props.companies.length === 0) {
    return <div>No results yet. Search for a company.</div>
  }

  return (
    <div>
      {props.companies.map((company) => (
        <Card
          key={company.symbol}
          CompanyName={company.name}
          Ticker={company.symbol}
          Price={0}
        />
      ))}
    </div>
  )
}

export default CardList
