"use client"

import Image from "next/image"
import { ReactNode } from "react"
import { Link } from "react-router-dom"
import { FaChartLine, FaMoon, FaSearchDollar } from "react-icons/fa"
import { ThemeToggle } from "@/Components/ThemeToggle/ThemeToggle"
import logo from "../../assets/logo.png"

type AuthShellProps = {
    eyebrow: string
    title: string
    description: string
    footerPrompt: string
    footerActionLabel: string
    footerActionTo: string
    children: ReactNode
    
}

const highlights = [
    {
        title: "Search with context",
        description: "Move from symbol lookup to filings and peer discovery.",
        icon: FaSearchDollar,
    },
    {
        title: "Built for focus",
        description: "Cleaner hierarchy, dark mode, less noise.",
        icon: FaMoon,
    },
    {
        title: "Stay conviction-led",
        description: "Compare companies and make decisions from numbers.",
        icon: FaChartLine,
    },
]


const AuthShell = ({
    eyebrow,
    title,
    description,
    footerPrompt,
    footerActionLabel,
    footerActionTo,
    children,
}: AuthShellProps) => {
    return (
        <div className="mx-auto w-full max-w-6xl">
            <div className="rounded-[2rem] border border-subtle bg-surface shadow-soft">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -left-24 top-10 h-52 w-52 rounded-full bg-[var(--color-light-green)]/18 blur-3xl" />
                    <div className="absolute bottom-0 right-0 h-60 w-60 rounded-full bg-[var(--color-light-blue)]/14 blur-3xl" />
                </div>
                <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
                    <aside className="relative overflow-hidden bg-surface text-strong dark:bg-slate-900 dark:text-white px-7 py-9 sm:px-10 sm:py-12">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.12),transparent_50%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.08),transparent_40%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.2),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.2),transparent_40%)]" />
                        <div className="relative">
                            <Link
                                to="/"
                                className="inline-flex items-center gap-3 rounded-full border border-slate-300 bg-white/90 px-4 py-2 text-sm font-medium text-slate-900 backdrop-blur dark:border-white/15 dark:bg-white/10 dark:text-white"
                            >
                                <Image
                                    src={logo}
                                    alt="FinShark logo"
                                    className="h-8 w-auto"
                                    priority
                                />
                            </Link>
                            <p className="mt-10 text-xs font-semibold tracking-[0.28em] text-emerald-700 uppercase dark:text-emerald-200">
                                Research Workspace
                            </p>
                            <h1 className="mt-4 max-w-xl text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl dark:text-white">
                                Build confidence from the numbers, not the noise.
                            </h1>
                            <p className="mt-5 max-w-xl text-base leading-7 text-slate-700 sm:text-lg dark:text-slate-200">
                                FinShark keeps the journey from search to analysis clear, fast, and
                                readable so you can focus on conviction.
                            </p>
                            <div className="mt-10 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 ">
                                {highlights.map(
                                    ({
                                        title: itemTitle,
                                        description: itemDescription,
                                        icon: Icon,
                                    }) => (
                                        <div
                                            key={itemTitle}
                                            className="rounded-xl border border-subtle bg-surface-soft p-4"
                                        >
                                            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--primary)] text-[var(--foreground)]">
                                                <Icon className="h-5 w-5" />
                                            </span>
                                            <h2 className="mt-4 font-semibold text-strong">
                                                {itemTitle}
                                            </h2>
                                            <p className="mt-2 text-sm text-muted">
                                                {itemDescription}
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </aside>
                    <section className="relative px-6 py-8 sm:px-10 sm:py-10 lg:px-12 flex flex-col h-screen overflow-auto">
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.7),rgba(255,255,255,0.5))] dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.6),rgba(15,23,42,0.3))] pointer-events-none" />
                        <div className="relative">
                            <div className="mx-auto w-full max-w-md">
                                <div className="flex justify-end">
                                    <ThemeToggle />
                                </div>
                                <p className="inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-[0.26em] text-slate-500 uppercase bg-[var(--surface-soft)]">
                                    {eyebrow}
                                </p>
                                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-strong sm:text-4xl">
                                    {title}
                                </h2>
                                <p className="mt-3 text-base leading-7 text-muted">{description}</p>
                                <div className="mt-8">{children}</div>
                                <p className="mt-8 text-sm text-muted">
                                    {footerPrompt}{" "}
                                    <Link
                                        to={footerActionTo}
                                        className="font-semibold text-[color:var(--primary)] underline decoration-primary/35 underline-offset-4 transition hover:text-primary-hover"
                                    >
                                        {footerActionLabel}
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default AuthShell
