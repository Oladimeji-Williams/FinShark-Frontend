"use client"

import { StrictMode, useMemo } from "react"
import { RouterProvider } from "react-router-dom"
import { createAppRouter } from "@/Routes/Routes"

const ReactRouterApp = () => {
    const router = useMemo(
        () => createAppRouter(typeof window !== "undefined" ? "browser" : "memory"),
        []
    )

    return (
        <StrictMode>
            <RouterProvider router={router} />
        </StrictMode>
    )
}

export default ReactRouterApp
