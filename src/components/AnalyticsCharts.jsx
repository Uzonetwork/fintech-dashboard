// src/components/AnalyticsCharts.jsx
import React, { Suspense, lazy } from "react";

const LineChartWrapper = lazy(() => import("./LineChartWrapper"));
const PieChartWrapper = lazy(() => import("./PieChartWrapper"));

function AnalyticsCharts() {
  return (
    <div className="grid grid-cols-2 gap-6 mt-8">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-4">Income vs Expenses</h3>
        <Suspense fallback={<div>Loading line chart...</div>}>
          <LineChartWrapper />
        </Suspense>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-4">Income vs Expenses Breakdown</h3>
        <Suspense fallback={<div>Loading pie chart...</div>}>
          <PieChartWrapper />
        </Suspense>
      </div>
    </div>
  );
}

export default AnalyticsCharts;
