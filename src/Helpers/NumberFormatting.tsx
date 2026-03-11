export const formatLargeMonetaryNumber = (value: number): string => {
    if (!Number.isFinite(value)) return "N/A"

    const sign = value < 0 ? "-" : ""
    const n = Math.abs(value)

    if (n < 1_000) return `${sign}$${n}`
    if (n < 1_000_000) return `${sign}$${(n / 1_000).toFixed(1)}K`
    if (n < 1_000_000_000) return `${sign}$${(n / 1_000_000).toFixed(1)}M`
    if (n < 1_000_000_000_000) return `${sign}$${(n / 1_000_000_000).toFixed(1)}B`
    if (n < 1_000_000_000_000_000) return `${sign}$${(n / 1_000_000_000_000).toFixed(1)}T`
    return `${sign}$${n.toExponential(2)}`
}

export const formatCurrencyCompact = (value: number): string => {
    if (!Number.isFinite(value)) return "N/A"

    if (Math.abs(value) < 1_000) {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value)
    }

    return formatLargeMonetaryNumber(value)
}

export const formatLargeNonMonetaryNumber = (value: number): string => {
    if (!Number.isFinite(value)) return "N/A"

    const sign = value < 0 ? "-" : ""
    const n = Math.abs(value)

    if (n < 1_000) return `${sign}${n}`
    if (n < 1_000_000) return `${sign}${(n / 1_000).toFixed(1)}K`
    if (n < 1_000_000_000) return `${sign}${(n / 1_000_000).toFixed(1)}M`
    if (n < 1_000_000_000_000) return `${sign}${(n / 1_000_000_000).toFixed(1)}B`
    if (n < 1_000_000_000_000_000) return `${sign}${(n / 1_000_000_000_000).toFixed(1)}T`
    return `${sign}${n.toExponential(2)}`
}

export const formatRatio = (ratio: number): string => {
    if (!Number.isFinite(ratio)) return "N/A"
    return (Math.round(ratio * 100) / 100).toFixed(2)
}
