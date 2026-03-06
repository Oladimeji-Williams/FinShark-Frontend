"use client"

export default function TableSkeleton() {
  return (
    <div style={{ padding: "16px" }}>
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          style={{
            height: "20px",
            marginBottom: "12px",
            borderRadius: "4px",
            background:
              "linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 37%,#f0f0f0 63%)",
            backgroundSize: "400% 100%",
            animation: "skeleton 1.2s ease infinite"
          }}
        />
      ))}
    </div>
  )
}