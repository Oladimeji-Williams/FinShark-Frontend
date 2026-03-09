import { NextRequest } from "next/server"
import { badRequestResponse, proxyFmpRequest } from "../_shared"

export async function GET(request: NextRequest) {
    const symbol = request.nextUrl.searchParams.get("symbol")
    if (!symbol) return badRequestResponse("Missing required query parameter: symbol")

    const params = new URLSearchParams({ symbol })
    return proxyFmpRequest("/v1/historical-price-full/dividend", params)
}
