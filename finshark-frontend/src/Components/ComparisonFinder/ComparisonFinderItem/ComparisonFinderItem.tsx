import { Link } from "react-router-dom"

type Props = {
    ticker: string
}

const ComparisonFinderItem = (props: Props) => {
    return (
        <Link
            to={`/company/${props.ticker}/company-profile`}
            className="inline-flex items-center p-4 rounded-l-lg shadow-sm m-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            reloadDocument
            type="button"
        >
            {props.ticker}
        </Link>
    )
}

export default ComparisonFinderItem
