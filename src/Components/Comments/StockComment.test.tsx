import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import StockCommentSection from "./StockComment"

// Mock the auth and toast hooks
const mockUser = { email: "test@example.com", firstName: "John", lastName: "Doe" }
const mockShowToast = jest.fn()

jest.mock("../Providers/AuthProvider", () => ({
    useAuth: () => ({ user: mockUser }),
}))

jest.mock("../Toast/ToastProvider", () => ({
    useToast: () => ({ showToast: mockShowToast }),
}))

const STORAGE_KEY = "finshark-comments:AAPL"

describe("StockCommentSection", () => {
    beforeEach(() => {
        window.localStorage.clear()
        jest.clearAllMocks()
    })

    it("shows empty state initially and allows adding a comment", async () => {
        render(<StockCommentSection ticker="AAPL" />)

        expect(screen.getByText(/No comments yet/i)).toBeInTheDocument()
        expect(screen.getByText("Posting as:")).toBeInTheDocument()
        expect(screen.getByText("John Doe")).toBeInTheDocument()

        await userEvent.type(screen.getByLabelText(/Comment/i), "Great entry point")
        await userEvent.click(screen.getByRole("button", { name: /post comment/i }))

        expect(screen.queryByText(/No comments yet/i)).not.toBeInTheDocument()
        expect(screen.getByText("Great entry point")).toBeInTheDocument()
        expect(JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]")).toHaveLength(1)
    })

    it("allows editing an existing comment", async () => {
        render(<StockCommentSection ticker="AAPL" />)

        await userEvent.type(screen.getByLabelText(/Comment/i), "Great entry point")
        await userEvent.click(screen.getByRole("button", { name: /post comment/i }))

        await userEvent.click(screen.getByRole("button", { name: /edit/i }))
        expect(screen.getByLabelText(/Comment/i)).toHaveValue("Great entry point")

        await userEvent.clear(screen.getByLabelText(/Comment/i))
        await userEvent.type(screen.getByLabelText(/Comment/i), "Better now")
        await userEvent.click(screen.getByRole("button", { name: /save changes/i }))

        expect(screen.getByText("Better now")).toBeInTheDocument()
        const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]")
        expect(stored[0].message).toBe("Better now")
    })

    it("deletes a comment and updates localStorage", async () => {
        render(<StockCommentSection ticker="AAPL" />)

        await userEvent.type(screen.getByLabelText(/Comment/i), "Great entry point")
        await userEvent.click(screen.getByRole("button", { name: /post comment/i }))

        await userEvent.click(screen.getByRole("button", { name: /delete/i }))

        expect(screen.getByText(/No comments yet/i)).toBeInTheDocument()
        expect(JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]")).toHaveLength(0)
    })
})
