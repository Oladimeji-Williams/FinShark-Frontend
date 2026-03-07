import React from "react"
import Image from "next/image"
import { Link } from "react-router-dom"
import logo from "../../assets/logo.png"

type Props = {}

const Navbar = (props: Props) => {
    return (
        <nav className="relative container mx-auto p-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-20">
                    <Link to="/">
                        <Image src={logo} alt="FinShark logo" />
                    </Link>
                    <Link to="/home" className="text-black hover:text-darkBlue">
                        Dashboard
                    </Link>
                    <Link to="/design-guide" className="text-black hover:text-darkBlue">
                        Design Guide
                    </Link>
                </div>
                <div className="hidden lg:flex items-center space-x-6 text-back">
                    <Link to="/search" className="hover:text-darkBlue">
                        Search
                    </Link>
                    <Link
                        to="/home"
                        className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70"
                    >
                        Signup
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
