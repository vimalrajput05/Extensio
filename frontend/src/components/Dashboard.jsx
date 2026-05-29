import Sidebar from "../Sidebar";

function Dashboard() {
  return (
    <div className="flex bg-slate-950 text-white">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-8">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800 p-6 rounded-xl">
            <h3>Total Users</h3>
            <p className="text-4xl font-bold mt-3">120</p>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl">
            <h3>Extensions Created</h3>
            <p className="text-4xl font-bold mt-3">45</p>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl">
            <h3>Revenue</h3>
            <p className="text-4xl font-bold mt-3">₹25,000</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;