import React from 'react'
import type { SubmitEvent } from 'react'

type Props = {
    onPortfolioDelete: (event: SubmitEvent<HTMLFormElement>) => void;
    onPortfolioValue: string;
}

const DeletePortfolio = (props: Props) => {
  return (
    <div>
        <form onSubmit={props.onPortfolioDelete}>
            <input name="symbol" readOnly={true} hidden={true} value={props.onPortfolioValue} />
            <button type="submit">x</button>
        </form>
    </div>
  )
}

export default DeletePortfolio
