"use client";

import { RefreshCw, Search } from "lucide-react";

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  onRefresh: () => void;
}

const Header = ({ searchTerm, setSearchTerm, onRefresh }: HeaderProps) => {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
        Crypto Tracker
      </h1>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
        {/* SEARCH */}
        <div className="relative w-full sm:w-60">
          <Search size={16} className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search coin..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
          />
        </div>

        {/* TIME */}
        <p className="text-gray-400 text-sm hidden sm:block">
          Updated: {new Date().toLocaleTimeString()}
        </p>

        {/* REFRESH */}
        <button
          onClick={onRefresh}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-500 transition text-sm font-medium"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>
    </header>
  );
};

export default Header;
