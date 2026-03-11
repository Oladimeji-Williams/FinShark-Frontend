"use client"

import type { CompanySearch } from "@/company"
import { useCallback, useEffect, useState } from "react"
import { searchCompanies } from "@/lib/fmpClient"
import type { ChangeEvent, SubmitEvent } from "react"
import PortfolioList from "@/Components/Portfolio/PortfolioList/PortfolioList"
import Search from "@/Components/Search/Search"
import CardList from "@/Components/CardList/CardList"

const SearchPage = () => {
    const [search, setSearch] = useState<string>("")
    const [companies, setCompanies] = useState<CompanySearch[]>([])
    const [serverError, setServerError] = useState<string>("")
    const [portfolioValues, setPortfolioValues] = useState<string[]>([])

    const runSearch = useCallback(async (query: string) => {
        const result = await searchCompanies(query)
        if (typeof result === "string") {
            setServerError(result)
            setCompanies([])
        } else {
            setServerError("")
            setCompanies(result)
        }
    }, [])

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const nextValue = event.target.value
        setSearch(nextValue)
        if (!nextValue.trim()) {
            setServerError("")
            setCompanies([])
        }
    }

    const onSearchSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        const query = search.trim()
        if (!query) {
            setServerError("")
            setCompanies([])
            return
        }
        await runSearch(query)
    }

    const onPortfolioCreate = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const symbol = formData.get("symbol") as string | null
        if (!symbol) return
        if (portfolioValues.some((value) => value === symbol)) return
        setPortfolioValues((prev) => [...prev, symbol])
    }

    const onPortfolioDelete = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const symbol = formData.get("symbol") as string | null
        if (!symbol) return
        setPortfolioValues((prev) => prev.filter((value) => value !== symbol))
    }

    useEffect(() => {
        const query = search.trim()
        if (!query) return

        const debounce = setTimeout(() => {
            void runSearch(query)
        }, 300)

        return () => clearTimeout(debounce)
    }, [search, runSearch])

    return (
        <div className="w-full">
            <PortfolioList
                portfolioValues={portfolioValues}
                onPortfolioDelete={onPortfolioDelete}
            />
            <Search
                search={search}
                handleSearchChange={handleSearchChange}
                onSearchSubmit={onSearchSubmit}
            />
            {serverError && (
                <div className="error text-red-600 dark:text-red-400 m-4">{serverError}</div>
            )}
            <CardList companies={companies} onPortfolioCreate={onPortfolioCreate} />
        </div>
    )
}

export default SearchPage
