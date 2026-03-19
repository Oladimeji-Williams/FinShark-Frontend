import type { CompanyTenK } from "@/company"
import { Link } from "react-router-dom"

type Props = {
    tenK: CompanyTenK
}

const TenKFinderItem = (props: Props) => {
    const filingYear = new Date(props.tenK.fillingDate).getFullYear()
    return (
        <Link
            to={`/company/${props.tenK.symbol}/tenk/${props.tenK.fillingDate}`}
            className="inline-flex items-center rounded-2xl border border-emerald-200 bg-emerald-100 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-emerald-200 dark:border-emerald-500/20 dark:bg-emerald-500/15 dark:text-emerald-100 dark:hover:bg-emerald-500/25"
            reloadDocument
        >
            10-K - {props.tenK.symbol} - {filingYear}
        </Link>
    )
}

export default TenKFinderItem
