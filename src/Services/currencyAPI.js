import axios from "axios";

const API_KEY = import.meta.env.VITE_RAPID_API_KEY;
const API_HOST = import.meta.env.VITE_RAPID_API_HOST;

export const fetchSupportedCurrencies = async () => {
    try {
        const response = await axios.get(
            "https://currency-converter18.p.rapidapi.com/api/v1/supportedCurrencies",
            {
                headers: {
                    "X-RapidAPI-Key": API_KEY,
                    "X-RapidAPI-Host": API_HOST
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const convertCurrency = async (from, to, amount) => {
    try {
        const response = await axios.get(
            "https://currency-converter18.p.rapidapi.com/api/v1/convert",
            {
                params: {
                    from: from,
                    to: to,
                    amount: amount
                },
                headers: {
                    "X-RapidAPI-Key": API_KEY,
                    "X-RapidAPI-Host": API_HOST
                }
            }
        );
        return response.data.result.convertedAmount;
    } catch (error) {
        console.error(error);
        return null;
    }
};
