import type { CompanyBalanceSheet } from "@/company"
import type { RatioListConfig } from "../RatioList/RatioList"
import { formatLargeMonetaryNumber } from "@/Helpers/NumberFormatting"

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

