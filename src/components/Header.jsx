import { useState } from "react";

export default function Header({ onSearch, onLogin }) {
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    if (onSearch) onSearch(keyword);
  };

  return (
    <header className="sticky top-0 z-40 bg-brand backdrop-blur-md border-b border-white/10 shadow-sm">
      <div className="max-w-[510px] mx-auto px-4 py-2">
        {/* Branding + Login */}
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-lg font-bold text-white">🏡 NusantaraProperty</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm italic text-white/80">explore π assets</span>
            <button
              onClick={onLogin}
              className="bg-blue-600 text-white px-3 py-1 rounded-md shadow font-medium text-sm"
            >
              🔐Login
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex space-x-2">
          <input
            type="text"
            className="flex-1 px-3 py-2 rounded-md border border-white/30 bg-white text-gray-800 placeholder:text-gray-500 text-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            placeholder="Cari properti..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-white text-yellow-600 font-bold px-4 rounded-md text-sm"
          >
            🔍
          </button>
        </div>
      </div>
    </header>
  );
}
