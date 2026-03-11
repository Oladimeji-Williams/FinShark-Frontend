import { NextResponse } from "next/server"

const FMP_BASE_URL = "https://financialmodelingprep.com"

const getApiKey = (): string | undefined => process.env.FMP_API_KEY

export const missingApiKeyResponse = () =>
    NextResponse.json({ message: "Missing FMP_API_KEY in server environment." }, { status: 500 })

export const badRequestResponse = (message: string) =>
    NextResponse.json({ message }, { status: 400 })

export const proxyFmpRequest = async (
    pathname: string,
    params: URLSearchParams = new URLSearchParams()
) => {
    const apiKey = getApiKey()
    if (!apiKey) return missingApiKeyResponse()

    try {
        const upstream = new URL(pathname, FMP_BASE_URL)
        params.forEach((value, key) => upstream.searchParams.set(key, value))
        upstream.searchParams.set("apikey", apiKey)

        const response = await fetch(upstream.toString(), { cache: "no-store" })
        const contentType = response.headers.get("content-type") ?? ""
        const payload = contentType.includes("application/json")
            ? await response.json()
            : await response.text()

        return NextResponse.json(payload, { status: response.status })
    } catch (error) {
        return NextResponse.json(
            {
                message: "Upstream FMP request failed.",
                detail: error instanceof Error ? error.message : "Unknown upstream error",
            },
            { status: 502 }
        )
    }
}
