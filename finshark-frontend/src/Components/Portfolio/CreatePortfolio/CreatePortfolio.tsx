import React from "react"
import type { SubmitEvent } from "react"

type Props = {
    onPortfolioCreate: (event: SubmitEvent<HTMLFormElement>) => void
    symbol: string
}

const CreatePortfolio = (props: Props) => {
    return (
        <div className="flex flex-col items-center justify-end flex-1 space-x-4 space-y-2 md:flex-row md:space-y-0">
            <form onSubmit={props.onPortfolioCreate}>
                <input name="symbol" readOnly={true} hidden={true} value={props.symbol} />
                <button
                    type="submit"
                    className="p-2 px-8 text-white bg-[var(--color-dark-blue)] rounded-lg hover:opacity-70 focus:outline-none"
                >
                    Add
                </button>
            </form>
        </div>
    )
}

export default CreatePortfolio
