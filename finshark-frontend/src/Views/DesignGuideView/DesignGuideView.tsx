import { CompanyKeyMetrics } from "@/company"
import DataTable from "@/Components/DataTable/DataTable"
import RatioList from "@/Components/RatioList/RatioList"
import type { RatioListConfig } from "@/Components/RatioList/RatioList"
import Table from "@/Components/Table/Table"
import { testIncomeStatementData } from "@/Components/Table/testData"
import React from "react"

const mockMetrics = {
    marketCapTTM: 2410929717248,
    currentRatioTTM: 0.88,
    roeTTM: 1.75,
    returnOnTangibleAssetsTTM: 0.24,
    freeCashFlowPerShareTTM: 6.11,
    bookValuePerShareTTM: 3.95,
    dividendYieldTTM: 0.0055,
    capexPerShareTTM: 0.75,
    grahamNumberTTM: 128.2,
    peRatioTTM: 29.8,
} as CompanyKeyMetrics
const tableConfig: RatioListConfig<CompanyKeyMetrics>[] = [
    {
        label: "Market Cap",
        render: (company: CompanyKeyMetrics) => formatLargeNonMonetaryNumber(company.marketCapTTM),
        subtitle: "Total value of all a company's shares of stock",
    },
    {
        label: "Current Ratio",
        render: (company: CompanyKeyMetrics) => formatRatio(company.currentRatioTTM),
        subtitle: "Measures the companies ability to pay short term debt obligations",
    },
    {
        label: "Return On Equity",
        render: (company: CompanyKeyMetrics) => formatRatio(company.roeTTM),
        subtitle:
            "Return on equity is the measure of a company's net income divided by its shareholder's equity",
    },
    {
        label: "Return On Assets",
        render: (company: CompanyKeyMetrics) => formatRatio(company.returnOnTangibleAssetsTTM),
        subtitle: "Return on assets is the measure of how effective a company is using its assets",
    },
    {
        label: "Free Cashflow Per Share",
        render: (company: CompanyKeyMetrics) => formatRatio(company.freeCashFlowPerShareTTM),
        subtitle: "Return on assets is the measure of how effective a company is using its assets",
    },
    {
        label: "Book Value Per Share TTM",
        render: (company: CompanyKeyMetrics) => formatRatio(company.bookValuePerShareTTM),
        subtitle:
            "Book value per share indicates a firm's net asset value (total assets - total liabilities) on per share basis",
    },
    {
        label: "Dividend Yield TTM",
        render: (company: CompanyKeyMetrics) => formatRatio(company.dividendYieldTTM),
        subtitle: "Shows how much a company pays each year relative to stock price",
    },
    {
        label: "Capex Per Share TTM",
        render: (company: CompanyKeyMetrics) => formatRatio(company.capexPerShareTTM),
        subtitle: "Capex is used by a company to acquire, upgrade, and maintain physical assets",
    },
    {
        label: "Graham Number",
        render: (company: CompanyKeyMetrics) => formatRatio(company.grahamNumberTTM),
        subtitle:
            "This is the upperbouind of the price range that a defensive investor should pay for a stock",
    },
    {
        label: "PE Ratio",
        render: (company: CompanyKeyMetrics) => formatRatio(company.peRatioTTM),
        subtitle:
            "This is the upperbouind of the price range that a defensive investor should pay for a stock",
    },
]

const incomeStatementTableConfig = [
    {
        label: "Date",
        render: (company: (typeof testIncomeStatementData)[number]) => company.date,
    },
    {
        label: "Revenue",
        render: (company: (typeof testIncomeStatementData)[number]) =>
            formatLargeNonMonetaryNumber(company.revenue),
    },
    {
        label: "Cost Of Revenue",
        render: (company: (typeof testIncomeStatementData)[number]) =>
            formatLargeNonMonetaryNumber(company.costOfRevenue),
    },
]

const DesignGuideView = () => {
    return (
        <div>
            <h1>Finshark Design Guide View</h1>
            <h2>
                This is Finshark's design guide view. This is where we will house various design
                aspects of the app.
            </h2>
            <DataTable />
            <RatioList data={mockMetrics} config={tableConfig} />
            <Table data={testIncomeStatementData} config={incomeStatementTableConfig} />
        </div>
    )
}

export default DesignGuideView

function formatLargeNonMonetaryNumber(marketCapTTM?: number) {
    if (typeof marketCapTTM !== "number" || !Number.isFinite(marketCapTTM)) return "N/A"
    if (marketCapTTM >= 1_000_000_000_000)
        return `${(marketCapTTM / 1_000_000_000_000).toFixed(2)}T`
    if (marketCapTTM >= 1_000_000_000) return `${(marketCapTTM / 1_000_000_000).toFixed(2)}B`
    if (marketCapTTM >= 1_000_000) return `${(marketCapTTM / 1_000_000).toFixed(2)}M`
    return marketCapTTM.toLocaleString()
}

function formatRatio(value: number) {
    return Number.isFinite(value) ? value.toFixed(2) : "N/A"
}
