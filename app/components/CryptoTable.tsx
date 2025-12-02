import { ArrowDown, ArrowUp } from "lucide-react";
import { Sparklines, SparklinesLine } from "react-sparklines";

import { Coin } from "../api/api";

interface CryptoTableProps {
  sortedCoins: Coin[];
  onSort: (key: keyof Coin) => void;
}

const CryptoTable = ({ sortedCoins, onSort }: CryptoTableProps) => {
  return (
    <div className="flex-1 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
      <div className="overflow-x-auto lg:max-h-[calc(100vh-250px)] overflow-y-auto">
        <table className="w-full text-left table-auto min-w-[700px]">
          <thead className="bg-gray-700 text-gray-400 text-xs uppercase sticky top-0 z-20 shadow-md">
            <tr>
              <th className="py-3 px-4">#</th>
              <th
                className="py-3 px-4 cursor-pointer hover:text-white transition"
                onClick={() => onSort("name")}
              >
                Coin
              </th>

              <th
                className="py-3 px-4 cursor-pointer hover:text-white transition"
                onClick={() => onSort("current_price")}
              >
                Price
              </th>

              <th
                className="py-3 px-4 cursor-pointer hover:text-white transition"
                onClick={() => onSort("price_change_percentage_24h")}
              >
                24h
              </th>
              <th
                className="py-3 px-4 cursor-pointer hover:text-white transition hidden lg:table-cell"
                onClick={() => onSort("market_cap")}
              >
                Market Cap
              </th>

              <th
                className="py-3 px-4 cursor-pointer hover:text-white transition hidden md:table-cell"
                onClick={() => onSort("total_volume")}
              >
                Volume
              </th>

              <th className="py-3 px-4">7d</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {sortedCoins.map((coin, index) => {
              const positive = coin.price_change_percentage_24h >= 0;
              const color = positive ? "text-green-400" : "text-red-400";
              const Icon = positive ? ArrowUp : ArrowDown;

              return (
                <tr
                  key={coin.id}
                  className="hover:bg-gray-700/50 transition text-sm"
                >
                  <td className="py-3 px-4 text-gray-400">{index + 1}</td>

                  <td className="py-3 px-4 flex items-center gap-2">
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="text-white font-medium">{coin.name}</p>
                      <p className="text-gray-400 text-xs uppercase">
                        {coin.symbol}
                      </p>
                    </div>
                  </td>

                  <td className="py-3 px-4 text-white font-bold">
                    ${coin.current_price.toLocaleString()}
                  </td>

                  <td
                    className={`py-3 px-4 font-semibold flex items-center gap-1 ${color}`}
                  >
                    {coin.price_change_percentage_24h.toFixed(2)}%
                    <Icon size={12} />
                  </td>

                  <td className="py-3 px-4 text-white hidden lg:table-cell">
                    {coin.market_cap
                      ? `$${(coin.market_cap / 1e9).toFixed(2)}B`
                      : "-"}
                  </td>

                  <td className="py-3 px-4 text-white hidden md:table-cell">
                    {coin.total_volume
                      ? `$${(coin.total_volume / 1e6).toFixed(1)}M`
                      : "-"}
                  </td>

                  <td className="py-3 px-4 w-28">
                    {coin.sparkline_in_7d?.price ? (
                      <Sparklines
                        data={coin.sparkline_in_7d.price}
                        svgWidth={100}
                        svgHeight={30}
                      >
                        <SparklinesLine
                          color={positive ? "#4ade80" : "#f87171"}
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
  );
};

export default CryptoTable;
