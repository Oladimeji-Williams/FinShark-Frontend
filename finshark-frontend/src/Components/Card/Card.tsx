import React, { JSX } from 'react'
import Image from 'next/image'
import './Card.css'
import { CompanySearch } from '@/company';

type Props = {
    id: string;
    searchResult: CompanySearch;
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
    </div>
  )
}

export default Card
