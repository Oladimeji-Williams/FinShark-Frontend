import { useEffect, useState } from "react"
import type { CompanyTenK } from "@/company"
import { getTenK } from "../../../api"
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

    if (serverError) return <p>{serverError}</p>
    if (loading) return <Spinner />
    if (!tenKData.length) return <p className="m-4 text-sm text-gray-500">No 10-K filings available.</p>

    return (
        <div className="inline-flex rounded-md shadow-sm m-4 flex-wrap gap-2">
            {tenKData.slice(0, 5).map((tenKItem) => (
                <TenKFinderItem key={tenKItem.fillingDate} tenK={tenKItem} />
            ))}
        </div>
    )
}

export default TenkFinder
