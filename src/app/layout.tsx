import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Providers } from "@/Components/Providers/ThemeProvider"

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
})

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
})

export const metadata: Metadata = {
    title: "FinShark",
    description: "FinShark stock research and company analytics dashboard",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen overflow-hidden`}
            >
                <Providers>
                    <div className="flex h-full flex-col">
                        {children} {/* HomeClient or login/register will handle their own scrolling */}
                    </div>
                </Providers>
            </body>
        </html>
    )
}