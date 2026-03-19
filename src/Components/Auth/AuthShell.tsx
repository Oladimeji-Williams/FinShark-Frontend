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
        description: "Move from symbol lookup to filings and peer discovery without losing your place.",
        icon: FaSearchDollar,
    },
    {
        title: "Built for focus",
        description: "A calmer research flow with cleaner hierarchy, dark mode, and less noise.",
        icon: FaMoon,
    },
    {
        title: "Stay conviction-led",
        description: "Compare companies, inspect fundamentals, and make decisions from the numbers first.",
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
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.12)] dark:border-zinc-800 dark:bg-zinc-950">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -left-24 top-10 h-52 w-52 rounded-full bg-[var(--color-light-green)]/18 blur-3xl" />
                    <div className="absolute bottom-0 right-0 h-60 w-60 rounded-full bg-sky-500/14 blur-3xl" />
                </div>
                <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
                    <aside className="relative overflow-hidden bg-slate-950 px-7 py-9 text-white sm:px-10 sm:py-12">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.18),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.2),transparent_32%)]" />
                        <div className="relative">
                            <Link
                                to="/"
                                className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur"
                            >
                                <Image src={logo} alt="FinShark logo" className="h-8 w-auto" priority />
                            </Link>
                            <p className="mt-10 text-xs font-semibold tracking-[0.28em] text-emerald-300 uppercase">
                                Research Workspace
                            </p>
                            <h1 className="mt-4 max-w-xl text-4xl font-semibold leading-tight sm:text-5xl">
                                Build confidence from the numbers, not the noise.
                            </h1>
                            <p className="mt-5 max-w-xl text-base leading-7 text-white/78 sm:text-lg">
                                FinShark keeps the journey from search to analysis clear, fast, and readable so you can focus on conviction.
                            </p>
                            <div className="mt-10 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                                {highlights.map(({ title: itemTitle, description: itemDescription, icon: Icon }) => (
                                    <div
                                        key={itemTitle}
                                        className="rounded-[1.5rem] border border-white/12 bg-white/8 p-4 backdrop-blur-sm"
                                    >
                                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/12 text-emerald-200">
                                            <Icon className="h-5 w-5" />
                                        </span>
                                        <h2 className="mt-4 text-base font-semibold text-white">{itemTitle}</h2>
                                        <p className="mt-2 text-sm leading-6 text-white/78">
                                            {itemDescription}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                    <section className="relative px-6 py-8 sm:px-10 sm:py-10 lg:px-12">
                        <div className="mx-auto w-full max-w-md">
                            <div className="flex justify-end">
                                <ThemeToggle />
                            </div>
                            <p className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold tracking-[0.26em] text-slate-500 uppercase dark:bg-zinc-900 dark:text-zinc-400">
                                {eyebrow}
                            </p>
                            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                                {title}
                            </h2>
                            <p className="mt-3 text-base leading-7 text-slate-600 dark:text-zinc-300">
                                {description}
                            </p>
                            <div className="mt-8">{children}</div>
                            <p className="mt-8 text-sm text-slate-500 dark:text-zinc-400">
                                {footerPrompt}{" "}
                                <Link
                                    to={footerActionTo}
                                    className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 transition hover:text-[var(--color-dark-blue)] dark:text-white dark:decoration-zinc-700 dark:hover:text-[var(--color-light-green)]"
                                >
                                    {footerActionLabel}
                                </Link>
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default AuthShell
