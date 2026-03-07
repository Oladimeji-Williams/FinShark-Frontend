import type { ReactNode } from "react"

export type RatioListConfig<T> = {
    label: ReactNode
    subtitle?: string
    render: (item: T) => ReactNode
}

type RatioListProps<T> = {
    config: RatioListConfig<T>[]
    data: T
}

const RatioList = <T,>({ config, data }: RatioListProps<T>) => {
    const renderedRows = config.map((row, index) => {
        return (
            <li key={index} className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                    <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">
                            {row.label}
                        </div>
                        <p className="text-sm text-gray-500 truncate">{row.subtitle}</p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900">
                        {row.render(data)}
                    </div>
                </div>
            </li>
        )
    })

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg ml-4 mt-4 mb-4 p-4 sm:p-6 lg:p-8 h-full">
            <ul className="divide-y divide-gray-200">{renderedRows}</ul>
        </div>
    )
}

export default RatioList
