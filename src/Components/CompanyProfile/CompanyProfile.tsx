import { CompanyKeyMetrics } from "@/company"
import { useCallback, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { getKeyMetrics } from "@/lib/fmpClient"
import RatioList from "../RatioList/RatioList"
import { testCompanyKeyMetricsData } from "../Table/testData"
import { useProgressiveData } from "../../../hooks/UseProgressiveData"
import TableSkeleton from "../TableSkeleton/TableSkeleton"
import Spinner from "../Spinner/Spinner"
import { companyProfileRatioConfig } from "./CompanyProfile.ratioConfig"

const CompanyProfile = () => {
    const ticker = useOutletContext<string>()
    const [serverError, setServerError] = useState<string>("")
    const [fallbackNotice, setFallbackNotice] = useState<string>("")

    const keyMetricsLoader = useCallback(async () => {
        const data = await getKeyMetrics(ticker)

        if (typeof data === "string") {
            setServerError("")
            setFallbackNotice("Showing fallback data because live key metrics data is unavailable.")
            return [testCompanyKeyMetricsData as CompanyKeyMetrics]
        }

        if (!data) {
            setServerError(`No key metrics data available for ${ticker}.`)
            setFallbackNotice("")
            return []
        }

        setServerError("")
        setFallbackNotice("")
        return [data]
    }, [ticker])

    const {
        data: companyDataRows,
        loading,
        error: progressiveError,
    } = useProgressiveData<CompanyKeyMetrics>({
        loader: keyMetricsLoader,
        chunkSize: 1,
        chunkDelayMs: 0,
        enabled: Boolean(ticker),
    })

    const companyData = companyDataRows[0] ?? null

    return (
        <>
            {serverError && !companyData && <p>{serverError}</p>}
            {progressiveError && !companyData && <p>{progressiveError}</p>}
            {companyData ? (
                <div>
                    {fallbackNotice && (
                        <p className="mb-3 rounded border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700">
                         {fallbackNotice}
                        </p>
                    )}
                    <RatioList data={companyData} config={companyProfileRatioConfig} />
                </div>
            ) : loading ? (
                <TableSkeleton />
            ) : (
                <Spinner />
            )}
        </>
    )
}

export default CompanyProfile
