import { NextRequest } from "next/server"
import { badRequestResponse, proxyFmpRequest } from "../_shared"

export async function GET(request: NextRequest) {
    const query = request.nextUrl.searchParams.get("query")
    if (!query) return badRequestResponse("Missing required query parameter: query")

    const params = new URLSearchParams({ query })
    return proxyFmpRequest("/stable/search-symbol", params)
}

