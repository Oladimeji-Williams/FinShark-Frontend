import { useEffect, useState } from "react"
import { getComparisonData } from "../../../api"
import type { CompanyComparisonData } from "@/company"
import ComparisonFinderItem from "./ComparisonFinderItem/ComparisonFinderItem"

type Props = {
    ticker: string
}

const ComparisonFinder = ({ ticker }: Props) => {
    const [comparisonData, setComparisonData] = useState<CompanyComparisonData | null>(null)
    const [serverError, setServerError] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchComparisonData = async () => {
            setLoading(true)
            const response = await getComparisonData(ticker)

            if (typeof response === "string") {
                setServerError(response)
                setComparisonData(null)
                setLoading(false)
                return
            }

            setServerError("")
            setComparisonData(response)
            setLoading(false)
        }

        void fetchComparisonData()
    }, [ticker])

    if (serverError) return <p>{serverError}</p>
    if (loading) return <p className="m-4 text-sm text-gray-500">Loading comparison peers...</p>
    if (!comparisonData?.peersList?.length)
        return <p className="m-4 text-sm text-gray-500">No comparison peers available.</p>

    return (
        <div className="inline-flex rounded-md shadow-sm m-4">
            {comparisonData.peersList.map((peerTicker) => (
                <ComparisonFinderItem key={peerTicker} ticker={peerTicker} />
            ))}
        </div>
    )
}

export default ComparisonFinder
