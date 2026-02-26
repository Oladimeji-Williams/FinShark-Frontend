import axios from "axios";

import { CompanySearch } from "@/company";

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
