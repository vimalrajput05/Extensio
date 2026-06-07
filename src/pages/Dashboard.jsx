import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Users,
  FolderOpen,
  TrendingUp,
  Plus,
  Activity,
  Clock3,
  CheckCircle2,
  BarChart3,
} from "lucide-react";
import Sidebar from "../Sidebar";
import { useEffect, useState } from "react";

function Dashboard() {
  const navigate = useNavigate();
  const [liveStats, setLiveStats] = useState([
    {
      title: "Extensions Generated",
      value: 128,
      suffix: "",
      icon: <Sparkles size={28} />,
    },
    {
      title: "Active Users",
      value: 120,
      suffix: "",
      icon: <Users size={28} />,
    },
    {
      title: "Saved Projects",
      value: 45,
      suffix: "",
      icon: <FolderOpen size={28} />,
    },
    {
      title: "Success Rate",
      value: 96,
      suffix: "%",
      icon: <TrendingUp size={28} />,
    },
  ]);

  const [feedItems, setFeedItems] = useState([
    {
      label: "Generated YouTube Focus Mode",
      status: "Success",
      color: "text-green-400",
    },
    {
      label: "Downloaded Job Tracker",
      status: "Downloaded",
      color: "text-indigo-400",
    },
    {
      label: "Generated Productivity Booster",
      status: "Success",
      color: "text-green-400",
    },
  ]);

  const liveEvents = [
    {
      label: "Built extension bundle",
      status: "Success",
      color: "text-green-400",
    },
    {
      label: "Validated deployment rules",
      status: "Passed",
      color: "text-emerald-300",
    },
    {
      label: "Synced settings to cloud",
      status: "Done",
      color: "text-blue-300",
    },
    {
      label: "New user session started",
      status: "Active",
      color: "text-indigo-300",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats((current) =>
        current.map((item) => {
          if (item.title === "Extensions Generated") {
            return { ...item, value: item.value + Math.floor(Math.random() * 3) + 1 };
          }
          if (item.title === "Active Users") {
            const next = item.value + (Math.random() > 0.5 ? 1 : -1);
            return { ...item, value: Math.max(98, next) };
          }
          if (item.title === "Saved Projects") {
            return { ...item, value: item.value + (Math.random() > 0.7 ? 1 : 0) };
          }
          if (item.title === "Success Rate") {
            const next = item.value + (Math.random() > 0.6 ? 1 : -1);
            return { ...item, value: Math.min(99, Math.max(93, next)) };
          }
          return item;
        })
      );

      setFeedItems((current) => {
        const next = liveEvents[Math.floor(Math.random() * liveEvents.length)];
        return [next, ...current].slice(0, 4);
      });
    }, 3800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <div className="flex-1 p-8">
        <button
          onClick={() => navigate("/")}
          className="mb-6 flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 hover:bg-slate-800 transition"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid gap-6 xl:grid-cols-[1.8fr_1fr]"
        >
          <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-700 p-8 shadow-2xl shadow-violet-500/20">
            <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.18),_transparent_35%)]" />
            <div className="absolute -right-16 top-12 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -left-16 bottom-10 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />
            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-indigo-100/80">
                    Realtime dashboard
                  </p>
                  <h1 className="mt-4 text-5xl font-bold leading-tight">
                    Your extension workspace is live.
                  </h1>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-slate-100 shadow-lg shadow-slate-950/20">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-300 animate-pulse" />
                    Live updates every 4 seconds
                  </div>
                </div>
              </div>

              <p className="mt-6 max-w-2xl text-lg text-indigo-100/90">
                Monitor build status, active sessions, and deployment progress while working on your next Chrome Extension.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl bg-white/10 p-5">
                  <p className="text-sm text-slate-200">Current Flow</p>
                  <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-slate-950/40 px-3 py-2 text-xs text-slate-100">
                    <Clock3 size={16} />
                    Deployment queue
                  </div>
                </div>
                <div className="rounded-3xl bg-white/10 p-5">
                  <p className="text-sm text-slate-200">Team Pulse</p>
                  <p className="mt-3 text-2xl font-semibold">120 online</p>
                </div>
                <div className="rounded-3xl bg-white/10 p-5">
                  <p className="text-sm text-slate-200">Uptime</p>
                  <p className="mt-3 text-2xl font-semibold">99.8%</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.55, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
                    Build Status
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold">Pipeline health</h2>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-sm text-emerald-300">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300 animate-pulse" />
                  Online
                </span>
              </div>

              <div className="mt-6 space-y-5">
                {[
                  { label: "Linting", value: 98 },
                  { label: "Unit tests", value: 92 },
                  { label: "Deploying", value: 85 },
                ].map((item) => (
                  <div key={item.label} className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-slate-400">
                      <span>{item.label}</span>
                      <span>{item.value}%</span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-500 transition-all duration-700"
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
              <div className="flex items-center gap-3 text-slate-300">
                <BarChart3 size={20} />
                <h2 className="text-xl font-semibold">Project pulses</h2>
              </div>

              <div className="mt-6 space-y-4">
                {[
                  { title: "Actions/sec", value: 32 },
                  { title: "Deploys today", value: 8 },
                ].map((item) => (
                  <div key={item.title} className="rounded-3xl bg-slate-950/60 p-4">
                    <div className="flex items-center justify-between text-sm text-slate-400">
                      <span>{item.title}</span>
                      <span className="text-white font-semibold">{item.value}</span>
                    </div>
                    <div className="mt-3 h-2.5 rounded-full bg-slate-800">
                      <div className="h-full w-3/4 rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {liveStats.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index, duration: 0.35 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-lg shadow-slate-950/20"
            >
              <div className="mb-4 text-indigo-400">{item.icon}</div>
              <h3 className="text-slate-400">{item.title}</h3>
              <p className="mt-3 text-4xl font-bold">
                {item.value}
                {item.suffix}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="rounded-3xl border border-white/10 bg-slate-900 p-6"
          >
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold">Realtime activity</h2>
                <p className="text-sm text-slate-500">Latest project events from the live pipeline</p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300">
                <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 animate-pulse" />
                updating now
              </span>
            </div>

            <div className="space-y-3">
              {feedItems.map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-3xl bg-slate-950/70 p-4 transition hover:bg-slate-900">
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-slate-500">Project event captured</p>
                  </div>
                  <span className={`${item.color} rounded-full bg-slate-900 px-3 py-1 text-sm font-medium`}>{item.status}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="rounded-3xl border border-white/10 bg-slate-900 p-6"
          >
            <h2 className="mb-5 text-xl font-semibold">Quick Actions</h2>
            <div className="grid gap-4">
              <button className="flex items-center gap-3 rounded-2xl bg-indigo-600 px-5 py-4 text-left font-medium transition hover:bg-indigo-500">
                <Plus size={20} />
                Generate new extension
              </button>
              <button className="rounded-2xl bg-slate-800 px-5 py-4 text-left transition hover:bg-slate-700">
                View My Extensions
              </button>
              <button className="rounded-2xl bg-slate-800 px-5 py-4 text-left transition hover:bg-slate-700">
                Open analytics dashboard
              </button>
              <button className="rounded-2xl bg-slate-800 px-5 py-4 text-left transition hover:bg-slate-700">
                Sync workspace settings
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
