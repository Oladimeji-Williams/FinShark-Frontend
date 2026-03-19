"use client"

export default function TableSkeleton() {
    return (
        <div className="overflow-hidden rounded-[1.9rem] border border-white/70 bg-white/82 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/82 sm:p-6">
            {Array.from({ length: 10 }).map((_, i) => (
                <div
                    key={i}
                    className="mb-3 h-5 rounded-md"
                    style={{
                        background: `linear-gradient(90deg, ${"var(--skeleton-base)"} 25%, ${"var(--skeleton-highlight)"} 37%, ${"var(--skeleton-base)"} 63%)`,
                        backgroundSize: "400% 100%",
                        animation: "skeleton 1.2s ease infinite",
                    }}
                />
            ))}
        </div>
    )
}
