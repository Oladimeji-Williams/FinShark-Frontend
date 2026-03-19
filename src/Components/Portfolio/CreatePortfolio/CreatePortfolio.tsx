import React from "react"
import type { SubmitEvent } from "react"
import { FaCheck, FaPlus } from "react-icons/fa"

type Props = {
    onPortfolioCreate: (event: SubmitEvent<HTMLFormElement>) => void
    symbol: string
    isSaved?: boolean
}

const CreatePortfolio = (props: Props) => {
    return (
        <div className="flex flex-col items-center justify-end space-y-2 md:flex-row md:space-y-0">
            <form onSubmit={props.onPortfolioCreate}>
                <input name="symbol" readOnly={true} hidden={true} value={props.symbol} />
                <button
                    type="submit"
                    disabled={props.isSaved}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-subtle bg-surface px-4 py-3 text-sm font-semibold text-strong transition hover:-translate-y-0.5 hover:border-subtle hover:bg-surface-soft disabled:cursor-not-allowed disabled:border-emerald-200 disabled:bg-emerald-50 disabled:text-emerald-700"
                >
                    {props.isSaved ? (
                        <>
                            <FaCheck className="h-3.5 w-3.5" />
                            Saved
                        </>
                    ) : (
                        <>
                            <FaPlus className="h-3.5 w-3.5" />
                            Add to portfolio
                        </>
                    )}
                </button>
            </form>
        </div>
    )
}

export default CreatePortfolio
