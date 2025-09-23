function Dashboard() {
  return (
    <section className="grid grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-gray-600">Balance</h3>
        <p className="text-2xl font-bold">$50,000</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-gray-600">Income</h3>
        <p className="text-2xl font-bold text-green-600">$12,000</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-gray-600">Expenses</h3>
        <p className="text-2xl font-bold text-red-600">$7,500</p>
      </div>
    </section>
  );
}

export default Dashboard;
