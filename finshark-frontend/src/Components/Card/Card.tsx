import React, { JSX } from 'react'
import Image from 'next/image'
import './Card.css'
import { CompanySearch } from '@/company';
import type { SubmitEvent } from 'react';
import CreatePortfolio from '../Portfolio/CreatePortfolio/CreatePortfolio';

type Props = {
    id: string;
    searchResult: CompanySearch;
    onPortfolioCreate: (event: SubmitEvent<HTMLFormElement>) => void;
};

const Card: React.FC<Props> = (props: Props): JSX.Element => {
  return (
    <div className='card' id={props.id}>
        <Image src="/vercel.svg" alt="Company Logo" width={40} height={40} />
        <div className='details'>
            <h2>{props.searchResult.name} ({props.searchResult.symbol})</h2>
            <p>{props.searchResult.currency}</p>
        </div>
        <div className="info">
            {props.searchResult.exchangeShortName} - {props.searchResult.stockExchange}
        </div>
        <CreatePortfolio onPortfolioCreate={props.onPortfolioCreate} symbol={props.searchResult.symbol}/>
    </div>
  )
}

export default Card
