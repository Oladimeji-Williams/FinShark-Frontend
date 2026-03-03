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
            <button className="block w-full py-3 text-white duration-200 border-2 rounded-lg bg-red-500 hover:text-red-500 hover:bg-white border-red-500">x</button>
        </form>
    </div>
  )
}

export default DeletePortfolio
