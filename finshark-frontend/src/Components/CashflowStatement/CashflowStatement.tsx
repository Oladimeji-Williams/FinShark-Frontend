import { useCallback, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { CompanyCashflow } from "@/company"
import { getCashflowStatement } from "../../../api"
import { testCashflowStatementData } from "../Table/testData"
import { useProgressiveData } from "../../../hooks/UseProgressiveData"
import TableSkeleton from "../TableSkeleton/TableSkeleton"
import { List, type RowComponentProps } from "react-window"
import Spinner from "../Spinner/Spinner"
import { cashflowTableConfig, type CashflowTableColumn } from "./CashflowStatement.tableConfig"

type CashflowRowData = {
    rows: CompanyCashflow[]
    tableConfig: CashflowTableColumn[]
    gridTemplateColumns: string
}

const CashflowStatementRow = ({
    index,
    style,
    rows,
    tableConfig,
    gridTemplateColumns,
}: RowComponentProps<CashflowRowData>) => {
    const company = rows[index]

    return (
        <div
            style={{ ...style, display: "grid", gridTemplateColumns }}
            className="border-b border-gray-200"
        >
            {tableConfig.map((column) => (
                <div
                    key={column.label}
                    className="px-4 py-2 whitespace-nowrap text-sm font-normal text-gray-900"
                >
                    {column.render(company)}
                </div>
            ))}
        </div>
    )
}

const CashflowStatement = () => {
    const ticker = useOutletContext<string>()
    const [serverError, setServerError] = useState("")
    const [fallbackNotice, setFallbackNotice] = useState<string>("")

    const cashflowLoader = useCallback(async () => {
        const result = await getCashflowStatement(ticker)

        if (typeof result === "string") {
            setServerError("")
            setFallbackNotice("Showing fallback data because live cashflow data is unavailable.")
            return testCashflowStatementData as CompanyCashflow[]
        }

        setServerError("")
        setFallbackNotice("")
        return Array.isArray(result) ? result : [result]
    }, [ticker])

    const {
        data: cashflowStatement,
        loading,
        error: progressiveError,
        total,
    } = useProgressiveData<CompanyCashflow>({
        loader: cashflowLoader,
        chunkSize: 3,
        chunkDelayMs: 80,
        enabled: Boolean(ticker),
    })

    const columnWidth = 200
    const tableWidth = cashflowTableConfig.length * columnWidth
    const gridTemplateColumns = `repeat(${cashflowTableConfig.length}, ${columnWidth}px)`

    return (
        <>
            {serverError && cashflowStatement.length === 0 && <p>{serverError}</p>}
            {progressiveError && cashflowStatement.length === 0 && <p>{progressiveError}</p>}

            {loading && cashflowStatement.length === 0 ? (
                <TableSkeleton />
            ) : cashflowStatement.length > 0 ? (
                <div className="bg-white shadow overflow-hidden rounded-lg p-4 sm:p-6 xl:p-8">
                    {fallbackNotice && (
                        <p className="mb-3 rounded border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700">
                            {fallbackNotice}
                        </p>
                    )}
                    {loading && total > 0 && (
                        <p className="mb-3 text-sm text-gray-500">
                            Streaming rows: {cashflowStatement.length}/{total}
                        </p>
                    )}

                    <div className="overflow-x-auto">
                        <div style={{ width: tableWidth }}>
                            <div
                                style={{ display: "grid", gridTemplateColumns }}
                                className="border-b border-gray-200"
                            >
                                {cashflowTableConfig.map((column) => (
                                    <div
                                        key={column.label}
                                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        {column.label}
                                    </div>
                                ))}
                            </div>

                            <List
                                rowComponent={CashflowStatementRow}
                                rowCount={cashflowStatement.length}
                                rowHeight={40}
                                rowProps={{
                                    rows: cashflowStatement,
                                    tableConfig: cashflowTableConfig,
                                    gridTemplateColumns,
                                }}
                                defaultHeight={360}
                                overscanCount={8}
                                style={{
                                    height: Math.min(
                                        480,
                                        Math.max(200, cashflowStatement.length * 40)
                                    ),
                                    width: tableWidth,
                                }}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <Spinner />
            )}
        </>
    )
}

export default CashflowStatement
