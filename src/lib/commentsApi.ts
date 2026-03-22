import axios from "axios"
import type { StockComment, CreateCommentRequest, UpdateCommentRequest } from "@/types"
import { getStocks } from "./stocksApi"

const api = axios.create({
    baseURL: "https://localhost:5001/api",
    headers: { "Content-Type": "application/json" },
})

// Helper function to get stock ID from ticker
const getStockIdFromTicker = async (ticker: string): Promise<number> => {
    const response = await getStocks({ symbol: ticker, pageSize: 1 })
    if (response.success && response.data.items.length > 0) {
        return response.data.items[0].id
    }
    throw new Error(`Stock with symbol ${ticker} not found`)
}

export const getComments = async (ticker: string): Promise<StockComment[]> => {
    try {
        const stockId = await getStockIdFromTicker(ticker)
        const { data } = await api.get<{ success: boolean; data: { items: StockComment[] } }>(
            `/stocks/${stockId}/comments`
        )
        if (data.success) {
            return data.data.items
        }
        return []
    } catch (error) {
        throw new Error(
            `Failed to fetch comments: ${error instanceof Error ? error.message : "Unknown error"}`
        )
    }
}

export const createComment = async (
    ticker: string,
    comment: CreateCommentRequest
): Promise<StockComment> => {
    try {
        const stockId = await getStockIdFromTicker(ticker)
        const { data } = await api.post<{ success: boolean; data: number }>(
            `/stocks/${stockId}/comments`,
            comment
        )
        if (data.success) {
            // After creating, fetch the comment to return it
            const comments = await getComments(ticker)
            const newComment = comments.find((c) => c.id === data.data)
            if (newComment) return newComment
        }
        throw new Error("Failed to create comment")
    } catch (error) {
        throw new Error(
            `Failed to create comment: ${error instanceof Error ? error.message : "Unknown error"}`
        )
    }
}

export const updateComment = async (
    ticker: string,
    commentId: number,
    comment: UpdateCommentRequest
): Promise<StockComment> => {
    try {
        const { data } = await api.patch<{ success: boolean; data: boolean }>(
            `/comments/${commentId}`,
            comment
        )
        if (data.success) {
            // After updating, fetch all comments to get the updated one
            const comments = await getComments(ticker)
            const updatedComment = comments.find((c) => c.id === commentId)
            if (updatedComment) return updatedComment
        }
        throw new Error("Failed to update comment")
    } catch (error) {
        throw new Error(
            `Failed to update comment: ${error instanceof Error ? error.message : "Unknown error"}`
        )
    }
}

export const deleteComment = async (ticker: string, commentId: number): Promise<void> => {
    try {
        const { data } = await api.delete<{ success: boolean; data: boolean }>(
            `/comments/${commentId}`
        )
        if (!data.success) {
            throw new Error("Failed to delete comment")
        }
    } catch (error) {
        throw new Error(
            `Failed to delete comment: ${error instanceof Error ? error.message : "Unknown error"}`
        )
    }
}
