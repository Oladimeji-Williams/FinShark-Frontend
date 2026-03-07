import React from "react"

type Props = {
    data: any
    config: any
}

const Table = (props: Props) => {
    const renderedRow = props.data.map((company: any, index: any) => {
        return (
            <tr key={`${company.cik}-${company.date}-${index}`} className="border-b">
                {props.config.map((row: any) => {
                    return (
                        <td
                            key={row.label}
                            className="px-4 py-2 whitespace-nowrap text-sm font-normal text-gray-900"
                        >
                            {row.render(company)}
                        </td>
                    )
                })}
            </tr>
        )
    })
    const renderedHeader = props.config.map((config: any) => {
        return (
            <th
                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                key={config.label}
            >
                {config.label}
            </th>
        )
    })
    return (
        <div className="bg-white shadow overflow-hidden rounded-lg p-4 sm:p-6 xl:p-8">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="min-w-full divide-y divide-gray-200 m-5">
                    <tr>{renderedHeader}</tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">{renderedRow}</tbody>
            </table>
        </div>
    )
}

export default Table
