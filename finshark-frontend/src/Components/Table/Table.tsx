import React from 'react'
import { testIncomeStatementData } from './testData'
type Company = (typeof testIncomeStatementData)[number];

type TableConfig = {
    label: string;
    render: (company: Company) => string | number;
};

type Props = {
    data?: Company[];
};

const configs: TableConfig[] = [
    {
        label: "Year",
        render: (company: Company) => company.acceptedDate,
    },
    {
        label: "Cost of Revenue",
        render: (company: Company) => company.costOfRevenue,
    },
];

const Table = ({ data = testIncomeStatementData }: Props) => {
    const renderedRow = data.map((company, index) => {

        return (

            <tr key={`${company.cik}-${company.date}-${index}`} className="border-b">
                {configs.map((config) => {
                    return <td key={config.label} className="px-4 py-2 whitespace-nowrap text-sm font-normal text-gray-900">{config.render(company)}</td>
                })}
            </tr>
        )
    })
    const renderedHeader = configs.map((config) => {
        return <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" key={config.label}>{config.label}</th>
    })
    return (
        <div className="bg-white shadow overflow-hidden rounded-lg p-4 sm:p-6 xl:p-8">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="min-w-full divide-y divide-gray-200 m-5">
                    <tr>
                        {renderedHeader}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {renderedRow}
                </tbody>
            </table>
        </div>
    )
}

export default Table
