// src/components/Topbar.jsx
import React from "react";

export default function Topbar({ onMenu }) {
  return (
    <div className="flex items-center justify-between h-14 bg-white px-4 shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenu}
          aria-label="Toggle menu"
          className="p-2 md:hidden rounded hover:bg-gray-100"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <h1 className="text-lg font-semibold hidden md:block">Fintech Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm hidden sm:block">Hello, Uzo 👋</span>
        <img src="https://i.pravatar.cc/40" alt="avatar" className="w-8 h-8 rounded-full" />
      </div>
    </div>
  );
}
