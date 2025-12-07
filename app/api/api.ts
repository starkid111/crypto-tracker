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
  try {
    const cached : string | null = localStorage.getItem(CACHED_KEY);
   
    if (cached) {
       const cachedData: CachedData = JSON.parse(cached);
       const now = Date.now()
       if (now - cachedData.timestamp < CACHED_DURATION_MS) {
        return cachedData.data;
       }
    }
    
    
    const response = await api.get<Coin[]>("", {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 250, 
    page: 1,
        sparkline: true,
      },
    });

  
    const cachedObj : CachedData = {
      timestamp: Date.now(),
      data: response.data
    }
    localStorage.setItem(CACHED_KEY , JSON.stringify(cachedObj) )
    return response.data;
  } catch (err: any) {
    throw new Error(err?.message || "Failed to fetch crypto prices");
  }
};
