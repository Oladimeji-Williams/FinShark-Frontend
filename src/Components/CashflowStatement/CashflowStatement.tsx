import { useCallback, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { CompanyCashflow } from "@/company"
import InlineNotice from "@/Components/Feedback/InlineNotice"
import { getCashflowStatement } from "@/lib/fmpClient"
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
            className="border-b border-primary/20 bg-primary/5 text-strong hover:bg-primary/10"
        >
            {tableConfig.map((column) => (
                <div
                    key={column.label}
                    className="px-4 py-3 whitespace-nowrap text-sm font-medium text-strong"
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
            {serverError && cashflowStatement.length === 0 ? (
                <InlineNotice variant="error" title="Cashflow Statement Error">
                    {serverError}
                </InlineNotice>
            ) : null}
            {progressiveError && cashflowStatement.length === 0 ? (
                <InlineNotice variant="error" title="Cashflow Statement Error">
                    {progressiveError}
                </InlineNotice>
            ) : null}

            {loading && cashflowStatement.length === 0 ? (
                <TableSkeleton />
            ) : cashflowStatement.length > 0 ? (
                <div className="overflow-hidden rounded-[1.9rem] border border-subtle bg-surface shadow-soft backdrop-blur-xl transition-colors">
                    <div className="space-y-3 border-b border-subtle px-5 py-5 sm:px-6">
                        {fallbackNotice && (
                            <InlineNotice variant="warning" title="Fallback Data">
                                {fallbackNotice}
                            </InlineNotice>
                        )}
                        {loading && total > 0 ? (
                            <p className="text-sm font-medium text-muted">
                                Streaming rows: {cashflowStatement.length}/{total}
                            </p>
                        ) : null}
                    </div>

                    <div className="overflow-x-auto px-3 py-3 sm:px-5 sm:py-5">
                        <div style={{ width: tableWidth }}>
                            <div
                                style={{ display: "grid", gridTemplateColumns }}
                                className="border-b border-primary/30 bg-primary/10"
                            >
                                {cashflowTableConfig.map((column) => (
                                    <div
                                        key={column.label}
                                        className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.22em] text-primary"
                                    >
                                        {column.label}
                                    </div>
                                ))}
                            </div>

                            <List
                                rowComponent={CashflowStatementRow}
                                rowCount={cashflowStatement.length}
                                rowHeight={48}
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
                                        Math.max(240, cashflowStatement.length * 48)
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
