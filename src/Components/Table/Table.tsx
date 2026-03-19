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
            <tr
                key={index}
                className="border-b border-subtle transition-colors hover:bg-[var(--color-light-green)]/15"
            >
                {config.map((row) => {
                    return (
                        <td
                            key={row.key ?? `cell-${index}-${config.indexOf(row)}`}
                            className="px-4 py-3 whitespace-nowrap text-sm font-medium text-strong"
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
                className="px-4 py-3 text-left text-[11px] font-semibold tracking-[0.22em] text-muted uppercase"
                key={column.key ?? `header-${config.indexOf(column)}`}
            >
                {column.label}
            </th>
        )
    })
    return (
        <div className="overflow-hidden rounded-[1.9rem] border border-subtle bg-surface shadow-soft transition-colors">
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="border-b border-subtle bg-surface-soft">
                        <tr>{renderedHeader}</tr>
                    </thead>
                    <tbody className="bg-surface">{renderedRow}</tbody>
                </table>
            </div>
        </div>
    )
}

export default Table
