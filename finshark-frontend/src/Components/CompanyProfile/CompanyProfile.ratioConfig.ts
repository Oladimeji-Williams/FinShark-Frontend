import type { CompanyKeyMetrics } from "@/company"
import type { RatioListConfig } from "../RatioList/RatioList"

export const companyProfileRatioConfig: RatioListConfig<CompanyKeyMetrics>[] = [
    {
        label: "Market Cap",
        render: (company) => formatLargeNonMonetaryNumber(company.marketCapTTM),
        subtitle: "Total value of all a company's shares of stock",
    },
    {
        label: "Current Ratio",
        render: (company) => formatRatio(company.currentRatioTTM),
        subtitle: "Measures the companies ability to pay short term debt obligations",
    },
    {
        label: "Return On Equity",
        render: (company) => formatRatio(company.roeTTM),
        subtitle:
            "Return on equity is the measure of a company's net income divided by its shareholder's equity",
    },
    {
        label: "Return On Assets",
        render: (company) => formatRatio(company.returnOnTangibleAssetsTTM),
        subtitle: "Return on assets is the measure of how effective a company is using its assets",
    },
    {
        label: "Free Cashflow Per Share",
        render: (company) => formatRatio(company.freeCashFlowPerShareTTM),
        subtitle: "Return on assets is the measure of how effective a company is using its assets",
    },
    {
        label: "Book Value Per Share TTM",
        render: (company) => formatRatio(company.bookValuePerShareTTM),
        subtitle:
            "Book value per share indicates a firm's net asset value (total assets - total liabilities) on per share basis",
    },
    {
        label: "Dividend Yield TTM",
        render: (company) => formatRatio(company.dividendYieldTTM),
        subtitle: "Shows how much a company pays each year relative to stock price",
    },
    {
        label: "Capex Per Share TTM",
        render: (company) => formatRatio(company.capexPerShareTTM),
        subtitle: "Capex is used by a company to acquire, upgrade, and maintain physical assets",
    },
    {
        label: "Graham Number",
        render: (company) => formatRatio(company.grahamNumberTTM),
        subtitle:
            "This is the upperbouind of the price range that a defensive investor should pay for a stock",
    },
    {
        label: "PE Ratio",
        render: (company) => formatRatio(company.peRatioTTM),
        subtitle:
            "This is the upperbouind of the price range that a defensive investor should pay for a stock",
    },
]

function formatLargeNonMonetaryNumber(value: number) {
    if (typeof value !== "number" || !Number.isFinite(value)) return "N/A"
    if (value >= 1_000_000_000_000) return `${(value / 1_000_000_000_000).toFixed(2)}T`
    if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(2)}B`
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`
    return value.toLocaleString()
}

function formatRatio(value: number) {
    return Number.isFinite(value) ? value.toFixed(2) : "N/A"
}
