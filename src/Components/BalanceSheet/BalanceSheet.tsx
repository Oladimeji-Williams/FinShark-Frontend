import { useCallback, useState } from "react"
import { CompanyBalanceSheet } from "@/company"
import { useOutletContext } from "react-router-dom"
import RatioList from "../RatioList/RatioList"
import { getBalanceSheet } from "@/lib/fmpClient"
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
            {serverError && !balanceSheet && <p>{serverError}</p>}
            {progressiveError && !balanceSheet && <p>{progressiveError}</p>}
            {balanceSheet ? (
                <div>
                    {fallbackNotice && (
                        <p className="mb-3 rounded border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-900/20 px-3 py-2 text-sm text-amber-700 dark:text-amber-300">
                            {fallbackNotice}
                        </p>
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
