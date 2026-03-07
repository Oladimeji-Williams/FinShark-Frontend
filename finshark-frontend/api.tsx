import axios from "axios"

import {
    CompanyBalanceSheet,
    CompanyCashflow,
    CompanyComparisonData,
    CompanyIncomeStatement,
    CompanyKeyMetrics,
    CompanyProfile,
    CompanySearch,
    CompanyTenK,
} from "@/company"

export const searchCompanies = async (request: string) => {
    try {
        const response = await axios.get<CompanySearch[]>(
            `https://financialmodelingprep.com/stable/search-symbol?query=${request}&apikey=${process.env.NEXT_PUBLIC_FMP_API_KEY}`
        )
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Axios error searching for companies:", error.message)
            return error.message
        }

        console.error("Unexpected error searching for companies:", error)
        return "An unexpected error occurred while searching for companies."
    }
}

export const getCompanyProfile = async (ticker: string) => {
    try {
        const response = await axios.get<CompanyProfile[]>(
            `https://financialmodelingprep.com/stable/profile?symbol=${ticker}&apikey=${process.env.NEXT_PUBLIC_FMP_API_KEY}`
        )
        return response.data[0]
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Axios error fetching company profile:", error.message)
            return error.message
        }

        console.error("Unexpected error fetching company profile:", error)
        return "An unexpected error occurred while fetching the company profile."
    }
}

export const getCompanyQuote = async (ticker: string) => {
    try {
        const response = await axios.get(
            `https://financialmodelingprep.com/stable/quote?symbol=${ticker}&apikey=${process.env.NEXT_PUBLIC_FMP_API_KEY}`
        )
        return response.data[0]
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Axios error fetching company quote:", error.message)
            return error.message
        }

        console.error("Unexpected error fetching company quote:", error)
        return "An unexpected error occurred while fetching the company quote."
    }
}

export const getKeyMetrics = async (ticker: string) => {
    try {
        const response = await axios.get<CompanyKeyMetrics[]>(
            `https://financialmodelingprep.com/stable/ratios-ttm?symbol=${ticker}&apikey=${process.env.NEXT_PUBLIC_FMP_API_KEY}`
        )
        return response.data[0]
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Axios error fetching company key metrics:", error.message)
            return error.message
        }

        console.error("Unexpected error fetching company key metrics:", error)
        return "An unexpected error occurred while fetching the company key metrics."
    }
}

export const getIncomeStatement = async (ticker: string) => {
    try {
        const response = await axios.get<CompanyIncomeStatement[]>(
            `https://financialmodelingprep.com/api/v3/income-statement/${ticker}?period=annual&limit=40&apikey=${process.env.NEXT_PUBLIC_FMP_API_KEY}`
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
            console.error("Axios error fetching company income statement:", error.message)
            return error.message
        }

        console.error("Unexpected error fetching company income statement:", error)
        return "An unexpected error occurred while fetching the company income statement."
    }
}

export const getBalanceSheet = async (ticker: string) => {
    try {
        const response = await axios.get<CompanyBalanceSheet[]>(
            `https://financialmodelingprep.com/stable/balance-sheet-statement?symbol=${ticker}&apikey=${process.env.NEXT_PUBLIC_FMP_API_KEY}`
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
            console.error("Axios error fetching company balance sheet:", error.message)
            return error.message
        }

        console.error("Unexpected error fetching company balance sheet:", error)
        return "An unexpected error occurred while fetching the company balance sheet."
    }
}

export const getCashflowStatement = async (ticker: string) => {
    try {
        const response = await axios.get<CompanyCashflow[]>(
            `https://financialmodelingprep.com/stable/cash-flow-statement?symbol=${ticker}&apikey=${process.env.NEXT_PUBLIC_FMP_API_KEY}`
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
            console.error("Axios error fetching company cashflow statement:", error.message)
            return error.message
        }

        console.error("Unexpected error fetching company cashflow statement:", error)
        return "An unexpected error occurred while fetching the company cashflow statement."
    }
}

export const getComparisonData = async (ticker: string) => {
    try {
        const response = await axios.get<CompanyComparisonData>(
            `https://financialmodelingprep.com/stable/stock-peers?symbol=${ticker}&apikey=${process.env.NEXT_PUBLIC_FMP_API_KEY}`
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
            console.error("Axios error fetching company peer comparison data:", error.message)
            return error.message
        }

        console.error("Unexpected error fetching company peer comparison data:", error)
        return "An unexpected error occurred while fetching peer comparison data."
    }
}


export const getTenK = async (ticker: string) => {
    try {
        const response = await axios.get<CompanyTenK[]>(
            `https://financialmodelingprep.com/stable/sec-filings-company-search/symbol?symbol=${ticker}&apikey=${process.env.NEXT_PUBLIC_FMP_API_KEY}`
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
            console.error("Axios error fetching company SEC filings data:", error.message)
            return error.message
        }

        console.error("Unexpected error fetching company SEC filings data:", error)
        return "An unexpected error occurred while fetching SEC filings data."
    }
}
