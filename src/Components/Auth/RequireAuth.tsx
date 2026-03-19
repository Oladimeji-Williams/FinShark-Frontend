"use client"

import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "@/Components/Providers/AuthProvider"
import { ReactNode } from "react"

type RequireAuthProps = {
    children: ReactNode
}

const RequireAuth = ({ children }: RequireAuthProps) => {
    const { isAuthenticated } = useAuth()
    const location = useLocation()

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return <>{children}</>
}

export default RequireAuth
