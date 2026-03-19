import React from "react"
import type { SubmitEvent } from "react"
import { FaTrashAlt } from "react-icons/fa"

type Props = {
    onPortfolioDelete: (event: SubmitEvent<HTMLFormElement>) => void
    onPortfolioValue: string
}

const DeletePortfolio = (props: Props) => {
    return (
        <div className="shrink-0">
            <form onSubmit={props.onPortfolioDelete}>
                <input name="symbol" readOnly={true} hidden={true} value={props.onPortfolioValue} />
                <button
                    type="submit"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-red-200 bg-red-50 text-red-600 transition hover:-translate-y-0.5 hover:bg-red-100"
                    aria-label={`Remove ${props.onPortfolioValue} from portfolio`}
                >
                    <FaTrashAlt className="h-3.5 w-3.5" />
                </button>
            </form>
        </div>
    )
}

export default DeletePortfolio
