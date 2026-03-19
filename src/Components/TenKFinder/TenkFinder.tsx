import { useEffect, useState } from "react"
import type { CompanyTenK } from "@/company"
import InlineNotice from "@/Components/Feedback/InlineNotice"
import { getTenK } from "@/lib/fmpApi"
import Spinner from "../Spinner/Spinner"
import TenKFinderItem from "./TenKFinderItem/TenKFinderItem"

type Props = {
    ticker: string
}

const TenkFinder = ({ ticker }: Props) => {
    const [tenKData, setTenKData] = useState<CompanyTenK[]>([])
    const [serverError, setServerError] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchTenKData = async () => {
            setLoading(true)
            const response = await getTenK(ticker)

            if (typeof response === "string") {
                setServerError(response)
                setTenKData([])
                setLoading(false)
                return
            }

            setServerError("")
            setTenKData(response)
            setLoading(false)
        }

        void fetchTenKData()
    }, [ticker])

    if (serverError) {
        return (
            <InlineNotice variant="error" title="10-K Lookup Error" className="m-4">
                {serverError}
            </InlineNotice>
        )
    }
    if (loading) return <Spinner />
    if (!tenKData.length)
        return (
            <InlineNotice variant="info" title="10-K Lookup" className="m-4">
                No 10-K filings available.
            </InlineNotice>
        )

    return (
        <div className="m-4 flex flex-wrap gap-2">
            {tenKData.slice(0, 5).map((tenKItem) => (
                <TenKFinderItem key={tenKItem.fillingDate} tenK={tenKItem} />
            ))}
        </div>
    )
}

export default TenkFinder
