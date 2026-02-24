import React from 'react'
import './Card.css'

type Props = {
    CompanyName: string,
    Ticker: string,
    Price: number
};

const Card = (props: Props) => {
  return (
    <div className='card'>
        <img src="null" alt="Image" />
        <div className='details'>
            <h2>{props.CompanyName} ({props.Ticker})</h2>
            <p>${props.Price}</p>
            <p className='info'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi, voluptates?</p>
        </div>
    </div>
  )
}

export default Card