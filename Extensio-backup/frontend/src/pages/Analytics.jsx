import { motion } from "framer-motion";
import { TrendingUp, Users, Download, Activity } from "lucide-react";
import Sidebar from "../Sidebar";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";


import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

function Analytics() {
  const navigate = useNavigate();
  const data = [
    { month: "Jan", users: 20, downloads: 15 },
    { month: "Feb", users: 40, downloads: 30 },
    { month: "Mar", users: 65, downloads: 55 },
    { month: "Apr", users: 90, downloads: 75 },
    { month: "May", users: 120, downloads: 100 },
    { month: "Jun", users: 160, downloads: 145 },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 text-white overflow-hidden">
      <Sidebar />

      <div className="relative flex-1 p-8">
        <motion.button
  whileHover={{ x: -5 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => {
  document.body.style.opacity = "0.7";
  setTimeout(() => navigate("/dashboard"), 250);
}}
  className="mb-6 flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 hover:bg-slate-800"
>
  <ArrowLeft size={18} />
  Back to Dashboard
</motion.button>

        {/* Background Glow */}
        <div className="fixed left-20 top-20 h-72 w-72 rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="fixed right-20 bottom-20 h-72 w-72 rounded-full bg-violet-500/10 blur-[120px]" />

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-8 overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-indigo-600/20 via-violet-600/20 to-purple-600/20 p-8"
        >
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl"></div>

          <h1 className="text-5xl font-bold">
            Analytics Dashboard 📈
          </h1>

          <p className="mt-3 text-slate-300">
            Monitor extension performance, downloads and growth.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="mb-8 grid gap-6 md:grid-cols-4">

          <motion.div
            whileHover={{ y: -8 }}
            className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
          >
            <Users className="mb-3 text-indigo-400" />
            <p className="text-slate-400">
              Total Users
            </p>
            <h2 className="text-4xl font-bold">
              1,245
            </h2>
          </motion.div>

          <motion.div
            whileHover={{ y: -8 }}
            className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
          >
            <Download className="mb-3 text-green-400" />
            <p className="text-slate-400">
              Downloads
            </p>
            <h2 className="text-4xl font-bold">
              5,890
            </h2>
          </motion.div>

          <motion.div
            whileHover={{ y: -8 }}
            className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
          >
            <TrendingUp className="mb-3 text-violet-400" />
            <p className="text-slate-400">
              Growth
            </p>
            <h2 className="text-4xl font-bold">
              +38%
            </h2>
          </motion.div>

          <motion.div
            whileHover={{ y: -8 }}
            className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
          >
            <Activity className="mb-3 text-yellow-400" />
            <p className="text-slate-400">
              Active Users
            </p>
            <h2 className="text-4xl font-bold">
              892
            </h2>
          </motion.div>

        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">

          {/* User Growth */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
          >
            <h2 className="mb-6 text-xl font-bold">
              User Growth
            </h2>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#818cf8"
                    strokeWidth={4}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Downloads */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
          >
            <h2 className="mb-6 text-xl font-bold">
              Downloads Overview
            </h2>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="downloads"
                    stroke="#a855f7"
                    fill="#a855f7"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

        </div>

        {/* Recent Activity */}
        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-6">

          <h2 className="mb-6 text-2xl font-bold">
            Recent Activity
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between border-b border-slate-800 pb-3">
              <span>
                YouTube Focus Mode generated
              </span>
              <span className="text-green-400">
                Success
              </span>
            </div>

            <div className="flex justify-between border-b border-slate-800 pb-3">
              <span>
                Job Tracker downloaded
              </span>
              <span className="text-indigo-400">
                Downloaded
              </span>
            </div>

            <div className="flex justify-between">
              <span>
                AI Note Taker created
              </span>
              <span className="text-green-400">
                Success
              </span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Analytics;