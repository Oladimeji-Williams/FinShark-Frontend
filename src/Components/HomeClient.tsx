"use client"

import { JSX } from "react"
import Navbar from "./Navbar/Navbar"
import Sidebar from "./Sidebar/Sidebar"
import { Outlet } from "react-router-dom"

const HomeClient = (): JSX.Element => {
    return (
        <div className="flex h-screen flex-col overflow-hidden">
            
            {/* NAVBAR */}
            <div className="shrink-0">
                <Navbar />
            </div>

            {/* MAIN */}
            <div className="flex flex-1 overflow-hidden">
                

                {/* CONTENT */}
                <div className="flex-1 overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default HomeClient