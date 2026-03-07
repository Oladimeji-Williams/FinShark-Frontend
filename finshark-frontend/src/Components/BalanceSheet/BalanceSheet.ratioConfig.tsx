import type { CompanyBalanceSheet } from "@/company"
import type { RatioListConfig } from "../RatioList/RatioList"

export const balanceSheetRatioConfig: RatioListConfig<CompanyBalanceSheet>[] = [
    {
        label: <div className="font-bold">Total Assets</div>,
        render: (company) => formatLargeMonetaryNumber(company.totalAssets),
    },
    {
        label: "Current Assets",
        render: (company) => formatLargeMonetaryNumber(company.totalCurrentAssets),
    },
    {
        label: "Total Cash",
        render: (company) => formatLargeMonetaryNumber(company.cashAndCashEquivalents),
    },
    {
        label: "Property & equipment",
        render: (company) => formatLargeMonetaryNumber(company.propertyPlantEquipmentNet),
    },
    {
        label: "Intangible Assets",
        render: (company) => formatLargeMonetaryNumber(company.intangibleAssets),
    },
    {
        label: "Long Term Debt",
        render: (company) => formatLargeMonetaryNumber(company.longTermDebt),
    },
    {
        label: "Total Debt",
        render: (company) => formatLargeMonetaryNumber(company.otherCurrentLiabilities),
    },
    {
        label: <div className="font-bold">Total Liabilities</div>,
        render: (company) => formatLargeMonetaryNumber(company.totalLiabilities),
    },
    {
        label: "Current Liabilities",
        render: (company) => formatLargeMonetaryNumber(company.totalCurrentLiabilities),
    },
    {
        label: "Long-Term Debt",
        render: (company) => formatLargeMonetaryNumber(company.longTermDebt),
    },
    {
        label: "Long-Term Income Taxes",
        render: (company) => formatLargeMonetaryNumber(company.otherLiabilities),
    },
    {
        label: "Stakeholder's Equity",
        render: (company) => formatLargeMonetaryNumber(company.totalStockholdersEquity),
    },
    {
        label: "Retained Earnings",
        render: (company) => formatLargeMonetaryNumber(company.retainedEarnings),
    },
]

function formatLargeMonetaryNumber(value: number) {
    if (!Number.isFinite(value)) return "N/A"
    if (value >= 1_000_000_000_000) return `${(value / 1_000_000_000_000).toFixed(2)}T`
    if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(2)}B`
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`
    return value.toLocaleString()
}
