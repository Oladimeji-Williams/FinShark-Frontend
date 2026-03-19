import { useCallback, useState } from "react"
import { CompanyBalanceSheet } from "@/company"
import { useOutletContext } from "react-router-dom"
import InlineNotice from "@/Components/Feedback/InlineNotice"
import RatioList from "../RatioList/RatioList"
import { getBalanceSheet } from "@/lib/fmpApi"
import { testBalanceSheetData } from "../Table/testData"
import TableSkeleton from "../TableSkeleton/TableSkeleton"
import { useProgressiveData } from "../../../hooks/UseProgressiveData"
import { balanceSheetRatioConfig } from "./BalanceSheet.ratioConfig"

const BalanceSheet = () => {
    const ticker = useOutletContext<string>()
    const [serverError, setServerError] = useState<string>("")
    const [fallbackNotice, setFallbackNotice] = useState<string>("")

    const balanceSheetLoader = useCallback(async () => {
        const value = await getBalanceSheet(ticker)

        if (typeof value === "string") {
            setServerError("")
            setFallbackNotice(
                "Showing fallback data because live balance sheet data is unavailable."
            )
            return [testBalanceSheetData[0] as CompanyBalanceSheet]
        }

        if (value.length === 0) {
            setServerError(`No balance sheet data available for ${ticker}.`)
            setFallbackNotice("")
            return []
        }

        setServerError("")
        setFallbackNotice("")
        return [value[0]]
    }, [ticker])

    const {
        data: balanceSheetRows,
        loading,
        error: progressiveError,
    } = useProgressiveData<CompanyBalanceSheet>({
        loader: balanceSheetLoader,
        chunkSize: 1,
        chunkDelayMs: 0,
        enabled: Boolean(ticker),
    })

    const balanceSheet = balanceSheetRows[0] ?? null

    return (
        <>
            {serverError && !balanceSheet ? (
                <InlineNotice variant="error" title="Balance Sheet Error">
                    {serverError}
                </InlineNotice>
            ) : null}
            {progressiveError && !balanceSheet ? (
                <InlineNotice variant="error" title="Balance Sheet Error">
                    {progressiveError}
                </InlineNotice>
            ) : null}
            {balanceSheet ? (
                <div className="space-y-3">
                    {fallbackNotice && (
                        <InlineNotice variant="warning" title="Fallback Data">
                            {fallbackNotice}
                        </InlineNotice>
                    )}
                    <RatioList config={balanceSheetRatioConfig} data={balanceSheet} />
                </div>
            ) : loading ? (
                <TableSkeleton />
            ) : null}
        </>
    )
}

export default BalanceSheet
