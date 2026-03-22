"use client"

import { FormEvent } from "react"

type StockCommentFormProps = {
    userHasName: boolean
    authorName: string
    title: string
    setTitle: (value: string) => void
    content: string
    setContent: (value: string) => void
    rating: number
    setRating: (value: number) => void
    error: string
    editingId: number | null
    onSubmit: (event: FormEvent<HTMLFormElement>) => void
    onCancel: () => void
}

const StockCommentForm = ({
    userHasName,
    authorName,
    title,
    setTitle,
    content,
    setContent,
    rating,
    setRating,
    error,
    editingId,
    onSubmit,
    onCancel,
}: StockCommentFormProps) => {
    return (
        <form onSubmit={onSubmit} className="space-y-3">
            {!userHasName ? (
                <div className="rounded-xl border border-red-200 bg-red-50/80 p-4 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300">
                    <p className="text-sm font-medium">Profile Update Required</p>
                    <p className="mt-1 text-sm">
                        Please update your profile with your full name to post comments.
                    </p>
                </div>
            ) : (
                <div className="flex items-center gap-2 text-sm text-muted">
                    <span>Posting as:</span>
                    <span className="font-semibold text-strong">{authorName}</span>
                </div>
            )}

            <div className="grid gap-2">
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Comment title..."
                    className="rounded-xl border border-subtle bg-surface px-3 py-2 text-sm text-strong outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-zinc-700 dark:bg-surface"
                    aria-label="Comment title"
                    maxLength={100}
                    disabled={!userHasName}
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your comment..."
                    rows={3}
                    className="rounded-xl border border-subtle bg-surface px-3 py-2 text-sm text-strong outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-zinc-700 dark:bg-surface"
                    aria-label="Comment content"
                    maxLength={500}
                    disabled={!userHasName}
                />
                <div className="flex items-center gap-2">
                    <label htmlFor="rating" className="text-sm text-strong">
                        Rating:
                    </label>
                    <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="rounded-xl border border-subtle bg-surface px-2 py-1 text-sm text-strong outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-zinc-700 dark:bg-surface"
                        disabled={!userHasName}
                    >
                        {[1, 2, 3, 4, 5].map((value) => (
                            <option key={value} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                    <span className="text-xs text-muted">/ 5</span>
                </div>
            </div>

            {error ? <p className="text-sm text-red-600 dark:text-red-300">{error}</p> : null}

            <div className="flex items-center gap-2">
                <button
                    type="submit"
                    disabled={!userHasName}
                    className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-hover focus:ring-2 focus:ring-primary/50 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {editingId ? "Save changes" : "Post comment"}
                </button>
                {editingId ? (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-xl border border-subtle bg-surface px-4 py-2 text-sm font-semibold text-strong transition hover:bg-surface-soft dark:border-zinc-700 dark:bg-surface dark:text-strong dark:hover:bg-surface-soft focus:ring-2 focus:ring-primary/50 focus:outline-none"
                    >
                        Cancel
                    </button>
                ) : null}
            </div>
        </form>
    )
}

export default StockCommentForm
