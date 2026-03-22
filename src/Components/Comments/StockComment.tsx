"use client"

import { FormEvent, useEffect, useMemo, useState } from "react"
import { useAuth } from "@/Components/Providers/AuthProvider"
import { useToast } from "@/Components/Toast/ToastProvider"
import type { StockComment, Rating } from "@/types"
import {
    getComments,
    createComment,
    updateComment,
    deleteComment as deleteCommentApi,
} from "@/lib/commentsApi"
import StockCommentForm from "./StockCommentForm/StockCommentForm"
import { getUserDisplayName } from "@/types"

type StockCommentSectionProps = {
    ticker: string
}

const StockCommentSection = ({ ticker }: StockCommentSectionProps) => {
    const { user } = useAuth()
    const { showToast } = useToast()
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [rating, setRating] = useState(1)
    const [editingId, setEditingId] = useState<number | null>(null)
    const [comments, setComments] = useState<StockComment[]>([])
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let mounted = true
        const fetchComments = async () => {
            try {
                setLoading(true)
                const fetchedComments = await getComments(ticker)
                if (mounted) {
                    setComments(
                        [...fetchedComments].sort(
                            (a, b) =>
                                new Date(b.created || "").getTime() -
                                new Date(a.created || "").getTime()
                        )
                    )
                    setError("")
                }
            } catch (err) {
                if (mounted) {
                    console.error(err)
                    setError("Unable to load comments. Please try again.")
                    setComments([])
                }
            } finally {
                if (mounted) setLoading(false)
            }
        }

        void fetchComments()

        return () => {
            mounted = false
        }
    }, [ticker])

    const commentCount = useMemo(() => comments.length, [comments])

    // Check if user has a name
    const authorName = getUserDisplayName(user)
    const userHasName = authorName !== "User"

    const clearForm = () => {
        setTitle("")
        setContent("")
        setRating(1)
        setEditingId(null)
        setError("")
    }

    const addComment = async (comment: StockComment) => {
        setComments((prev) => [comment, ...prev])
    }

    const changeComment = async (updated: StockComment) => {
        setComments((prev) =>
            prev
                .map((c) => (c.id === updated.id ? updated : c))
                .sort(
                    (a, b) =>
                        new Date(b.created || "").getTime() - new Date(a.created || "").getTime()
                )
        )
    }

    const removeComment = async (id: number) => {
        setComments((prev) => prev.filter((c) => c.id !== id))
    }

    const startEdit = (comment: StockComment) => {
        setEditingId(comment.id)
        setTitle(comment.title)
        setContent(comment.content)
        setRating(comment.rating)
        setError("")
    }

    const deleteComment = async (id: number) => {
        try {
            await deleteCommentApi(ticker, id)
            await removeComment(id)
            if (editingId === id) {
                clearForm()
            }
        } catch (err) {
            console.error(err)
            showToast("Unable to delete comment. Please try again.", "error", 5000, "Delete Failed")
        }
    }

    const submitComment = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError("")

        if (!userHasName) {
            showToast(
                "Please update your profile with your full name to post comments.",
                "error",
                5000,
                "Profile Required"
            )
            return
        }

        const cleanTitle = title.trim()
        const cleanContent = content.trim()

        if (!cleanTitle || !cleanContent) {
            setError("Please enter both title and content.")
            return
        }

        const commentRating: Rating = rating

        if (editingId) {
            try {
                const updatedComment = await updateComment(ticker, editingId, {
                    title: cleanTitle,
                    content: cleanContent,
                    rating: commentRating,
                })
                await changeComment(updatedComment)
                clearForm()
            } catch (err) {
                console.error(err)
                showToast(
                    "Unable to update comment. Please try again.",
                    "error",
                    5000,
                    "Save Failed"
                )
            }
            return
        }

        try {
            const newComment = await createComment(ticker, {
                title: cleanTitle,
                content: cleanContent,
                rating: commentRating,
            })
            await addComment(newComment)
            clearForm()
        } catch (err) {
            console.error(err)
            showToast("Unable to post comment. Please try again.", "error", 5000, "Post Failed")
        }
    }

    return (
        <section className="rounded-2xl border border-subtle bg-surface p-5 shadow-soft dark:border-zinc-700 dark:bg-surface">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-strong">
                    {ticker.toUpperCase()} Comments
                </h3>
                <span className="text-sm text-muted">
                    {commentCount} comment{commentCount === 1 ? "" : "s"}
                </span>
            </div>

            <StockCommentForm
                userHasName={!!userHasName}
                authorName={authorName}
                title={title}
                setTitle={setTitle}
                content={content}
                setContent={setContent}
                rating={rating}
                setRating={setRating}
                error={error}
                editingId={editingId}
                onSubmit={submitComment}
                onCancel={clearForm}
            />

            <div className="mt-5 divide-y divide-slate-200 dark:divide-zinc-700">
                {comments.length === 0 ? (
                    <p className="py-4 text-sm text-muted">
                        No comments yet. Be the first to share your view.
                    </p>
                ) : (
                    comments.map((comment) => (
                        <article
                            key={comment.id}
                            className={`py-4 ${editingId === comment.id ? "bg-surface-soft rounded-xl p-3 dark:bg-surface-soft" : ""}`}
                        >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <div className="flex items-center gap-3">
                                    <span className="rounded-full bg-surface-soft px-2 py-1 text-xs font-semibold text-strong dark:bg-surface-soft dark:text-strong">
                                        Rating: {comment.rating}/5
                                    </span>
                                    <span className="text-xs text-muted">
                                        {comment.created
                                            ? new Date(comment.created).toLocaleString()
                                            : "Unknown"}
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => startEdit(comment)}
                                        className="rounded-md border border-subtle px-2 py-1 text-xs font-semibold text-primary transition hover:bg-primary/10 dark:border-zinc-600 dark:hover:bg-primary/10"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => deleteComment(comment.id)}
                                        className="rounded-md border border-subtle px-2 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-100 dark:border-zinc-600 dark:text-red-300 dark:hover:bg-red-800/40"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <h4 className="mt-2 font-semibold text-strong">{comment.title}</h4>
                            <p className="mt-1 text-sm text-strong">{comment.content}</p>
                        </article>
                    ))
                )}
            </div>
        </section>
    )
}

export default StockCommentSection
