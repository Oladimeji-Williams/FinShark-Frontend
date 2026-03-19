import { Link } from "react-router-dom"

type Props = {
    ticker: string
}

const ComparisonFinderItem = ({ ticker }: Props) => {
    return (
        <Link
            to={`/company/${ticker}/company-profile`}
            className="inline-flex items-center rounded-xl bg-transparent px-4 py-2.5 text-sm font-semibold tracking-[0.16em] text-slate-700 uppercase transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-200 hover:text-slate-950 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-white"
        >
            {ticker}
        </Link>
    )
}

export default ComparisonFinderItem
