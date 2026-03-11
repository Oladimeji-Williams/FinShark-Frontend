import type { ReactNode } from "react"

export type TableConfig<T> = {
    key?: string
    label: ReactNode
    render: (item: T) => ReactNode
}

type TableProps<T> = {
    data: T[]
    config: TableConfig<T>[]
}

const Table = <T,>({ data, config }: TableProps<T>) => {
    const renderedRow = data.map((item, index) => {
        return (
            <tr key={index} className="border-b">
                {config.map((row) => {
                    return (
                        <td
                            key={row.key ?? `cell-${index}-${config.indexOf(row)}`}
                            className="px-4 py-2 whitespace-nowrap text-sm font-normal text-gray-900 dark:text-gray-100"
                        >
                            {row.render(item)}
                        </td>
                    )
                })}
            </tr>
        )
    })
    const renderedHeader = config.map((column) => {
        return (
            <th
                className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                key={column.key ?? `header-${config.indexOf(column)}`}
            >
                {column.label}
            </th>
        )
    })
    return (
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg p-4 sm:p-6 xl:p-8 transition-colors">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 m-5 bg-gray-50 dark:bg-gray-700">
                    <tr>{renderedHeader}</tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 transition-colors">
                    {renderedRow}
                </tbody>
            </table>
        </div>
    )
}

export default Table
