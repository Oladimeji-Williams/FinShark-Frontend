"use client"

import { CompanyProfile } from "@/company"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCompanyProfile, getDiscountedCashFlow, getHistoricalDividends } from "@/lib/fmpClient"
import {
    FaBuilding,
    FaDollarSign,
    FaIndustry,
    FaChartBar,
    FaGift,
    FaGem,
    FaHistory,
} from "react-icons/fa"
import Sidebar from "@/Components/Sidebar/Sidebar"
import CompanyDashboard from "@/Components/CompanyDashboard/CompanyDashboard"
import Tile from "@/Components/Tile/Tile"
import Spinner from "@/Components/Spinner/Spinner"
import ComparisonFinder from "@/Components/ComparisonFinder/ComparisonFinder"
import { formatCurrencyCompact, formatLargeMonetaryNumber } from "@/Helpers/NumberFormatting"

const CompanyPage = () => {
    const { ticker } = useParams()
    const [company, setCompany] = useState<CompanyProfile>()
    const [historicalDividend, setHistoricalDividend] = useState<number | undefined>()
    const [serverError, setServerError] = useState<string>("")

    useEffect(() => {
        const fetchCompanyProfile = async () => {
            if (!ticker) return
            const response = await getCompanyProfile(ticker)
            if (typeof response === "string") {
                setServerError(response)
                setCompany(undefined)
            } else if (!response) {
                setServerError(`No profile data available for ${ticker}.`)
                setCompany(undefined)
            } else {
                let resolvedDcf = Number.isFinite(response.dcf) ? response.dcf : undefined

                if (!Number.isFinite(resolvedDcf)) {
                    const dcfResponse = await getDiscountedCashFlow(ticker)
                    if (typeof dcfResponse !== "string" && Number.isFinite(dcfResponse)) {
                        resolvedDcf = dcfResponse
                    }
                }

                // Fetch historical dividends
                const dividendResponse = await getHistoricalDividends(ticker)
                if (
                    typeof dividendResponse !== "string" &&
                    dividendResponse?.historical?.length > 0
                ) {
                    setHistoricalDividend(dividendResponse.historical[0].dividend)
                } else {
                    setHistoricalDividend(undefined)
                }

                setServerError("")
                setCompany({ ...response, dcf: resolvedDcf })
            }
        }
        void fetchCompanyProfile()
    }, [ticker])

    return (
        <div>
            {serverError && <p>{serverError}</p>}
            {company ? (
                <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
                    <Sidebar />
                    <CompanyDashboard ticker={ticker!}>
                        <Tile
                            title={"Company Name"}
                            subtitle={company.companyName || "N/A"}
                            icon={FaBuilding}
                        />
                        <Tile
                            title={"Price"}
                            subtitle={
                                Number.isFinite(company.price)
                                    ? `$${company.price.toFixed(2)}`
                                    : "N/A"
                            }
                            icon={FaDollarSign}
                        />
                        <Tile
                            title={"Sector"}
                            subtitle={company.sector || "N/A"}
                            icon={FaIndustry}
                        />
                        <Tile
                            title={"Market Cap"}
                            subtitle={
                                Number.isFinite(company.marketCap)
                                    ? formatLargeMonetaryNumber(company.marketCap)
                                    : "N/A"
                            }
                            icon={FaChartBar}
                        />
                        <Tile
                            title={"Last Dividend"}
                            subtitle={
                                Number.isFinite(company.lastDividend)
                                    ? `$${company.lastDividend.toFixed(2)}`
                                    : "N/A"
                            }
                            icon={FaGift}
                        />
                        <Tile
                            title={"Historical Dividend"}
                            subtitle={
                                Number.isFinite(historicalDividend)
                                    ? `$${historicalDividend.toFixed(2)}`
                                    : "N/A"
                            }
                            icon={FaHistory}
                        />
                        <Tile
                            title={"Discounted Cashflow"}
                            subtitle={
                                Number.isFinite(company.dcf)
                                    ? formatCurrencyCompact(company.dcf as number)
                                    : "N/A"
                            }
                            icon={FaGem}
                        />
                        <ComparisonFinder ticker={ticker!} />
                        <p className="bg-white dark:bg-gray-800 shadow rounded text-medium text-gray-900 dark:text-gray-100 p-3 mt-1 m-4 transition-colors text-justify">
                            {company.description}
                        </p>
                    </CompanyDashboard>
                </div>
            ) : (
                <Spinner />
            )}
        </div>
    )
}

export default CompanyPage
