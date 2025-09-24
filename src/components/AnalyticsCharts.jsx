// src/components/AnalyticsCharts.jsx
import React, { Suspense } from "react";

const Recharts = React.lazy(() =>
  import("recharts").then((m) => ({
    default: {
      LineChart: m.LineChart,
      Line: m.Line,
      XAxis: m.XAxis,
      YAxis: m.YAxis,
      CartesianGrid: m.CartesianGrid,
      Tooltip: m.Tooltip,
      Legend: m.Legend,
      ResponsiveContainer: m.ResponsiveContainer,
      PieChart: m.PieChart,
      Pie: m.Pie,
      Cell: m.Cell,
    },
  }))
);

const lineData = [
  { month: "Jan", income: 4000, expenses: 2400 },
  { month: "Feb", income: 3000, expenses: 1398 },
  { month: "Mar", income: 2000, expenses: 9800 },
  { month: "Apr", income: 2780, expenses: 3908 },
  { month: "May", income: 1890, expenses: 4800 },
  { month: "Jun", income: 2390, expenses: 3800 },
];

const pieData = [
  { name: "Income", value: 12000 },
  { name: "Expenses", value: 7500 },
];

const COLORS = ["#10B981", "#EF4444"];

function AnalyticsCharts() {
  return (
    <Suspense fallback={<div>Loading charts...</div>}>
      <Recharts.ResponsiveContainer>
        {/* Wrapped in grid */}
        <div className="grid grid-cols-2 gap-6 mt-8">
          {/* Line Chart */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-4">Income vs Expenses</h3>
            <Recharts.ResponsiveContainer width="100%" height={300}>
              <Recharts.LineChart data={lineData}>
                <Recharts.CartesianGrid strokeDasharray="3 3" />
                <Recharts.XAxis dataKey="month" />
                <Recharts.YAxis />
                <Recharts.Tooltip />
                <Recharts.Legend />
                <Recharts.Line
                  type="monotone"
                  dataKey="income"
                  stroke="#10B981"
                  strokeWidth={2}
                />
                <Recharts.Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#EF4444"
                  strokeWidth={2}
                />
              </Recharts.LineChart>
            </Recharts.ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-4">Income vs Expenses Breakdown</h3>
            <Recharts.ResponsiveContainer width="100%" height={300}>
              <Recharts.PieChart>
                <Recharts.Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Recharts.Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Recharts.Pie>
                <Recharts.Tooltip />
              </Recharts.PieChart>
            </Recharts.ResponsiveContainer>
          </div>
        </div>
      </Recharts.ResponsiveContainer>
    </Suspense>
  );
}

export default AnalyticsCharts;
