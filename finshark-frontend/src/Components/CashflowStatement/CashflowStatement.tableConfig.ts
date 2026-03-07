import type { CompanyCashflow } from "@/company"

export type CashflowTableColumn = {
    label: string
    render: (company: CompanyCashflow) => string
}

export const cashflowTableConfig: CashflowTableColumn[] = [
    {
        label: "Date",
        render: (company) => company.date,
    },
    {
        label: "Operating Cashflow",
        render: (company) => formatLargeMonetaryNumber(company.operatingCashFlow),
    },
    {
        label: "Investing Cashflow",
        render: (company) => formatLargeMonetaryNumber(company.netCashUsedForInvestingActivites),
    },
    {
        label: "Financing Cashflow",
        render: (company) =>
            formatLargeMonetaryNumber(company.netCashUsedProvidedByFinancingActivities),
    },
    {
        label: "Cash At End of Period",
        render: (company) => formatLargeMonetaryNumber(company.cashAtEndOfPeriod),
    },
    {
        label: "CapEX",
        render: (company) => formatLargeMonetaryNumber(company.capitalExpenditure),
    },
    {
        label: "Issuance Of Stock",
        render: (company) => formatLargeMonetaryNumber(company.commonStockIssued),
    },
    {
        label: "Free Cash Flow",
        render: (company) => formatLargeMonetaryNumber(company.freeCashFlow),
    },
]

function formatLargeMonetaryNumber(value: number) {
    if (!Number.isFinite(value)) return "N/A"
    if (value >= 1_000_000_000_000) return `${(value / 1_000_000_000_000).toFixed(2)}T`
    if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(2)}B`
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`
    return value.toLocaleString()
}
