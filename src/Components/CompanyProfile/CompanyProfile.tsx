import { CompanyKeyMetrics } from "@/company"
import { useCallback, useState } from "react"
import { useOutletContext } from "react-router-dom"
import InlineNotice from "@/Components/Feedback/InlineNotice"
import { getKeyMetrics } from "@/lib/fmpApi"
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
            {serverError && !companyData ? (
                <InlineNotice variant="error" title="Company Profile Error">
                    {serverError}
                </InlineNotice>
            ) : null}
            {progressiveError && !companyData ? (
                <InlineNotice variant="error" title="Company Profile Error">
                    {progressiveError}
                </InlineNotice>
            ) : null}
            {companyData ? (
                <div className="space-y-3">
                    {fallbackNotice && (
                        <InlineNotice variant="warning" title="Fallback Data">
                            {fallbackNotice}
                        </InlineNotice>
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
