import axios from "axios"

const api = axios.create({
    baseURL: "https://localhost:5001/api/stocks",
    headers: { "Content-Type": "application/json" },
})

export interface Stock {
    id: number
    symbol: string
    companyName: string
    currentPrice: number
    sector: string
    marketCap: number
    comments: any[]
}

export interface StockResponse {
    success: boolean
    data: {
        items: Stock[]
        pagination: {
            totalCount: number
            pageNumber: number
            pageSize: number
            totalPages: number
            hasNextPage: boolean
            hasPreviousPage: boolean
        }
    }
    message: string
    errors: string[] | null
}

export const getStocks = async (params?: {
    symbol?: string
    pageNumber?: number
    pageSize?: number
}): Promise<StockResponse> => {
    try {
        const { data } = await api.get<StockResponse>("", { params })
        return data
    } catch (error) {
        throw new Error(
            `Failed to fetch stocks: ${error instanceof Error ? error.message : "Unknown error"}`
        )
    }
}

export const getStockById = async (id: number): Promise<Stock> => {
    try {
        const { data } = await api.get<Stock>(`/${id}`)
        return data
    } catch (error) {
        throw new Error(
            `Failed to fetch stock: ${error instanceof Error ? error.message : "Unknown error"}`
        )
    }
}
