import { NextRequest } from "next/server"
import { badRequestResponse, proxyFmpRequest } from "../_shared"

export async function GET(request: NextRequest) {
    const symbol = request.nextUrl.searchParams.get("symbol")
    if (!symbol) return badRequestResponse("Missing required query parameter: symbol")

    return proxyFmpRequest(`/api/v3/discounted-cash-flow/${symbol}`)
}

