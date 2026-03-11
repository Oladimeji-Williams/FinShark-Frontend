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
            className="inline-flex items-center p-4 text-md text-white dark:text-gray-900 bg-lightGreen dark:bg-lightGreen/90 rounded-md hover:bg-green-600 dark:hover:bg-lightGreen transition-colors"
            reloadDocument
        >
            10-K - {props.tenK.symbol} - {filingYear}
        </Link>
    )
}

export default TenKFinderItem
