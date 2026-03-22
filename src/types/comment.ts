export type Rating = number

export type StockComment = {
    id: number
    stockId: number
    title: string
    content: string
    rating: Rating
    createdAt: string
    updatedAt: string | null
}

export type CreateCommentRequest = {
    title: string
    content: string
    rating: Rating
}

export type UpdateCommentRequest = {
    title?: string
    content?: string
    rating?: Rating
}
