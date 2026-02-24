import React from 'react'
import Card from '../Card/Card'

type Props = {}

const CardList = (props: Props) => {
  return (
    <div>
        <Card CompanyName='Apple' Ticker='AAPL' Price={110.0}/>
        <Card CompanyName='Microsoft' Ticker='MSFT' Price={125.2}/>
        <Card CompanyName='Tesla' Ticker='TSLA' Price={131.3}/>
        <Card CompanyName='Google' Ticker='GOOGL' Price={125.2}/>
    </div>
  )
}

export default CardList