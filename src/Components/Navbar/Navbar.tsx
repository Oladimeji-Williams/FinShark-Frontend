"use client"

import Image from "next/image"
import { Link, NavLink, useNavigate } from "react-router-dom"
import {
    FaHome,
    FaPalette,
    FaSearch,
    FaUserPlus,
    FaSignOutAlt,
    FaSignInAlt,
    FaUserCircle,
} from "react-icons/fa"
import { ThemeToggle } from "@/Components/ThemeToggle/ThemeToggle"
import { useAuth } from "@/Components/Providers/AuthProvider"
import PageContainer from "@/Components/Layout/PageContainer"
import logo from "../../assets/logo.png"
import { getUserDisplayName } from "@/types"

const Navbar = () => {
    const { isAuthenticated, logout, user, loading } = useAuth()
    const navigate = useNavigate()

    // ✅ SSR-safe client check (no state, no effect)
    const isClient = typeof window !== "undefined"

    const displayName = getUserDisplayName(user)
    const userInitial = displayName.charAt(0).toUpperCase()

    const topBarShellClassName =
        "rounded-[2rem] border border-subtle bg-surface p-3 shadow-soft backdrop-blur-xl"

    const topBarGroupClassName =
        "flex flex-wrap items-center gap-2 rounded-[1.5rem] bg-surface-soft p-2 ring-1 ring-subtle backdrop-blur-sm"

    const topBarItemClassName =
        "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-strong transition-all duration-200 hover:-translate-y-0.5 hover:bg-surface-soft"

    const topBarIconButtonClassName =
        "flex h-10 w-10 items-center justify-center rounded-xl text-strong transition-all duration-200 hover:-translate-y-0.5 hover:bg-surface-soft"

    const getNavItemClassName = ({ isActive }: { isActive: boolean }) =>
        isActive
            ? `${topBarItemClassName} bg-[color:var(--primary)] text-white shadow-[0_14px_30px_rgba(34,197,94,0.25)] hover:bg-[color:var(--primary-hover)]`
            : topBarItemClassName

    return (
        <nav className="sticky top-0 z-50 shrink-0 bg-[color:var(--background)]/95 backdrop-blur-md shadow-sm">
            <PageContainer className="py-4">
                <div
                    className={`${topBarShellClassName} flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between`}
                >
                    {/* LEFT */}
                    <div className={topBarGroupClassName}>
                        <Link to="/" className={`${topBarItemClassName} gap-3 px-3 pr-5`}>
                            <Image src={logo} alt="FinShark logo" className="h-8 w-auto" priority />
                        </Link>

                        <NavLink to="/" end className={getNavItemClassName}>
                            <FaHome className="mr-2" />
                            Home
                        </NavLink>

                        <NavLink to="/design-guide" className={getNavItemClassName}>
                            <FaPalette className="mr-2" />
                            Design Guide
                        </NavLink>
                    </div>

                    {/* RIGHT */}
                    <div className={`${topBarGroupClassName} lg:justify-end`}>
                        <ThemeToggle />

                        <NavLink to="/search" className={getNavItemClassName}>
                            <FaSearch className="mr-2" />
                            Search
                        </NavLink>

                        {/* ✅ AUTH (SSR-safe, no hydration mismatch) */}
                        {isClient && !loading ? (
                            isAuthenticated ? (
                                <details className="relative [&_summary::-webkit-details-marker]:hidden">
                                    <summary className="list-none cursor-pointer rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--primary)] focus-visible:ring-offset-2">
                                        <span className="sr-only">Open account menu</span>
                                        <span className={topBarIconButtonClassName}>
                                            <FaUserCircle className="h-5 w-5" />
                                        </span>
                                    </summary>

                                    <div className="absolute right-0 z-20 mt-3 w-72 rounded-[1.5rem] border border-subtle bg-surface p-4 shadow-soft">
                                        <div className="flex items-center gap-3">
                                            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface text-sm font-semibold text-strong shadow-sm">
                                                {userInitial}
                                            </span>

                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-semibold text-strong">
                                                    {displayName}
                                                </p>
                                                <p className="truncate text-xs text-muted">
                                                    {user?.email}
                                                </p>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => {
                                                logout()
                                                navigate("/")
                                            }}
                                            className={`${topBarItemClassName} mt-4 w-full justify-center`}
                                        >
                                            <FaSignOutAlt className="mr-2" />
                                            Logout
                                        </button>
                                    </div>
                                </details>
                            ) : (
                                <>
                                    <NavLink to="/login" className={getNavItemClassName}>
                                        <FaSignInAlt className="mr-2" />
                                        Login
                                    </NavLink>

                                    <NavLink to="/register" className={getNavItemClassName}>
                                        <FaUserPlus className="mr-2" />
                                        Signup
                                    </NavLink>
                                </>
                            )
                        ) : (
                            /* ✅ SSR placeholder */
                            <div className="h-10 w-24 rounded-xl bg-surface-soft animate-pulse" />
                        )}
                    </div>
                </div>
            </PageContainer>
        </nav>
    )
}

export default Navbar
