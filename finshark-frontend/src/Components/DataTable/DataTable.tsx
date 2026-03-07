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
        <div className="bg-white shadow overflow-hidden rounded-lg p-4 sm:p-6 xl:p-8">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="min-w-full divide-y divide-gray-200 m-5">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
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

                <tbody className="bg-white divide-y divide-gray-200">
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="border-b">
                            {row.getVisibleCells().map((cell) => (
                                <td
                                    key={cell.id}
                                    className="px-4 py-2 whitespace-nowrap text-sm font-normal text-gray-900"
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
                <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                    Previous
                </button>

                <span className="mx-3">
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </span>

                <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default DataTable
