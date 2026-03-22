import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import StockCommentSection from "../../Components/Comments/StockComment"

// Mock the auth and toast hooks
const mockUser = { email: "test@example.com", firstName: "John", lastName: "Doe" }
const mockShowToast = jest.fn()

jest.mock("../../Components/Providers/AuthProvider", () => ({
    useAuth: () => ({ user: mockUser }),
}))

jest.mock("../../Components/Toast/ToastProvider", () => ({
    useToast: () => ({ showToast: mockShowToast }),
}))

jest.mock("../../lib/commentsApi", () => ({
    getComments: jest.fn().mockResolvedValue([]),
    createComment: jest.fn(async (ticker: string, author: string, message: string) => ({
        id: "new-id",
        author,
        message,
        createdAt: new Date().toISOString(),
    })),
    updateComment: jest.fn(async (ticker: string, id: string, message: string) => ({
        id,
        author: "John Doe",
        message,
        createdAt: new Date().toISOString(),
    })),
    deleteComment: jest.fn().mockResolvedValue(undefined),
}))

import * as commentsApi from "../../lib/commentsApi"

const getCommentsMock = commentsApi.getComments as jest.Mock
const createCommentMock = commentsApi.createComment as jest.Mock
const updateCommentMock = commentsApi.updateComment as jest.Mock
const deleteCommentMock = commentsApi.deleteComment as jest.Mock

describe("StockCommentSection", () => {
    beforeEach(() => {
        jest.clearAllMocks()
        ;(commentsApi.getComments as jest.Mock).mockResolvedValue([])
    })

    it("shows empty state initially and allows adding a comment", async () => {
        render(<StockCommentSection ticker="AAPL" />)

        await waitFor(() => expect(commentsApi.getComments).toHaveBeenCalledWith("AAPL"))

        expect(screen.getByText(/No comments yet/i)).toBeInTheDocument()
        expect(screen.getByText("Posting as:")).toBeInTheDocument()
        expect(screen.getByText("John Doe")).toBeInTheDocument()

        await userEvent.type(screen.getByLabelText(/Comment/i), "Great entry point")
        await userEvent.click(screen.getByRole("button", { name: /post comment/i }))

        await waitFor(() => expect(screen.getByText("Great entry point")).toBeInTheDocument())
        expect(createCommentMock).toHaveBeenCalledWith("AAPL", "John Doe", "Great entry point")
    })

    it("allows editing an existing comment", async () => {
        render(<StockCommentSection ticker="AAPL" />)

        await waitFor(() => expect(commentsApi.getComments).toHaveBeenCalledWith("AAPL"))

        await userEvent.type(screen.getByLabelText(/Comment/i), "Great entry point")
        await userEvent.click(screen.getByRole("button", { name: /post comment/i }))

        await userEvent.click(screen.getByRole("button", { name: /edit/i }))
        expect(screen.getByLabelText(/Comment/i)).toHaveValue("Great entry point")

        await userEvent.clear(screen.getByLabelText(/Comment/i))
        await userEvent.type(screen.getByLabelText(/Comment/i), "Better now")
        await userEvent.click(screen.getByRole("button", { name: /save changes/i }))

        await waitFor(() => expect(updateCommentMock).toHaveBeenCalled())
        expect(screen.getByText("Better now")).toBeInTheDocument()
    })

    it("deletes a comment and updates state", async () => {
        render(<StockCommentSection ticker="AAPL" />)

        await waitFor(() => expect(commentsApi.getComments).toHaveBeenCalledWith("AAPL"))

        await userEvent.type(screen.getByLabelText(/Comment/i), "Great entry point")
        await userEvent.click(screen.getByRole("button", { name: /post comment/i }))

        await userEvent.click(screen.getByRole("button", { name: /delete/i }))

        await waitFor(() => expect(deleteCommentMock).toHaveBeenCalled())
        expect(screen.getByText(/No comments yet/i)).toBeInTheDocument()
    })
})
