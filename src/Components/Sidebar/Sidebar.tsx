import { FaBalanceScale, FaBuilding, FaChartLine, FaDollarSign } from "react-icons/fa"
import type { IconType } from "react-icons"
import { NavLink } from "react-router-dom"

const sidebarItems: Array<{ to: string; label: string; icon: IconType }> = [
    {
        to: "company-profile",
        label: "Company Profile",
        icon: FaBuilding,
    },
    {
        to: "income-statement",
        label: "Income Statement",
        icon: FaChartLine,
    },
    {
        to: "balance-sheet",
        label: "Balance Sheet",
        icon: FaBalanceScale,
    },
    {
        to: "cashflow-statement",
        label: "Cashflow Statement",
        icon: FaDollarSign,
    },
]

const Sidebar = () => {
    const shellClassName =
        "relative block w-full h-full rounded-[1.75rem] border border-subtle bg-surface p-4 shadow-soft transition-all duration-300 ease-in-out"
    const groupClassName =
        "flex h-full w-full flex-col rounded-[1.35rem] bg-surface-soft p-2 ring-1 ring-subtle"
    const itemClassName =
        "flex h-14 flex-1 items-center gap-3 rounded-xl bg-transparent px-4 text-sm font-medium text-strong transition-all duration-200 hover:-translate-y-0.5 hover:bg-surface-soft hover:text-strong"
    const getItemClassName = ({ isActive }: { isActive: boolean }) =>
        isActive
            ? `${itemClassName} bg-[var(--color-light-green)] text-slate-900 shadow-[0_14px_30px_rgba(45,212,191,0.24)] hover:bg-[var(--color-light-green)] hover:text-slate-900`
            : itemClassName

    return (
        <nav className={`${shellClassName} h-full`}>
            <div className="flex h-full w-full flex-col">
                <div className={`${groupClassName} h-full`}>
                    <div className="flex h-full flex-col">
                        {sidebarItems.map(({ to, label, icon: Icon }) => (
                            <NavLink key={to} to={to} className={getItemClassName}>
                                {({ isActive }) => (
                                    <>
                                        <Icon
                                            className={`h-4 w-4 shrink-0 ${
                                                isActive ? "text-white" : "text-muted"
                                            }`}
                                        />
                                        <span>{label}</span>
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Sidebar
