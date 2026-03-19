import HomeClient from "@/Components/HomeClient"
import HomePage from "@/Views/HomePage/HomePage"
import SearchPage from "@/Views/SearchPage/SearchPage"
import CompanyPage from "@/Views/CompanyPage/CompanyPage"
import {
    createBrowserRouter,
    createMemoryRouter,
    Navigate,
    type RouteObject,
} from "react-router-dom"
import CompanyProfile from "@/Components/CompanyProfile/CompanyProfile"
import IncomeStatement from "@/Components/IncomeStatement/IncomeStatement"
import DesignGuideView from "@/Views/DesignGuideView/DesignGuideView"
import BalanceSheet from "@/Components/BalanceSheet/BalanceSheet"
import CashflowStatement from "@/Components/CashflowStatement/CashflowStatement"
import Login from "@/Components/Auth/Login"
import Register from "@/Components/Auth/Register"
import RequireAuth from "@/Components/Auth/RequireAuth"

export const appRoutes: RouteObject[] = [
    {
        path: "/",
        element: <HomeClient />,
        children: [
            { index: true, element: <HomePage /> },
            {
                path: "home",
                element: (
                    <RequireAuth>
                        <Navigate to="/" replace />
                    </RequireAuth>
                ),
            },
            {
                path: "design-guide",
                element: (
                    <RequireAuth>
                        <DesignGuideView />
                    </RequireAuth>
                ),
            },
            {
                path: "search",
                element: (
                    <RequireAuth>
                        <SearchPage />
                    </RequireAuth>
                ),
            },
            {
                path: "company/:ticker",
                element: (
                    <RequireAuth>
                        <CompanyPage />
                    </RequireAuth>
                ),
                children: [
                    { path: "company-profile", element: <CompanyProfile /> },
                    { path: "income-statement", element: <IncomeStatement /> },
                    { path: "balance-sheet", element: <BalanceSheet /> },
                    { path: "cashflow-statement", element: <CashflowStatement /> },
                ],
            },
        ],
    },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
]

export const createAppRouter = (routerType: "browser" | "memory" = "browser") => {
    if (routerType === "browser" && typeof window !== "undefined") {
        return createBrowserRouter(appRoutes)
    }
    return createMemoryRouter(appRoutes, { initialEntries: ["/"] })
}
