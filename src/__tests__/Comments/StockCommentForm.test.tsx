import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import StockCommentForm from "@/Components/Comments/StockCommentForm/StockCommentForm"

describe("StockCommentForm", () => {
    it("disables form when user has no name", () => {
        render(
            <StockCommentForm
                userHasName={false}
                authorName=""
                title=""
                setTitle={() => undefined}
                content=""
                setContent={() => undefined}
                rating={1}
                setRating={() => undefined}
                error=""
                editingId={null}
                onSubmit={(e) => e.preventDefault()}
                onCancel={() => undefined}
            />
        )

        expect(screen.getByText(/Profile Update Required/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Comment title/i)).toBeDisabled()
        expect(screen.getByLabelText(/Comment content/i)).toBeDisabled()
        expect(screen.getByRole("button", { name: /post comment/i })).toBeDisabled()
    })

    it("shows author and enables input when user has name", async () => {
        const setTitleMock = jest.fn()
        const setContentMock = jest.fn()
        const setRatingMock = jest.fn()

        render(
            <StockCommentForm
                userHasName={true}
                authorName="John Doe"
                title=""
                setTitle={setTitleMock}
                content=""
                setContent={setContentMock}
                rating={1}
                setRating={setRatingMock}
                error=""
                editingId={null}
                onSubmit={(e) => e.preventDefault()}
                onCancel={() => undefined}
            />
        )

        expect(screen.getByText(/Posting as:/i)).toBeInTheDocument()
        expect(screen.getByText("John Doe")).toBeInTheDocument()
        const titleInput = screen.getByLabelText(/Comment title/i)
        const contentInput = screen.getByLabelText(/Comment content/i)
        expect(titleInput).toBeEnabled()
        expect(contentInput).toBeEnabled()

        await userEvent.type(titleInput, "Test Title")
        expect(setTitleMock).toHaveBeenCalledTimes(10)
        expect(setTitleMock).toHaveBeenCalledWith("T")

        await userEvent.type(contentInput, "Test Content")
        expect(setContentMock).toHaveBeenCalledTimes(12)
        expect(setContentMock).toHaveBeenCalledWith("T")
    })
})
