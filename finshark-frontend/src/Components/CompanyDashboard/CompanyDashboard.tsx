import React from "react"
import { Outlet } from "react-router-dom"

type Props = {
    children: React.ReactNode
    ticker: string
}

const CompanyDashboard = (props: Props) => {
    return (
        <div className="relative md:ml-64 bg-blueGray-100 dark:bg-gray-900 w-full transition-colors">
            <div className="relative pt-20 pb-32 bg-lightBlue-500 dark:bg-blue-900 transition-colors">
                <div className="px-4 md:px-6 mx-auto w-full">
                    <div>
                        <div className="flex flex-wrap">{props.children}</div>
                        <div className="flex flex-wrap">{<Outlet context={props.ticker} />}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyDashboard
