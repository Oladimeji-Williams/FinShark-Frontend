import { useCallback, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { CompanyIncomeStatement } from "@/company"
import InlineNotice from "@/Components/Feedback/InlineNotice"
import { getIncomeStatement } from "@/lib/fmpClient"
import { testIncomeStatementData } from "../Table/testData"
import { useProgressiveData } from "../../../hooks/UseProgressiveData"
import TableSkeleton from "../TableSkeleton/TableSkeleton"
import { List, type RowComponentProps } from "react-window"
import Spinner from "../Spinner/Spinner"
import {
    incomeStatementTableConfig,
    type IncomeStatementTableColumn,
} from "./IncomeStatement.tableConfig"

type IncomeRowData = {
    rows: CompanyIncomeStatement[]
    tableConfig: IncomeStatementTableColumn[]
    gridTemplateColumns: string
}

const IncomeStatementRow = ({
    index,
    style,
    rows,
    tableConfig,
    gridTemplateColumns,
}: RowComponentProps<IncomeRowData>) => {
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

const IncomeStatement = () => {
    const ticker = useOutletContext<string>()
    const [serverError, setServerError] = useState<string>("")
    const [fallbackNotice, setFallbackNotice] = useState<string>("")

    const incomeStatementLoader = useCallback(async () => {
        const result = await getIncomeStatement(ticker)

        if (typeof result === "string") {
            setServerError("")
            setFallbackNotice(
                "Showing fallback data because live income statement data is unavailable."
            )
            return testIncomeStatementData as CompanyIncomeStatement[]
        }

        setServerError("")
        setFallbackNotice("")
        return Array.isArray(result) ? result : [result]
    }, [ticker])

    const {
        data: incomeStatement,
        loading,
        error: progressiveError,
        total,
    } = useProgressiveData<CompanyIncomeStatement>({
        loader: incomeStatementLoader,
        chunkSize: 3,
        chunkDelayMs: 80,
        enabled: Boolean(ticker),
    })

    const columnWidth = 180
    const tableWidth = incomeStatementTableConfig.length * columnWidth
    const gridTemplateColumns = `repeat(${incomeStatementTableConfig.length}, ${columnWidth}px)`

    return (
        <>
            {serverError && incomeStatement.length === 0 ? (
                <InlineNotice variant="error" title="Income Statement Error">
                    {serverError}
                </InlineNotice>
            ) : null}
            {progressiveError && incomeStatement.length === 0 ? (
                <InlineNotice variant="error" title="Income Statement Error">
                    {progressiveError}
                </InlineNotice>
            ) : null}

            {loading && incomeStatement.length === 0 ? (
                <TableSkeleton />
            ) : incomeStatement.length > 0 ? (
                <div className="overflow-hidden rounded-[1.9rem] border border-subtle bg-surface shadow-soft backdrop-blur-xl transition-colors">
                    <div className="space-y-3 border-b border-subtle px-5 py-5 sm:px-6">
                        {fallbackNotice && (
                            <InlineNotice variant="warning" title="Fallback Data">
                                {fallbackNotice}
                            </InlineNotice>
                        )}
                        {loading && total > 0 ? (
                            <p className="text-sm font-medium text-slate-600 dark:text-zinc-400">
                                Streaming rows: {incomeStatement.length}/{total}
                            </p>
                        ) : null}
                    </div>
                    <div className="overflow-x-auto px-3 py-3 sm:px-5 sm:py-5">
                        <div style={{ width: tableWidth }}>
                            <div
                                style={{ display: "grid", gridTemplateColumns }}
                                className="border-b border-primary/30 bg-primary/10"
                            >
                                {incomeStatementTableConfig.map((column) => (
                                    <div
                                        key={column.label}
                                        className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.22em] text-primary"
                                    >
                                        {column.label}
                                    </div>
                                ))}
                            </div>

                            <List
                                rowComponent={IncomeStatementRow}
                                rowCount={incomeStatement.length}
                                rowHeight={48}
                                rowProps={{
                                    rows: incomeStatement,
                                    tableConfig: incomeStatementTableConfig,
                                    gridTemplateColumns,
                                }}
                                defaultHeight={360}
                                overscanCount={8}
                                style={{
                                    height: Math.min(
                                        480,
                                        Math.max(240, incomeStatement.length * 48)
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

export default IncomeStatement
