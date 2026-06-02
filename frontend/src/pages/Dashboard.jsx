import { motion } from "framer-motion";
import {
  Sparkles,
  Users,
  FolderOpen,
  TrendingUp,
  Plus,
  Activity,
} from "lucide-react";
import Sidebar from "../Sidebar";

function Dashboard() {
  const stats = [
    {
      title: "Extensions Generated",
      value: "128",
      icon: <Sparkles size={28} />,
    },
    {
      title: "Active Users",
      value: "120",
      icon: <Users size={28} />,
    },
    {
      title: "Saved Projects",
      value: "45",
      icon: <FolderOpen size={28} />,
    },
    {
      title: "Success Rate",
      value: "96%",
      icon: <TrendingUp size={28} />,
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <div className="flex-1 p-8">

        <motion.div
  whileHover={{
    y: -10,
    scale: 1.03,
  }}
  transition={{ type: "spring", stiffness: 300 }}
>
<div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-700 p-8 mb-8">

  <div className="absolute top-0 right-0 h-40 w-40 bg-white/10 rounded-full blur-3xl"></div>
<div className="fixed top-20 left-20 h-72 w-72 rounded-full bg-indigo-500/10 blur-[120px]" />

<div className="fixed bottom-20 right-20 h-72 w-72 rounded-full bg-violet-500/10 blur-[120px]" />
  <div className="relative z-10">
    <h1 className="text-5xl font-bold mb-3">
      Welcome Back 👋
    </h1>

    <p className="text-lg text-indigo-100">
      Create powerful Chrome Extensions with AI in seconds.
    </p>

    <button className="mt-6 rounded-xl bg-white text-slate-900 px-6 py-3 font-semibold hover:scale-105 transition">
      Generate New Extension
    </button>
  </div>

</div>
          <p className="mt-3 text-slate-400">
            Generate, manage and deploy Chrome Extensions using AI.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-6">

  <h2 className="text-2xl font-bold mb-5">
    Recent Activity
  </h2>

  <div className="space-y-4">

    <div className="flex justify-between border-b border-slate-800 pb-3">
      <span>Generated YouTube Focus Mode</span>
      <span className="text-green-400">Success</span>
    </div>

    <div className="flex justify-between border-b border-slate-800 pb-3">
      <span>Downloaded Job Tracker</span>
      <span className="text-indigo-400">Downloaded</span>
    </div>

    <div className="flex justify-between">
      <span>Generated Productivity Booster</span>
      <span className="text-green-400">Success</span>
    </div>

  </div>

</div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -8, scale: 1.03 }}
              className="rounded-3xl border border-white/10 bg-slate-900 p-6"
            >
              <div className="mb-4 text-indigo-400">
                {item.icon}
              </div>

              <h3 className="text-slate-400">
                {item.title}
              </h3>

              <p className="mt-2 text-4xl font-bold">
                {item.value}
              </p>
            </motion.div>
            
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">

          {/* Recent Activity */}
          <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
            <h2 className="mb-5 flex items-center gap-2 text-xl font-semibold">
              <Activity size={20} />
              Recent Activity
            </h2>

            <div className="space-y-4">
              <div className="rounded-xl bg-slate-800 p-4">
                Generated YouTube Ad Blocker
              </div>

              <div className="rounded-xl bg-slate-800 p-4">
                Generated Job Tracker Extension
              </div>

              <div className="rounded-xl bg-slate-800 p-4">
                Downloaded ZIP Package
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
            <h2 className="mb-5 text-xl font-semibold">
              Quick Actions
            </h2>

            <div className="grid gap-4">
              <button className="flex items-center gap-3 rounded-2xl bg-indigo-600 p-4 font-medium transition hover:bg-indigo-500">
                <Plus size={20} />
                Generate New Extension
              </button>

              <button className="rounded-2xl bg-slate-800 p-4 text-left transition hover:bg-slate-700">
                View My Extensions
              </button>

              <button className="rounded-2xl bg-slate-800 p-4 text-left transition hover:bg-slate-700">
                Analytics Dashboard
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
