import { useCallback, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { CompanyIncomeStatement } from "@/company"
import { getIncomeStatement } from "../../../api"
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
            {serverError && incomeStatement.length === 0 && <p>{serverError}</p>}
            {progressiveError && incomeStatement.length === 0 && <p>{progressiveError}</p>}

            {loading && incomeStatement.length === 0 ? (
                <TableSkeleton />
            ) : incomeStatement.length > 0 ? (
                <div className="bg-white shadow overflow-hidden rounded-lg p-4 sm:p-6 xl:p-8">
                    {fallbackNotice && (
                        <p className="mb-3 rounded border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700">
                            {fallbackNotice}
                        </p>
                    )}
                    {loading && total > 0 && (
                        <p className="mb-3 text-sm text-gray-500">
                            Streaming rows: {incomeStatement.length}/{total}
                        </p>
                    )}
                    <div className="overflow-x-auto">
                        <div style={{ width: tableWidth }}>
                            <div
                                style={{ display: "grid", gridTemplateColumns }}
                                className="border-b border-gray-200"
                            >
                                {incomeStatementTableConfig.map((column) => (
                                    <div
                                        key={column.label}
                                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        {column.label}
                                    </div>
                                ))}
                            </div>

                            <List
                                rowComponent={IncomeStatementRow}
                                rowCount={incomeStatement.length}
                                rowHeight={40}
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
                                        Math.max(200, incomeStatement.length * 40)
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
