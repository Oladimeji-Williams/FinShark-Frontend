import type { ReactNode } from "react"

type Props = {
    children: ReactNode
    className?: string
}

const PageContainer = ({ children, className = "" }: Props) => {
    const containerClassName = `mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`.trim()

    return <div className={containerClassName}>{children}</div>
}

export default PageContainer
