import React from 'react'
import type { SubmitEvent } from 'react'

type Props = {
    onPortfolioCreate: (event: SubmitEvent<HTMLFormElement>) => void,
    symbol: string;
}

const CreatePortfolio = (props: Props) => {
  return (
    <div>
        <form onSubmit={props.onPortfolioCreate}>
            <input readOnly={true} hidden={true} value={props.symbol} />
            <button type="submit">Add</button>
        </form>
    </div>
  )
}

export default CreatePortfolio