"use client"

import {
    ColumnDef,
    SortingState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { useMemo, useState } from "react"
import { FaArrowDown, FaArrowUp, FaSort } from "react-icons/fa"
import { testIncomeStatementData } from "../Table/testData"

type IncomeStatementRow = (typeof testIncomeStatementData)[number]

type Props = {
    data?: IncomeStatementRow[]
}

const DataTable = ({ data = testIncomeStatementData }: Props) => {
    const [sorting, setSorting] = useState<SortingState>([])

    const columns = useMemo<ColumnDef<IncomeStatementRow>[]>(
        () => [
            {
                accessorKey: "symbol",
                header: "Symbol",
            },
            {
                accessorKey: "calendarYear",
                header: "Year",
            },
            {
                accessorKey: "costOfRevenue",
                header: "Cost of Revenue",
            },
        ],
        []
    )

    const table = useReactTable({
        data,
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    const renderSortIcon = (state: false | "asc" | "desc") => {
        if (state === "asc") return <FaArrowUp className="h-3 w-3" />
        if (state === "desc") return <FaArrowDown className="h-3 w-3" />
        return <FaSort className="h-3 w-3 opacity-60" />
    }

    return (
        <div className="overflow-hidden rounded-[1.9rem] border border-subtle bg-surface shadow-soft backdrop-blur-xl transition-colors">
            <div className="flex flex-col gap-3 border-b border-subtle px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted">
                        Interactive Table
                    </p>
                    <h3 className="mt-2 text-lg font-semibold tracking-tight text-strong">
                        Sortable financial preview
                    </h3>
                </div>
                <span className="inline-flex items-center rounded-full bg-surface-soft px-3 py-1.5 text-xs font-semibold tracking-[0.16em] text-muted uppercase">
                    {data.length} rows
                </span>
            </div>

            <div className="overflow-x-auto px-3 py-3 sm:px-5 sm:py-5">
                <table className="min-w-full overflow-hidden rounded-[1.4rem] border border-subtle">
                    <thead className="bg-surface-soft">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="px-4 py-3 text-left text-[11px] font-semibold tracking-[0.22em] text-slate-500 uppercase dark:text-zinc-400"
                                    >
                                        {header.isPlaceholder ? null : (
                                            <button
                                                type="button"
                                                onClick={header.column.getToggleSortingHandler()}
                                                className="inline-flex items-center gap-2 transition hover:text-slate-950 dark:hover:text-white"
                                            >
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {renderSortIcon(
                                                    header.column.getIsSorted() as
                                                        | false
                                                        | "asc"
                                                        | "desc"
                                                )}
                                            </button>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody className="divide-y divide-subtle bg-surface-soft">
                        {table.getRowModel().rows.map((row) => (
                            <tr
                                key={row.id}
                                className="transition-colors hover:bg-[var(--color-light-green)]/15 hover:text-strong"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-zinc-100"
                                    >
                                        {cell.column.columnDef.cell
                                            ? flexRender(
                                                  cell.column.columnDef.cell,
                                                  cell.getContext()
                                              )
                                            : String(cell.getValue() ?? "")}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col gap-3 border-t border-subtle px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted">
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </p>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="inline-flex items-center justify-center rounded-xl border border-subtle bg-surface px-4 py-2 text-sm font-semibold text-strong transition hover:bg-surface-soft disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="inline-flex items-center justify-center rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DataTable
