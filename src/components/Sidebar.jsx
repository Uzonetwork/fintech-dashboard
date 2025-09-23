// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
  ListOrdered,
  BarChart3,
  Settings,
} from "lucide-react";

export default function Sidebar({ isOpen = false, onClose = () => {} }) {
  const linkClasses = "flex items-center gap-3 px-3 py-2 rounded-md transition";
  const activeClasses = "bg-blue-600 text-white font-semibold";

  return (
    <>
      {/* mobile overlay */}
      <div
        className={`fixed inset-0 bg-black/30 z-30 md:hidden transition-opacity ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed z-40 top-0 left-0 h-full w-64 bg-white shadow-md p-6 transform transition-transform
          md:relative md:translate-x-0 ${
            isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
      >
        <h2 className="text-2xl font-bold mb-6">Fintech 🏦</h2>
        <nav className="flex flex-col gap-2">
          <NavLink end to="/" className={({ isActive }) => isActive ? `${linkClasses} ${activeClasses}` : linkClasses}>
            <Home size={16} /> Home
          </NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? `${linkClasses} ${activeClasses}` : linkClasses}>
            <LayoutDashboard size={16} /> Dashboard
          </NavLink>
          <NavLink to="/transactions" className={({ isActive }) => isActive ? `${linkClasses} ${activeClasses}` : linkClasses}>
            <ListOrdered size={16} /> Transactions
          </NavLink>
          <NavLink to="/analytics" className={({ isActive }) => isActive ? `${linkClasses} ${activeClasses}` : linkClasses}>
            <BarChart3 size={16} /> Analytics
          </NavLink>
          <NavLink to="/settings" className={({ isActive }) => isActive ? `${linkClasses} ${activeClasses}` : linkClasses}>
            <Settings size={16} /> Settings
          </NavLink>
        </nav>
      </aside>
    </>
  );
}
