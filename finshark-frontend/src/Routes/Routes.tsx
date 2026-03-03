import HomeClient from "@/Components/HomeClient";
import HomePage from "@/Views/HomePage/HomePage";
import SearchPage from "@/Views/SearchPage/SearchPage";
import CompanyPage from "@/Views/CompanyPage/CompanyPage";
import { createBrowserRouter, type RouteObject } from "react-router-dom";

export const appRoutes: RouteObject[] = [
    {
        path: "/",
        element: <HomeClient />,
        children: [
            {index: true, element: <HomePage />},
            {path: "home", element: <HomePage />},
            {path: "search", element: <SearchPage />},
            {path: "company/:ticker", element: <CompanyPage />},
            {path: "*", element: <HomePage />}
        ]
    },
];

export const createAppRouter = () => createBrowserRouter(appRoutes);
