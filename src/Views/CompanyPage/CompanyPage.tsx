"use client"

import Image from "next/image"
import type { IconType } from "react-icons"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { CompanyProfile } from "@/company"
import { getCompanyProfile, getDiscountedCashFlow, getHistoricalDividends } from "@/lib/fmpApi"
import {
    FaArrowDown,
    FaArrowUp,
    FaBuilding,
    FaCalendarAlt,
    FaChartBar,
    FaDollarSign,
    FaExternalLinkAlt,
    FaGem,
    FaGift,
    FaGlobe,
    FaHistory,
    FaIndustry,
    FaMapMarkerAlt,
    FaUsers,
    FaUserTie,
} from "react-icons/fa"
import Sidebar from "@/Components/Sidebar/Sidebar"
import CompanyDashboard from "@/Components/CompanyDashboard/CompanyDashboard"
import Tile from "@/Components/Tile/Tile"
import Spinner from "@/Components/Spinner/Spinner"
import ComparisonFinder from "@/Components/ComparisonFinder/ComparisonFinder"
import CollapsiblePanel from "@/Components/Layout/CollapsiblePanel"
import PageContainer from "@/Components/Layout/PageContainer"
import StockCommentSection from "@/Components/Comments/StockComment"
import {
    formatCurrencyCompact,
    formatLargeMonetaryNumber,
    formatLargeNonMonetaryNumber,
} from "@/Helpers/NumberFormatting"

type InfoItem = {
    label: string
    value: string
    icon: IconType
}

const formatPrice = (value: number) =>
    Number.isFinite(value)
        ? new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
          }).format(value)
        : "N/A"

const formatPercent = (value: number) => {
    if (!Number.isFinite(value)) return "N/A"
    const sign = value > 0 ? "+" : ""
    return `${sign}${value.toFixed(2)}%`
}

const formatChange = (value: number) => {
    if (!Number.isFinite(value)) return "N/A"
    const sign = value > 0 ? "+" : ""
    return `${sign}${formatPrice(value)}`
}

const formatWebsite = (website: string) => {
    if (!website) return ""
    return website.startsWith("http://") || website.startsWith("https://")
        ? website
        : `https://${website}`
}

const getInitials = (name: string) =>
    name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? "")
        .join("")

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

    if (serverError && !company) {
        return (
            <PageContainer className="pb-16">
                <div className="mx-auto w-full max-w-3xl rounded-[2rem] border border-red-200/80 bg-red-50/80 p-6 text-red-700 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red-700">
                        Company Lookup
                    </p>
                    <h1 className="mt-3 text-2xl font-semibold text-strong">
                        We couldn&apos;t load this company.
                    </h1>
                    <p className="mt-3 text-sm leading-6 text-muted">{serverError}</p>
                </div>
            </PageContainer>
        )
    }

    if (!company) {
        return (
            <PageContainer className="pb-16">
                <div className="flex min-h-[60vh] items-center justify-center">
                    <Spinner />
                </div>
            </PageContainer>
        )
    }

    const websiteUrl = formatWebsite(company.website)
    const location = [company.city, company.state, company.country].filter(Boolean).join(", ")
    const dailyDirectionPositive = Number.isFinite(company.changePercentage)
        ? company.changePercentage >= 0
        : null
    const brandInitials = getInitials(company.companyName || ticker || "FS")
    const badges = [
        company.symbol,
        company.exchangeShortName || company.exchange,
        company.sector,
        company.industry,
    ].filter(Boolean)

    const overviewItems: InfoItem[] = [
        {
            label: "Chief Executive",
            value: company.ceo || "N/A",
            icon: FaUserTie,
        },
        {
            label: "Headquarters",
            value: location || "N/A",
            icon: FaMapMarkerAlt,
        },
        {
            label: "Employees",
            value: company.fullTimeEmployees || "N/A",
            icon: FaUsers,
        },
        {
            label: "IPO Date",
            value: company.ipoDate || "N/A",
            icon: FaCalendarAlt,
        },
    ]

    const identityItems: InfoItem[] = [
        {
            label: "Exchange",
            value: company.exchangeFullName || company.exchange || "N/A",
            icon: FaChartBar,
        },
        {
            label: "Currency",
            value: company.currency || "USD",
            icon: FaDollarSign,
        },
        {
            label: "Industry",
            value: company.industry || "N/A",
            icon: FaIndustry,
        },
        {
            label: "Website",
            value: company.website || "N/A",
            icon: FaGlobe,
        },
    ]

    return (
        <PageContainer className="pb-16">
            <div className="grid gap-6 xl:grid-cols-[16rem_minmax(0,1fr)] xl:items-start">
                <div className="xl:sticky xl:top-6 xl:h-[calc(100vh-3rem)]">
                    <Sidebar />
                </div>
                <CompanyDashboard ticker={ticker!}>
                    <section className="relative overflow-hidden rounded-[2.25rem] border border-subtle bg-surface shadow-soft backdrop-blur-xl">
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.14),transparent_28%)]" />
                        <div className="relative grid gap-8 p-6 sm:p-8 xl:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)]">
                            <div>
                                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                                    <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-[1.6rem] bg-[var(--foreground)] text-2xl font-semibold tracking-[0.18em] text-[var(--surface)] shadow-soft">
                                        {company.image && !company.defaultImage ? (
                                            <Image
                                                src={company.image}
                                                alt={`${company.companyName} logo`}
                                                fill
                                                sizes="80px"
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            brandInitials
                                        )}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--muted-foreground)]">
                                            Company Overview
                                        </p>
                                        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--text-strong)] sm:text-4xl">
                                            {company.companyName || ticker}
                                        </h1>
                                        <p className="mt-2 text-lg font-medium text-[var(--text-muted)]">
                                            {company.symbol}
                                        </p>
                                        <div className="mt-5 flex flex-wrap gap-2">
                                            {badges.map((badge) => (
                                                <span
                                                    key={badge}
                                                    className="inline-flex items-center rounded-full bg-surface-soft px-3 py-1 text-xs font-semibold tracking-[0.18em] text-[var(--text-muted)] uppercase"
                                                >
                                                    {badge}
                                                </span>
                                            ))}
                                            <span
                                                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-[0.18em] uppercase ${
                                                    company.isActivelyTrading
                                                        ? "bg-[var(--primary)]/20 text-[var(--primary)]"
                                                        : "bg-surface-soft text-[var(--text-muted)]"
                                                }`}
                                            >
                                                {company.isActivelyTrading ? "Active" : "Inactive"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <p className="mt-8 max-w-4xl text-sm leading-7 text-[var(--text-muted)] sm:text-base">
                                    {company.description || "No company description available."}
                                </p>
                                <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                                    {overviewItems.map(({ label, value, icon: Icon }) => (
                                        <div
                                            key={label}
                                            className="rounded-[1.5rem] border border-subtle bg-surface-soft p-4 shadow-sm"
                                        >
                                            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-surface text-[var(--foreground)]">
                                                <Icon className="h-4 w-4" />
                                            </span>
                                            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--muted-foreground)]">
                                                {label}
                                            </p>
                                            <p className="mt-2 text-sm font-semibold leading-6 text-[var(--text-strong)]">
                                                {value}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <aside className="rounded-[1.9rem] bg-surface p-6 text-[var(--text-strong)] shadow-soft">
                                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--primary)]">
                                    Market Snapshot
                                </p>
                                <p className="mt-4 text-4xl font-semibold tracking-tight text-[var(--text-strong)]">
                                    {formatPrice(company.price)}
                                </p>
                                <div
                                    className={`mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                                        dailyDirectionPositive === null
                                            ? "bg-surface-soft text-muted"
                                            : dailyDirectionPositive
                                              ? "bg-[var(--primary)]/20 text-[var(--primary)]"
                                              : "bg-red-500/15 text-red-500"
                                    }`}
                                >
                                    {dailyDirectionPositive ===
                                    null ? null : dailyDirectionPositive ? (
                                        <FaArrowUp className="h-3.5 w-3.5" />
                                    ) : (
                                        <FaArrowDown className="h-3.5 w-3.5" />
                                    )}
                                    <span>
                                        {formatChange(company.change)} (
                                        {formatPercent(company.changePercentage)})
                                    </span>
                                </div>
                                <div className="mt-8 space-y-4 rounded-xl border border-subtle p-3">
                                    <div className="flex items-center justify-between border-b border-subtle pb-3 text-sm">
                                        <span className="text-[var(--muted-foreground)]">
                                            52W Range
                                        </span>
                                        <span className="font-semibold text-[var(--text-strong)]">
                                            {company.range || "N/A"}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between border-b border-subtle pb-3 text-sm">
                                        <span className="text-[var(--muted-foreground)]">
                                            Market Cap
                                        </span>
                                        <span className="font-semibold text-[var(--text-strong)]">
                                            {formatLargeMonetaryNumber(company.marketCap)}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between border-b border-subtle pb-3 text-sm">
                                        <span className="text-[var(--muted-foreground)]">
                                            Average Volume
                                        </span>
                                        <span className="font-semibold text-[var(--text-strong)]">
                                            {formatLargeNonMonetaryNumber(
                                                company.averageVolume || company.volAvg || 0
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-[var(--muted-foreground)]">
                                            Last Dividend
                                        </span>
                                        <span className="font-semibold text-[var(--text-strong)]">
                                            {Number.isFinite(company.lastDividend)
                                                ? formatPrice(company.lastDividend)
                                                : "N/A"}
                                        </span>
                                    </div>
                                </div>
                                {websiteUrl ? (
                                    <a
                                        href={websiteUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[var(--surface)] px-4 py-3 text-sm font-semibold text-[var(--text-strong)] transition hover:bg-[var(--primary)] hover:text-white"
                                    >
                                        Visit website
                                        <FaExternalLinkAlt className="h-3.5 w-3.5" />
                                    </a>
                                ) : null}
                            </aside>
                        </div>
                    </section>

                    <CollapsiblePanel
                        collapseLabel="Wrap quick read"
                        expandLabel="Unfold quick read"
                        eyebrow="Quick Read"
                        title="Key Company Numbers"
                        description="A concise overview of the metrics most likely to anchor your first read of the business."
                    >
                        <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
                            <Tile
                                title="Company Name"
                                subtitle={company.companyName || "N/A"}
                                icon={FaBuilding}
                            />
                            <Tile
                                title="Price"
                                subtitle={formatPrice(company.price)}
                                icon={FaDollarSign}
                            />
                            <Tile
                                title="Sector"
                                subtitle={company.sector || "N/A"}
                                icon={FaIndustry}
                            />
                            <Tile
                                title="Market Cap"
                                subtitle={formatLargeMonetaryNumber(company.marketCap)}
                                icon={FaChartBar}
                            />
                            <Tile
                                title="Last Dividend"
                                subtitle={
                                    Number.isFinite(company.lastDividend)
                                        ? formatPrice(company.lastDividend)
                                        : "N/A"
                                }
                                icon={FaGift}
                            />
                            <Tile
                                title="Historical Dividend"
                                subtitle={
                                    Number.isFinite(historicalDividend)
                                        ? formatPrice(historicalDividend as number)
                                        : "N/A"
                                }
                                icon={FaHistory}
                            />
                            <Tile
                                title="Discounted Cashflow"
                                subtitle={
                                    Number.isFinite(company.dcf)
                                        ? formatCurrencyCompact(company.dcf as number)
                                        : "N/A"
                                }
                                icon={FaGem}
                            />
                            <Tile
                                title="Industry"
                                subtitle={company.industry || "N/A"}
                                icon={FaIndustry}
                            />
                        </div>
                    </CollapsiblePanel>

                    <section className="grid gap-6 2xl:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]">
                        <CollapsiblePanel
                            collapseLabel="Wrap research context"
                            expandLabel="Unfold research context"
                            eyebrow="Business Overview"
                            title="Research Context"
                        >
                            <div className="space-y-6">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {identityItems.map(({ label, value, icon: Icon }) => (
                                        <div
                                            key={label}
                                            className="rounded-[1.4rem] border border-subtle bg-surface-soft p-4"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-surface text-[var(--foreground)] shadow-sm">
                                                    <Icon className="h-4 w-4" />
                                                </span>
                                                <div className="min-w-0">
                                                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted-foreground)]">
                                                        {label}
                                                    </p>
                                                    <p className="mt-1 truncate text-sm font-semibold text-[var(--text-strong)]">
                                                        {value}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CollapsiblePanel>

                        <div className="space-y-6">
                            <CollapsiblePanel
                                collapseLabel="Wrap peer group"
                                expandLabel="Unfold peer group"
                                eyebrow="Relative View"
                                title="Peer Group"
                                description="Jump sideways into nearby companies and keep the comparison flow fast."
                            >
                                <ComparisonFinder ticker={ticker!} />
                            </CollapsiblePanel>

                            <CollapsiblePanel
                                collapseLabel="Wrap identity snapshot"
                                expandLabel="Unfold identity snapshot"
                                eyebrow="Profile"
                                title="Identity Snapshot"
                            >
                                <div className="grid gap-4">
                                    <div className="flex items-start gap-3">
                                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-light-green)] text-white">
                                            <FaBuilding className="h-4 w-4" />
                                        </span>
                                        <div>
                                            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
                                                Symbol
                                            </p>
                                            <p className="mt-1 text-sm font-semibold text-strong">
                                                {company.symbol}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-surface text-[var(--foreground)]">
                                            <FaGlobe className="h-4 w-4" />
                                        </span>
                                        <div>
                                            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted-foreground)]">
                                                Address
                                            </p>
                                            <p className="mt-1 text-sm leading-6 text-[var(--text-strong)]">
                                                {[company.address, location]
                                                    .filter(Boolean)
                                                    .join(", ") || "N/A"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CollapsiblePanel>
                        </div>
                    </section>

                    <section className="mt-8">
                        <StockCommentSection ticker={ticker ?? ""} />
                    </section>
                </CompanyDashboard>
            </div>
        </PageContainer>
    )
}

export default CompanyPage
