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

    return (
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg p-4 sm:p-6 xl:p-8 transition-colors">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 m-5 bg-gray-50 dark:bg-gray-700">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                                >
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                    {{
                                        asc: " ↑",
                                        desc: " ↓",
                                    }[header.column.getIsSorted() as string] ?? null}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 transition-colors">
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="border-b dark:border-gray-700">
                            {row.getVisibleCells().map((cell) => (
                                <td
                                    key={cell.id}
                                    className="px-4 py-2 whitespace-nowrap text-sm font-normal text-gray-900 dark:text-gray-100"
                                >
                                    {cell.column.columnDef.cell
                                        ? flexRender(cell.column.columnDef.cell, cell.getContext())
                                        : String(cell.getValue() ?? "")}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-3">
                <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Previous
                </button>

                <span className="mx-3 text-gray-900 dark:text-gray-100">
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </span>

                <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default DataTable
