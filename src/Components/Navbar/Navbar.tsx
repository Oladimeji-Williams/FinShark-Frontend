import React from "react"
import Image from "next/image"
import { Link } from "react-router-dom"
import { FaHome, FaPalette, FaSearch, FaUserPlus } from "react-icons/fa"
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle"
import logo from "../../assets/logo.png"

type Props = {}

const Navbar = (props: Props) => {
    return (
        <nav className="relative container mx-auto p-6 bg-white dark:bg-gray-900 transition-colors">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-20">
                    <Link to="/">
                        <Image src={logo} alt="FinShark logo" />
                    </Link>
                    <Link
                        to="/home"
                        className="flex items-center text-black dark:text-gray-200 hover:text-darkBlue dark:hover:text-lightGreen transition-colors"
                    >
                        <FaHome className="mr-2" />
                        Dashboard
                    </Link>
                    <Link
                        to="/design-guide"
                        className="flex items-center text-black dark:text-gray-200 hover:text-darkBlue dark:hover:text-lightGreen transition-colors"
                    >
                        <FaPalette className="mr-2" />
                        Design Guide
                    </Link>
                </div>
                <div className="hidden lg:flex items-center space-x-6 text-back">
                    <ThemeToggle />
                    <Link
                        to="/search"
                        className="flex items-center text-black dark:text-gray-200 hover:text-darkBlue dark:hover:text-lightGreen transition-colors"
                    >
                        <FaSearch className="mr-2" />
                        Search
                    </Link>
                    <Link
                        to="/home"
                        className="flex items-center px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70 transition-opacity"
                    >
                        <FaUserPlus className="mr-2" />
                        Signup
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
