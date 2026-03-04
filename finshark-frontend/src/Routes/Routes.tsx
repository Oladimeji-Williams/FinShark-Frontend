import HomeClient from "@/Components/HomeClient";
import HomePage from "@/Views/HomePage/HomePage";
import SearchPage from "@/Views/SearchPage/SearchPage";
import CompanyPage from "@/Views/CompanyPage/CompanyPage";
import { createBrowserRouter, type RouteObject } from "react-router-dom";
import CompanyProfile from "@/Components/CompanyProfile/CompanyProfile";
import IncomeStatement from "@/Components/IncomeStatement/IncomeStatement";
import DesignGuideView from "@/Views/DesignGuideView/DesignGuideView";
import BalanceSheet from "@/Components/BalanceSheet/BalanceSheet";

export const appRoutes: RouteObject[] = [
    {
        path: "/",
        element: <HomeClient />,
        children: [
            {index: true, element: <HomePage />},
            {path: "home", element: <HomePage />},
            {path: "design-guide", element: <DesignGuideView />},
            {path: "search", element: <SearchPage />},
            {path: "company/:ticker", element: <CompanyPage />,
                children: [
                    {path: "company-profile", element: <CompanyProfile />},
                    {path: "income-statement", element: <IncomeStatement />},
                    {path: "balance-sheet", element: <BalanceSheet />}
                ]
            }
        ]
    },
];

export const createAppRouter = () => createBrowserRouter(appRoutes);
