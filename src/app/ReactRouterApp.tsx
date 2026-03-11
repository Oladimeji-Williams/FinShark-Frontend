"use client"

import { StrictMode } from "react"
import { useEffect, useMemo, useState } from "react"
import { RouterProvider } from "react-router-dom"
import { createAppRouter } from "@/Routes/Routes"

const ReactRouterApp = () => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const router = useMemo(() => {
        if (!mounted) return null
        return createAppRouter()
    }, [mounted])

    if (!router) return null

    return (
        <StrictMode>
            <RouterProvider router={router} />
        </StrictMode>
    )
}

export default ReactRouterApp
