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
            className="inline-flex items-center p-4 text-md text-white bg-lightGreen rounded-md"
            reloadDocument
        >
            10-K - {props.tenK.symbol} - {filingYear}
        </Link>
    )
}

export default TenKFinderItem
