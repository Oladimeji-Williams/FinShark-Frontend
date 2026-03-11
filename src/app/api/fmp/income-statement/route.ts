import { NextRequest } from "next/server"
import { badRequestResponse, proxyFmpRequest } from "../_shared"

export async function GET(request: NextRequest) {
    const symbol = request.nextUrl.searchParams.get("symbol")
    if (!symbol) return badRequestResponse("Missing required query parameter: symbol")

    const period = request.nextUrl.searchParams.get("period") ?? "annual"
    const limit = request.nextUrl.searchParams.get("limit") ?? "40"
    const params = new URLSearchParams({ symbol, period, limit })
    return proxyFmpRequest("/stable/income-statement", params)
}

