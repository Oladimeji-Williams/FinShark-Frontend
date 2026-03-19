import { useEffect, useState } from "react"
import { getComparisonData } from "@/lib/fmpApi"
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

    if (serverError) {
        return (
            <p className="rounded-2xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-950/20 dark:text-red-200">
                {serverError}
            </p>
        )
    }

    if (loading) {
        return (
            <p className="rounded-2xl border border-subtle bg-surface-soft px-4 py-3 text-sm text-muted">
                Loading comparison peers...
            </p>
        )
    }

    if (!comparisonData?.peersList?.length) {
        return (
            <p className="rounded-2xl border border-subtle bg-surface-soft px-4 py-3 text-sm text-muted">
                No comparison peers available.
            </p>
        )
    }

    return (
        <div className="flex flex-wrap gap-3">
            {comparisonData.peersList.map((peerTicker) => (
                <ComparisonFinderItem key={peerTicker} ticker={peerTicker} />
            ))}
        </div>
    )
}

export default ComparisonFinder
