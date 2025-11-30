"use client";

import { ArrowDown, ArrowUp, RefreshCw } from "lucide-react";
import { Coin, fetchTopCoins } from "../api/api";
import React, { useEffect, useState } from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";

const REFRESH_INTERVAL_MS = 30000; 

const CryptoDashboard = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  //  global stats
  const globalStats = [
    { label: "Total Market Cap", value: "$2.3T" },
    { label: "BTC Dominance", value: "45.6%" },
    { label: "ETH Dominance", value: "18.2%" },
    { label: "Top Gainer", value: "BNB +12.3%" },
  ];

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
      

      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-4 shrink-0">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Crypto Dashboard
        </h1>
        <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <p className="text-gray-400 text-sm hidden sm:block">
            Last Updated: {new Date().toLocaleTimeString()}
          </p>
          <button
            onClick={fetchPrices}
            className="flex items-center justify-center sm:justify-start gap-2 px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-500 transition text-sm font-medium w-full sm:w-auto"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
      </header>


      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 shrink-0">
        {globalStats.map((stat) => (
          <div
            key={stat.label}
            className="bg-gray-800 p-3 sm:p-4 rounded-xl shadow-lg border-t-2 border-indigo-500 hover:scale-[1.02] transition-transform duration-200"
          >
            <p className="text-gray-400 text-xs sm:text-sm font-medium mb-1 truncate">
              {stat.label}
            </p>
            <p className="text-white font-extrabold text-base sm:text-xl">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="flex-1 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
       
        <div className="overflow-x-auto h-full lg:max-h-[calc(100vh-250px)] lg:overflow-y-auto">
          <table className="w-full text-left table-auto min-w-[700px]">
            <thead className="bg-gray-700 text-gray-400 uppercase text-[10px] sm:text-xs tracking-wider sticky top-0 z-20 shadow-md">
              <tr>
                <th className="py-3 px-3 sm:px-4">#</th>
                <th className="py-3 px-3 sm:px-4">Coin</th>
                <th className="py-3 px-3 sm:px-4">Price</th>
                <th className="py-3 px-3 sm:px-4">24h Change</th>
                <th className="py-3 px-3 sm:px-4 hidden lg:table-cell">Market Cap</th>
                <th className="py-3 px-3 sm:px-4 hidden md:table-cell">Volume (24h)</th>
                <th className="py-3 px-3 sm:px-4">7d Trend</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-700">
              {coins.map((coin, index) => {
                const changeIsPositive = coin.price_change_percentage_24h >= 0;
                const changeColor = changeIsPositive ? "text-green-400" : "text-red-400";
                const ChangeIcon = changeIsPositive ? ArrowUp : ArrowDown;

                return (
                  <tr
                    key={coin.id}
                    className={`hover:bg-gray-700/50 transition-colors duration-200 text-sm ${
                      Math.abs(coin.price_change_percentage_24h) > 5 ? "bg-gray-900/50" : ""
                    }`}
                  >
                    <td className="py-3 px-3 sm:px-4 text-gray-400 text-xs sm:text-sm">
                      {index + 1}
                    </td>

                    <td className="py-3 px-3 sm:px-4 flex items-center gap-2">
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
                      />
                      <div>
                        <p className="text-white font-medium text-sm sm:text-base">
                          {coin.name}
                        </p>
                        <p className="text-gray-400 uppercase text-[10px] sm:text-xs">
                          {coin.symbol}
                        </p>
                      </div>
                    </td>

                    <td className="py-3 px-3 sm:px-4 text-white font-bold text-sm sm:text-base">
                      ${coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>

                    <td className={`py-3 px-3 sm:px-4 font-semibold text-sm flex items-center gap-1 ${changeColor}`}>
                      {coin.price_change_percentage_24h.toFixed(2)}%
                      <ChangeIcon size={12} className="ml-1" />
                    </td>

                    <td className="py-3 px-3 sm:px-4 text-white text-sm hidden lg:table-cell">
                      {coin.market_cap ? `$${(coin.market_cap / 1e9).toFixed(2)}B` : "-"}
                    </td>

                    <td className="py-3 px-3 sm:px-4 text-white text-sm hidden md:table-cell">
                      {coin.total_volume ? `$${(coin.total_volume / 1e6).toFixed(1)}M` : "-"}
                    </td>

                    <td className="py-3 px-3 sm:px-4 w-28">
                      {coin.sparkline_in_7d?.price ? (
                        <Sparklines data={coin.sparkline_in_7d.price} svgWidth={100} svgHeight={30}>
                          <SparklinesLine
                            color={changeIsPositive ? "#4ade80" : "#f87171"}
                            style={{ strokeWidth: 1.5, fill: "none" }}
                          />
                        </Sparklines>
                      ) : (
                        <span className="text-gray-600">-</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CryptoDashboard;