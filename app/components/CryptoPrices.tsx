"use client";

import { Coin, fetchTopCoins } from "../api/api";
import  { useEffect, useState } from "react";

import CryptoTable from "./CryptoTable";
import GlobalStats from "./GlobalStats";
import Header from "./Header";

const REFRESH_INTERVAL_MS = 30000;

const CryptoDashboard = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
const [sortConfig, setSortConfig] = useState<{
  key: keyof Coin | null;
  direction: "asc" | "desc";
}>({
  key: null,
  direction: "asc",
});

const handleSort = (key: keyof Coin) => {
  setSortConfig((prev) => ({
    key,
    direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
  }));
};




  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchPrices = async () => {
    try {
      const data = await fetchTopCoins();
      setCoins(data);
    } catch (err: any) {
      setError(err.message || "Error fetching crypto prices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  const globalStats = [
    { label: "Total Market Cap", value: "$2.3T" },
    { label: "BTC Dominance", value: "45.6%" },
    { label: "ETH Dominance", value: "18.2%" },
    { label: "Top Gainer", value: "BNB +12.3%" },
  ];

  const sortedCoins = [...filteredCoins].sort((a, b) => {
  if (!sortConfig.key) return 0;

  const key = sortConfig.key;
  const direction = sortConfig.direction === "asc" ? 1 : -1;

  const valA = a[key] ?? 0;
  const valB = b[key] ?? 0;

  if (typeof valA === "number" && typeof valB === "number") {
    return (valA - valB) * direction;
  }

  return String(valA).localeCompare(String(valB)) * direction;
});


  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-indigo-500 text-xl animate-pulse font-semibold">
          Loading crypto prices...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-red-500 text-xl font-semibold">{error}</p>
      </div>
    );

  return (
    <div className="w-full min-h-screen lg:h-screen bg-gray-900 p-4 sm:p-6 flex flex-col">
      <Header
        searchTerm={searchTerm}
        onRefresh={fetchPrices}
        setSearchTerm={setSearchTerm}
      />
      <GlobalStats stats={globalStats} />

      <CryptoTable sortedCoins={sortedCoins} onSort={handleSort} />
    </div>
  );
};

export default CryptoDashboard;
