import axios from "axios"

import {
    CompanyBalanceSheet,
    CompanyCashflow,
    CompanyComparisonData,
    CompanyHistoricalDividend,
    CompanyIncomeStatement,
    CompanyKeyMetrics,
    CompanyProfile,
    CompanySearch,
    CompanyTenK,
} from "@/company"

interface CompanyDiscountedCashFlow {
    dcf?: number | string
}

const fmpEndpoint = (path: string, params: Record<string, string> = {}) => {
    const searchParams = new URLSearchParams(params)
    const query = searchParams.toString()
    return query ? `/api/fmp/${path}?${query}` : `/api/fmp/${path}`
}

const parseFiniteNumber = (value: unknown): number | undefined => {
    if (typeof value === "number" && Number.isFinite(value)) return value
    if (typeof value === "string") {
        const parsed = Number(value)
        if (Number.isFinite(parsed)) return parsed
    }
    return undefined
}

const extractDcfValue = (
    payload: CompanyDiscountedCashFlow[] | CompanyDiscountedCashFlow
): number | undefined => {
    const point = Array.isArray(payload) ? payload[0] : payload
    return parseFiniteNumber(point?.dcf)
}

export const searchCompanies = async (request: string) => {
    try {
        const response = await axios.get<CompanySearch[]>(
            fmpEndpoint("search-symbol", { query: request })
        )
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.message
        }

        return "An unexpected error occurred while searching for companies."
    }
}

export const getCompanyProfile = async (ticker: string) => {
    try {
        const response = await axios.get<CompanyProfile[]>(
            fmpEndpoint("profile", { symbol: ticker })
        )
        return response.data[0]
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.message
        }

        return "An unexpected error occurred while fetching the company profile."
    }
}

export const getCompanyQuote = async (ticker: string) => {
    try {
        const response = await axios.get(fmpEndpoint("quote", { symbol: ticker }))
        return response.data[0]
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.message
        }

        return "An unexpected error occurred while fetching the company quote."
    }
}

export const getDiscountedCashFlow = async (ticker: string) => {
    try {
        const stableResponse = await axios.get<
            CompanyDiscountedCashFlow[] | CompanyDiscountedCashFlow
        >(fmpEndpoint("discounted-cash-flow", { symbol: ticker }))
        const stableDcf = extractDcfValue(stableResponse.data)
        if (Number.isFinite(stableDcf)) {
            return stableDcf
        }
    } catch {
        // Fall through to v3 endpoint for backward compatibility.
    }

    try {
        const v3Response = await axios.get<CompanyDiscountedCashFlow[]>(
            fmpEndpoint("discounted-cash-flow-v3", { symbol: ticker })
        )
        const v3Dcf = extractDcfValue(v3Response.data)
        if (Number.isFinite(v3Dcf)) {
            return v3Dcf
        }
        return "Discounted cashflow data is unavailable for this ticker."
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.message
        }

        return "An unexpected error occurred while fetching discounted cashflow data."
    }
}

export const getKeyMetrics = async (ticker: string) => {
    try {
        const response = await axios.get<CompanyKeyMetrics[]>(
            fmpEndpoint("key-metrics-ttm", { symbol: ticker })
        )
        if (response.data?.[0]) {
            return response.data[0]
        }

        const ratiosFallback = await axios.get<CompanyKeyMetrics[]>(
            fmpEndpoint("ratios-ttm", { symbol: ticker })
        )
        return ratiosFallback.data?.[0]
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.message
        }

        return "An unexpected error occurred while fetching the company key metrics."
    }
}

export const getIncomeStatement = async (ticker: string) => {
    try {
        const response = await axios.get<CompanyIncomeStatement[]>(
            fmpEndpoint("income-statement", { symbol: ticker, period: "annual", limit: "40" })
        )
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 402) {
                return "Your FMP plan does not include income statement access for this endpoint."
            }
            if (error.response?.status === 403) {
                return "Your API key is not authorized for income statement data (403)."
            }
            return error.message
        }

        return "An unexpected error occurred while fetching the company income statement."
    }
}

export const getBalanceSheet = async (ticker: string) => {
    try {
        const response = await axios.get<CompanyBalanceSheet[]>(
            fmpEndpoint("balance-sheet-statement", { symbol: ticker })
        )
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 402) {
                return "Your FMP plan does not include balance sheet access for this endpoint."
            }
            if (error.response?.status === 403) {
                return "Your API key is not authorized for balance sheet data (403)."
            }
            return error.message
        }

        return "An unexpected error occurred while fetching the company balance sheet."
    }
}

export const getCashflowStatement = async (ticker: string) => {
    try {
        const response = await axios.get<CompanyCashflow[]>(
            fmpEndpoint("cash-flow-statement", { symbol: ticker })
        )
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 402) {
                return "Your FMP plan does not include cashflow statement access for this endpoint."
            }
            if (error.response?.status === 403) {
                return "Your API key is not authorized for cashflow statement data (403)."
            }
            return error.message
        }

        return "An unexpected error occurred while fetching the company cashflow statement."
    }
}

export const getComparisonData = async (ticker: string) => {
    try {
        const response = await axios.get<CompanyComparisonData>(
            fmpEndpoint("stock-peers", { symbol: ticker })
        )
        const payload = response.data
        if (Array.isArray(payload)) {
            return payload[0] ?? { symbol: ticker, peersList: [] }
        }
        return payload
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 402) {
                return "Your FMP plan does not include peer comparison access for this endpoint."
            }
            if (error.response?.status === 403) {
                return "Your API key is not authorized for peer comparison data (403)."
            }
            return error.message
        }

        return "An unexpected error occurred while fetching peer comparison data."
    }
}

export const getTenK = async (ticker: string) => {
    try {
        const response = await axios.get<CompanyTenK[]>(
            fmpEndpoint("sec-filings-search-symbol", { symbol: ticker })
        )
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 402) {
                return "Your FMP plan does not include SEC filings access for this endpoint."
            }
            if (error.response?.status === 403) {
                return "Your API key is not authorized for SEC filings data (403)."
            }
            return error.message
        }

        return "An unexpected error occurred while fetching SEC filings data."
    }
}

export const getHistoricalDividends = async (ticker: string) => {
    try {
        const response = await axios.get<CompanyHistoricalDividend>(
            fmpEndpoint("historical-dividends", { symbol: ticker })
        )
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.message
        }

        return "An unexpected error occurred while fetching historical dividends data."
    }
}
