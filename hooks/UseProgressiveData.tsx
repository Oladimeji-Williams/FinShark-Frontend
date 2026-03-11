"use client"

import { useEffect, useState } from "react"

type UseProgressiveDataOptions<T> = {
    loader: () => Promise<T[]>
    chunkSize?: number
    chunkDelayMs?: number
    enabled?: boolean
}

export function UseProgressiveData<T>({
    loader,
    chunkSize = 200,
    chunkDelayMs = 0,
    enabled = true,
}: UseProgressiveDataOptions<T>) {
    const [data, setData] = useState<T[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string>("")
    const [total, setTotal] = useState(0)

    useEffect(() => {
        let cancelled = false
        let timerId: ReturnType<typeof setTimeout> | null = null

        async function load() {
            if (!enabled) {
                setData([])
                setLoading(false)
                setError("")
                setTotal(0)
                return
            }

            setData([])
            setLoading(true)
            setError("")
            setTotal(0)

            try {
                const fullData = await loader()
                if (cancelled) return
                setTotal(fullData.length)

                let index = 0

                const loadChunk = () => {
                    if (cancelled) return

                    const nextChunk = fullData.slice(index, index + chunkSize)
                    setData((prev) => [...prev, ...nextChunk])
                    index += chunkSize

                    if (index < fullData.length) {
                        timerId = setTimeout(loadChunk, chunkDelayMs)
                        return
                    }

                    setLoading(false)
                }

                if (fullData.length === 0) {
                    setLoading(false)
                    return
                }

                loadChunk()
            } catch (err) {
                if (cancelled) return
                setError(err instanceof Error ? err.message : "Failed to load data")
                setLoading(false)
            }
        }

        void load()

        return () => {
            cancelled = true
            if (timerId) clearTimeout(timerId)
        }
    }, [loader, chunkSize, chunkDelayMs, enabled])

    return { data, loading, error, total }
}

export const useProgressiveData = UseProgressiveData
