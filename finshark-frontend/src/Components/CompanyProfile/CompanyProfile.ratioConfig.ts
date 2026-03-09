import type { CompanyKeyMetrics } from "@/company"
import type { RatioListConfig } from "../RatioList/RatioList"
import { formatLargeNonMonetaryNumber, formatRatio } from "@/Helpers/NumberFormatting"

const pickFinite = (...values: Array<number | undefined>): number => {
    const value = values.find((entry) => Number.isFinite(entry))
    return typeof value === "number" ? value : Number.NaN
}

type KeyMetricsWithFallbacks = CompanyKeyMetrics & {
    returnOnAssetsTTM?: number
    returnOnEquityTTM?: number
    priceEarningsRatioTTM?: number
}

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
        render: (company) => {
            const metrics = company as KeyMetricsWithFallbacks
            return formatRatio(pickFinite(metrics.roeTTM, metrics.returnOnEquityTTM))
        },
        subtitle:
            "Return on equity is the measure of a company's net income divided by its shareholder's equity",
    },
    {
        label: "Return On Assets",
        render: (company) => {
            const metrics = company as KeyMetricsWithFallbacks
            return formatRatio(
                pickFinite(metrics.returnOnTangibleAssetsTTM, metrics.returnOnAssetsTTM)
            )
        },
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
        render: (company) => {
            const metrics = company as KeyMetricsWithFallbacks
            return formatRatio(pickFinite(metrics.peRatioTTM, metrics.priceEarningsRatioTTM))
        },
        subtitle:
            "This is the upperbouind of the price range that a defensive investor should pay for a stock",
    },
]
