import type { IconType } from "react-icons"
import { FaCheckCircle, FaColumns, FaLayerGroup, FaPalette, FaTable } from "react-icons/fa"
import type { CompanyKeyMetrics } from "@/company"
import DataTable from "@/Components/DataTable/DataTable"
import CollapsiblePanel from "@/Components/Layout/CollapsiblePanel"
import PageContainer from "@/Components/Layout/PageContainer"
import RatioList from "@/Components/RatioList/RatioList"
import type { RatioListConfig } from "@/Components/RatioList/RatioList"
import Table from "@/Components/Table/Table"
import type { TableConfig } from "@/Components/Table/Table"
import { testIncomeStatementData } from "@/Components/Table/testData"

const mockMetrics = {
    marketCapTTM: 2410929717248,
    currentRatioTTM: 0.88,
    roeTTM: 1.75,
    returnOnTangibleAssetsTTM: 0.24,
    freeCashFlowPerShareTTM: 6.11,
    bookValuePerShareTTM: 3.95,
    dividendYieldTTM: 0.0055,
    capexPerShareTTM: 0.75,
    grahamNumberTTM: 128.2,
    peRatioTTM: 29.8,
} as CompanyKeyMetrics

const ratioListConfig: RatioListConfig<CompanyKeyMetrics>[] = [
    {
        label: "Market Cap",
        render: (company: CompanyKeyMetrics) => formatLargeNonMonetaryNumber(company.marketCapTTM),
        subtitle: "Total value of all a company shares of stock.",
    },
    {
        label: "Current Ratio",
        render: (company: CompanyKeyMetrics) => formatRatio(company.currentRatioTTM),
        subtitle: "Measures how comfortably short-term obligations can be covered.",
    },
    {
        label: "Return On Equity",
        render: (company: CompanyKeyMetrics) => formatRatio(company.roeTTM),
        subtitle: "Shows how efficiently shareholder capital is converted into earnings.",
    },
    {
        label: "Return On Assets",
        render: (company: CompanyKeyMetrics) => formatRatio(company.returnOnTangibleAssetsTTM),
        subtitle: "Highlights how effectively the business uses its asset base.",
    },
    {
        label: "Free Cashflow Per Share",
        render: (company: CompanyKeyMetrics) => formatRatio(company.freeCashFlowPerShareTTM),
        subtitle: "Tracks cash generation on a per-share basis.",
    },
    {
        label: "Book Value Per Share TTM",
        render: (company: CompanyKeyMetrics) => formatRatio(company.bookValuePerShareTTM),
        subtitle: "Frames net asset value on a per-share basis.",
    },
    {
        label: "Dividend Yield TTM",
        render: (company: CompanyKeyMetrics) => formatRatio(company.dividendYieldTTM),
        subtitle: "Shows annual dividend return relative to the stock price.",
    },
    {
        label: "Capex Per Share TTM",
        render: (company: CompanyKeyMetrics) => formatRatio(company.capexPerShareTTM),
        subtitle: "Represents reinvestment intensity on a per-share basis.",
    },
    {
        label: "Graham Number",
        render: (company: CompanyKeyMetrics) => formatRatio(company.grahamNumberTTM),
        subtitle: "A classic defensive-investor valuation reference point.",
    },
    {
        label: "PE Ratio",
        render: (company: CompanyKeyMetrics) => formatRatio(company.peRatioTTM),
        subtitle: "A simple earnings-based valuation multiple for quick comparisons.",
    },
]

const incomeStatementTableConfig: TableConfig<(typeof testIncomeStatementData)[number]>[] = [
    {
        key: "date",
        label: "Date",
        render: (company: (typeof testIncomeStatementData)[number]) => company.date,
    },
    {
        key: "revenue",
        label: "Revenue",
        render: (company: (typeof testIncomeStatementData)[number]) =>
            formatLargeNonMonetaryNumber(company.revenue),
    },
    {
        key: "costOfRevenue",
        label: "Cost Of Revenue",
        render: (company: (typeof testIncomeStatementData)[number]) =>
            formatLargeNonMonetaryNumber(company.costOfRevenue),
    },
]

const foundationCards: Array<{
    title: string
    description: string
    icon: IconType
}> = [
    {
        title: "Clear hierarchy",
        description:
            "Big decisions should land in seconds, so titles, metrics, and supporting copy need distinct visual weight.",
        icon: FaLayerGroup,
    },
    {
        title: "Structured density",
        description:
            "Financial pages can be information-rich without feeling crowded when spacing and grouping stay disciplined.",
        icon: FaColumns,
    },
    {
        title: "Table readability",
        description:
            "Tables must stay calm under pressure with stronger headers, softer row separation, and predictable actions.",
        icon: FaTable,
    },
]

const colorTokens = [
    {
        label: "Surface",
        value: "Main elevated shell",
        swatchClassName: "bg-surface",
    },
    {
        label: "Accent",
        value: "Light green highlight",
        swatchClassName: "bg-[var(--color-light-green)]",
    },
    {
        label: "Ink",
        value: "High-contrast text",
        swatchClassName: "bg-text-strong",
    },
    {
        label: "Data Neutral",
        value: "Muted support tones",
        swatchClassName: "bg-surface-soft",
    },
]

const releaseChecks = [
    "Match the premium shells used on company and search surfaces.",
    "Keep ratio lists and tables readable in both light and dark themes.",
    "Use the page as a live preview area before applying patterns product-wide.",
]

const DesignGuideView = () => {
    return (
        <PageContainer className="space-y-8 pb-16">
            <section className="relative overflow-hidden rounded-[2.5rem] border border-subtle bg-surface shadow-soft backdrop-blur-xl">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.14),transparent_28%)]" />
                <div className="relative grid gap-8 p-6 sm:p-8 xl:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)]">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
                            Design Guide
                        </p>
                        <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-strong sm:text-5xl">
                            FinShark interface system for data-heavy product surfaces.
                        </h1>
                        <p className="mt-5 max-w-3xl text-sm leading-7 text-muted sm:text-base">
                            This page is now a proper internal showcase for table patterns,
                            financial ratio stacks, spacing rules, and the visual language we want
                            across the product.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <span className="inline-flex items-center rounded-full bg-surface-soft px-4 py-2 text-sm font-semibold text-muted">
                                Premium glass shells
                            </span>
                            <span className="inline-flex items-center rounded-full bg-surface-soft px-4 py-2 text-sm font-semibold text-muted">
                                Clear data hierarchy
                            </span>
                            <span className="inline-flex items-center rounded-full bg-surface-soft px-4 py-2 text-sm font-semibold text-muted">
                                Reusable UI previews
                            </span>
                        </div>
                    </div>

                    <aside className="rounded-[1.9rem] border border-subtle bg-surface p-6 text-strong shadow-soft">
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-light-green)]">
                            Current Focus
                        </p>
                        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-strong">
                            Stronger visual consistency across design, search, and company flows.
                        </h2>
                        <div className="mt-6 space-y-4">
                            {releaseChecks.map((item) => (
                                <div key={item} className="flex items-start gap-3">
                                    <span className="mt-0.5 text-[var(--color-light-green)]">
                                        <FaCheckCircle className="h-4 w-4" />
                                    </span>
                                    <p className="text-sm leading-6 text-strong/80">{item}</p>
                                </div>
                            ))}
                        </div>
                    </aside>
                </div>
            </section>

            <CollapsiblePanel
                collapseLabel="Wrap foundations"
                expandLabel="Unfold foundations"
                eyebrow="Foundations"
                title="Core design foundations"
                description="These are the base principles guiding how FinShark product surfaces should feel and scale."
            >
                <div className="grid gap-4 lg:grid-cols-3">
                    {foundationCards.map(({ title, description, icon: Icon }) => (
                        <article
                            key={title}
                            className="rounded-[1.8rem] border border-subtle bg-surface-soft p-6 shadow-sm"
                        >
                            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface text-strong shadow-sm">
                                <Icon className="h-5 w-5" />
                            </span>
                            <h2 className="mt-5 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
                                {title}
                            </h2>
                            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-zinc-300">
                                {description}
                            </p>
                        </article>
                    ))}
                </div>
            </CollapsiblePanel>

            <section className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                <CollapsiblePanel
                    collapseLabel="Wrap tokens"
                    expandLabel="Unfold tokens"
                    eyebrow="Palette"
                    title="Core visual tokens"
                    description="A compact reference for the main tones shaping the current product direction."
                >
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        {colorTokens.map(({ label, value, swatchClassName }) => (
                            <div
                                key={label}
                                className="rounded-[1.4rem] border border-subtle bg-surface-soft p-4"
                            >
                                <div className="flex items-center gap-3">
                                    <span
                                        className={`h-10 w-10 rounded-2xl border border-black/5 shadow-sm ${swatchClassName}`}
                                    />
                                    <div>
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
                                            {label}
                                        </p>
                                        <p className="mt-1 text-sm font-semibold text-strong">
                                            {value}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CollapsiblePanel>

                <CollapsiblePanel
                    collapseLabel="Wrap principles"
                    expandLabel="Unfold principles"
                    eyebrow="Principles"
                    title="What this page is validating"
                    description="Each preview below should feel close to production and easy to lift into a real feature."
                >
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        <GuidelineCard
                            icon={FaPalette}
                            title="Intentional styling"
                            description="Surfaces should share one visual family instead of feeling like separate prototypes."
                        />
                        <GuidelineCard
                            icon={FaColumns}
                            title="Balanced density"
                            description="Dense financial data still needs breathing room, alignment, and predictable grouping."
                        />
                        <GuidelineCard
                            icon={FaLayerGroup}
                            title="Component reuse"
                            description="Cards, lists, and tables should be ready to reuse without redesigning them every time."
                        />
                        <GuidelineCard
                            icon={FaTable}
                            title="Preview-first workflow"
                            description="This guide should be useful for testing component polish before rollout."
                        />
                    </div>
                </CollapsiblePanel>
            </section>

            <CollapsiblePanel
                collapseLabel="Wrap preview gallery"
                expandLabel="Unfold preview gallery"
                eyebrow="Components"
                title="Live preview gallery"
                description="These examples mirror the type of finance UI patterns the main product depends on."
            >
                <div className="grid gap-6 2xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                    <div className="space-y-4">
                        <PreviewIntro
                            title="Ratio stack"
                            description="A compact pattern for key metrics that needs to stay readable across long financial descriptions."
                        />
                        <RatioList data={mockMetrics} config={ratioListConfig} />
                    </div>
                    <div className="space-y-4">
                        <PreviewIntro
                            title="Interactive data table"
                            description="A sortable table shell for quick comparisons and lightweight drill-down workflows."
                        />
                        <DataTable />
                    </div>
                </div>
            </CollapsiblePanel>

            <CollapsiblePanel
                collapseLabel="Wrap statement preview"
                expandLabel="Unfold statement preview"
                eyebrow="Components"
                title="Financial statement table"
                description="A cleaner presentation for tabular statement data with stronger row rhythm and clearer header treatment."
            >
                <Table data={testIncomeStatementData} config={incomeStatementTableConfig} />
            </CollapsiblePanel>
        </PageContainer>
    )
}

export default DesignGuideView

type GuidelineCardProps = {
    icon: IconType
    title: string
    description: string
}

const GuidelineCard = ({ icon: Icon, title, description }: GuidelineCardProps) => {
    return (
        <div className="rounded-[1.4rem] border border-subtle bg-surface-soft p-4 shadow-sm">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-surface text-strong shadow-sm">
                <Icon className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-lg font-semibold tracking-tight text-strong">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
        </div>
    )
}

type PreviewIntroProps = {
    title: string
    description: string
}

const PreviewIntro = ({ title, description }: PreviewIntroProps) => {
    return (
        <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted">Preview</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-strong">{title}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">{description}</p>
        </div>
    )
}

function formatLargeNonMonetaryNumber(marketCapTTM?: number) {
    if (typeof marketCapTTM !== "number" || !Number.isFinite(marketCapTTM)) return "N/A"
    if (marketCapTTM >= 1_000_000_000_000)
        return `${(marketCapTTM / 1_000_000_000_000).toFixed(2)}T`
    if (marketCapTTM >= 1_000_000_000) return `${(marketCapTTM / 1_000_000_000).toFixed(2)}B`
    if (marketCapTTM >= 1_000_000) return `${(marketCapTTM / 1_000_000).toFixed(2)}M`
    return marketCapTTM.toLocaleString()
}

function formatRatio(value: number) {
    return Number.isFinite(value) ? value.toFixed(2) : "N/A"
}
