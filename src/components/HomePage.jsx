import Dashboard from "./Dashboard";
import TransactionsTable from "./TransactionsTable";
import AnalyticsCharts from "./AnalyticsCharts";

function HomePage() {
  return (
    <div>
      <Dashboard />
      <TransactionsTable />
      <AnalyticsCharts />
    </div>
  );
}

export default HomePage;
