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

export interface CachedData {
  timestamp: number;
  data: Coin[];
}

const CACHED_KEY = "topCoins";
const CACHED_DURATION_MS = 60 * 1000;

const api = axios.create({
  baseURL: "https://api.coingecko.com/api/v3/coins/markets",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchTopCoins = async (): Promise<Coin[]> => {
  let cachedData: CachedData | null = null;

  try {
    const cachedString: string | null = localStorage.getItem(CACHED_KEY);
    if (cachedString) {
      cachedData = JSON.parse(cachedString) as CachedData;
      const now = Date.now();

      if (cachedData && now - cachedData.timestamp < CACHED_DURATION_MS) {
        console.log("Returning fresh data from cache.");
        return cachedData.data;
      }
    }
  } catch (parseError) {
    console.warn(
      "Failed to parse/read cache, proceeding to API fetch.",
      parseError
    );
    cachedData = null;
  }

  try {
    console.log("Cache expired or empty, fetching new data from API.");
    const response = await api.get<Coin[]>("", {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 250,
        page: 1,
        sparkline: true,
      },
    });

    const newCachedObj: CachedData = {
      timestamp: Date.now(),
      data: response.data,
    };
    localStorage.setItem(CACHED_KEY, JSON.stringify(newCachedObj));
    return response.data;
  } catch (apiError: any) {
    console.warn("API fetch failed.", apiError);

    if (cachedData) {
      console.warn("API failed, falling back to expired cache data.");

      return cachedData.data;
    }

    throw new Error(
      apiError?.message ||
        "Failed to fetch crypto prices and no cache available."
    );
  }
};
