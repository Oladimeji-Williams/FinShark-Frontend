import axios from "axios";

import { CompanyProfile, CompanySearch } from "@/company";

export const searchCompanies = async (request: string) => {
    try {
        const response = await axios.get<CompanySearch[]>(`https://financialmodelingprep.com/stable/search-symbol?query=${request}&apikey=${process.env.NEXT_PUBLIC_FMP_API_KEY}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Axios error searching for companies:", error.message);
            return error.message;
        }

        console.error("Unexpected error searching for companies:", error);
        return "An unexpected error occurred while searching for companies.";
    }
}

export const getCompanyProfile = async (ticker: string) => {
    try {
        const response = await axios.get<CompanyProfile[]>(`https://financialmodelingprep.com/stable/profile?symbol=${ticker}&apikey=${process.env.NEXT_PUBLIC_FMP_API_KEY}`);
        return response.data[0];
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Axios error fetching company profile:", error.message);
            return error.message;
        }

        console.error("Unexpected error fetching company profile:", error);
        return "An unexpected error occurred while fetching the company profile.";
    }
}

export const getCompanyQuote = async (ticker: string) => {
    try {
        const response = await axios.get(`https://financialmodelingprep.com/stable/quote?symbol=${ticker}&apikey=${process.env.NEXT_PUBLIC_FMP_API_KEY}`);
        return response.data[0];
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Axios error fetching company quote:", error.message);
            return error.message;
        }

        console.error("Unexpected error fetching company quote:", error);
        return "An unexpected error occurred while fetching the company quote.";
    }
}
