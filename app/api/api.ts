import axios from "axios";

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  sparkline_in_7d?: { price: number[] };
}

const api = axios.create({
  baseURL: "https://api.coingecko.com/api/v3/coins/markets",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchTopCoins = async (): Promise<Coin[]> => {
  try {
    const response = await api.get<Coin[]>("", {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 50,
        page: 1,
        sparkline: true,
      },
    });
    return response.data;
  } catch (err: any) {
    throw new Error(err?.message || "Failed to fetch crypto prices");
  }
};
