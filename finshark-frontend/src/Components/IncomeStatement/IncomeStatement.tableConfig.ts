import type { CompanyIncomeStatement } from "@/company"

export type IncomeStatementTableColumn = {
    label: string
    render: (company: CompanyIncomeStatement) => string
}

export const incomeStatementTableConfig: IncomeStatementTableColumn[] = [
    {
        label: "Date",
        render: (company) => company.date,
    },
    {
        label: "Revenue",
        render: (company) => formatLargeMonetaryNumber(company.revenue),
    },
    {
        label: "Cost Of Revenue",
        render: (company) => formatLargeMonetaryNumber(company.costOfRevenue),
    },
    {
        label: "Depreciation",
        render: (company) => formatLargeMonetaryNumber(company.depreciationAndAmortization),
    },
    {
        label: "Operating Income",
        render: (company) => formatLargeMonetaryNumber(company.operatingIncome),
    },
    {
        label: "Income Before Taxes",
        render: (company) => formatLargeMonetaryNumber(company.incomeBeforeTax),
    },
    {
        label: "Net Income",
        render: (company) => formatLargeMonetaryNumber(company.netIncome),
    },
    {
        label: "Net Income Ratio",
        render: (company) => formatRatio(company.netIncomeRatio),
    },
    {
        label: "Earnings Per Share",
        render: (company) => formatRatio(company.eps),
    },
    {
        label: "Earnings Per Diluted",
        render: (company) => formatRatio(company.epsdiluted),
    },
    {
        label: "Gross Profit Ratio",
        render: (company) => formatRatio(company.grossProfitRatio),
    },
    {
        label: "Operating Income Ratio",
        render: (company) => formatRatio(company.operatingIncomeRatio),
    },
    {
        label: "Income Before Taxes Ratio",
        render: (company) => formatRatio(company.incomeBeforeTaxRatio),
    },
]

function formatLargeMonetaryNumber(value: number) {
    if (value >= 1_000_000_000_000) return `${(value / 1_000_000_000_000).toFixed(2)}T`
    if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(2)}B`
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`
    return value.toLocaleString()
}

function formatRatio(value: number) {
    return Number.isFinite(value) ? value.toFixed(2) : "N/A"
}
