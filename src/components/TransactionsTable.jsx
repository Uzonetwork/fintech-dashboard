// src/components/TransactionsTable.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import Papa from "papaparse";
import jsPDF from "jspdf";
import "jspdf-autotable";
import LoadingSpinner from "./ui/LoadingSpinner";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function TransactionsTable() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // filters
  const [globalFilter, setGlobalFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch(`${API}/transactions`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch");
        return r.json();
      })
      .then((data) => {
        if (!mounted) return;
        setTransactions(data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        if (!mounted) return;
        setError(err.message || "Error fetching");
      })
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, []);

  const columns = useMemo(
    () => [
      { accessorKey: "date", header: "Date" },
      { accessorKey: "description", header: "Description" },
      {
        accessorKey: "category",
        header: "Category",
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: (info) => <span className={info.getValue() < 0 ? "text-red-600" : "text-green-600"}>${info.getValue()}</span>,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => {
          const val = info.getValue();
          const cls =
            val === "Completed" ? "bg-green-100 text-green-800" :
            val === "Pending" ? "bg-yellow-100 text-yellow-800" :
            "bg-red-100 text-red-800";
          return <span className={`px-3 py-1 rounded-full text-sm font-medium ${cls}`}>{val}</span>;
        },
      },
    ],
    []
  );

  const filteredData = useMemo(() => {
    return transactions.filter((row) => {
      // status
      if (statusFilter !== "All" && row.status !== statusFilter) return false;
      // date range
      if (startDate && new Date(row.date) < new Date(startDate)) return false;
      if (endDate && new Date(row.date) > new Date(endDate)) return false;
      // global search on description or amount
      if (globalFilter) {
        const q = globalFilter.toLowerCase();
        if (
          !String(row.description).toLowerCase().includes(q) &&
          !String(row.category).toLowerCase().includes(q) &&
          !String(row.amount).includes(q)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [transactions, statusFilter, startDate, endDate, globalFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {},
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // CSV
  const exportCSV = () => {
    const csv = Papa.unparse(filteredData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Transactions", 14, 16);
    const head = [["Date", "Description", "Category", "Amount", "Status"]];
    const body = filteredData.map((r) => [r.date, r.description, r.category, r.amount, r.status]);
    doc.autoTable({ startY: 22, head, body });
    doc.save("transactions.pdf");
  };

  if (loading) return <LoadingSpinner />;

  if (error) return <div className="bg-white p-6 rounded shadow">Error: {error}</div>;

  if (!transactions.length) return <div className="bg-white p-6 rounded shadow">No transactions found.</div>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Recent Transactions</h3>
        <div className="flex gap-2">
          <button onClick={exportCSV} className="px-4 py-2 bg-blue-500 text-white rounded">Export CSV</button>
          <button onClick={exportPDF} className="px-4 py-2 bg-red-500 text-white rounded">Export PDF</button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." className="p-2 border rounded flex-1" />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="p-2 border rounded">
          <option value="All">All Status</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="p-2 border rounded" />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="p-2 border rounded" />
      </div>

      {/* Table */}
      <table className="w-full text-left border-collapse">
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id} className="border-b">
              {hg.headers.map((h) => (
                <th key={h.id} className="p-3">
                  {flexRender(h.column.columnDef.header, h.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-3">{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">Previous</button>
        <span>Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</span>
        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">Next</button>
      </div>
    </div>
  );
}
