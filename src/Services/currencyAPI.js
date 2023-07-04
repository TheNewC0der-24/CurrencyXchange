import axios from "axios";

const API_KEY = "fa4448f2edmsh50cd49b13d3791dp15dd1ajsn60f1c9033090";
const API_HOST = "currency-converter18.p.rapidapi.com";

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
