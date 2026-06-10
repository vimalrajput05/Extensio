import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import "../App.css";
import {
  Sparkles,
  Users,
  FolderOpen,
  TrendingUp,
} from "lucide-react";
import Sidebar from "../Sidebar";
import { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
} from "recharts";

function Dashboard() {
  const navigate = useNavigate();
  const [selectedMetric, setSelectedMetric] = useState("users");

  const chartData = [
    { period: "Jan", users: 120, downloads: 90, conversions: 18 },
    { period: "Feb", users: 180, downloads: 135, conversions: 30 },
    { period: "Mar", users: 215, downloads: 170, conversions: 44 },
    { period: "Apr", users: 260, downloads: 210, conversions: 52 },
    { period: "May", users: 320, downloads: 255, conversions: 68 },
    { period: "Jun", users: 390, downloads: 320, conversions: 85 },
  ];

  const insights = [
    {
      title: "Active users grew 28% this quarter",
      description: "Your newest AI extension wave is driving higher engagement and reuse.",
      accent: "text-emerald-400",
    },
    {
      title: "Conversion rate is strong",
      description: "Extensions generated with personalization convert at a 12% higher rate.",
      accent: "text-indigo-400",
    },
    {
      title: "Top extension: Job Tracker",
      description: "Highest downloads and repeat installs from enterprise users.",
      accent: "text-violet-400",
    },
  ];

  const metricMeta = useMemo(
    () => ({
      users: { label: "User Growth", color: "#818cf8", description: "Sessions and signups over time." },
      downloads: { label: "Downloads", color: "#38bdf8", description: "Extension downloads trend." },
      conversions: { label: "Conversion Rate", color: "#a855f7", description: "Extension completions and installs." },
    }),
    []
  );

  const selectedMeta = metricMeta[selectedMetric];

  const stats = [
    {
      title: "Extensions Generated",
      value: "128",
      change: "+18% this month",
      icon: <Sparkles size={28} />,
      accent: "from-violet-500 to-indigo-400",
    },
    {
      title: "Active Users",
      value: "1,245",
      change: "+22% since last week",
      icon: <Users size={28} />,
      accent: "from-cyan-400 to-sky-500",
    },
    {
      title: "Saved Projects",
      value: "45",
      change: "+12 new saves",
      icon: <FolderOpen size={28} />,
      accent: "from-rose-500 to-fuchsia-500",
    },
    {
      title: "Success Rate",
      value: "96%",
      change: "+4% improvement",
      icon: <TrendingUp size={28} />,
      accent: "from-emerald-400 to-lime-400",
    },
  ];

  const activity = [
    {
      title: "Job Tracker",
      category: "Top install",
      description: "Most engaged users are using this extension for daily workflows.",
      value: "+25%",
      progress: 82,
      badgeClass: "bg-cyan-400/15 text-cyan-200",
      barClass: "bg-cyan-400",
    },
    {
      title: "AI Code Helper",
      category: "Highest retention",
      description: "Repeat installs grew after the latest update.",
      value: "+17%",
      progress: 68,
      badgeClass: "bg-violet-400/15 text-violet-200",
      barClass: "bg-violet-400",
    },
    {
      title: "Design Companion",
      category: "Fastest growth",
      description: "Steady month-over-month growth from creative teams.",
      value: "+34%",
      progress: 93,
      badgeClass: "bg-emerald-400/15 text-emerald-200",
      barClass: "bg-emerald-400",
    },
  ];

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
          whileHover={{ y: -10, scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative overflow-hidden rounded-3xl p-8 mb-8 glass-hero"
        >
          <div className="absolute top-0 right-0 h-40 w-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="fixed top-20 left-20 h-72 w-72 rounded-full bg-indigo-500/10 blur-[120px]" />
          <div className="fixed bottom-20 right-20 h-72 w-72 rounded-full bg-violet-500/10 blur-[120px]" />
          <div className="relative z-10">
            <h1 className="text-5xl font-bold mb-3">Analytics Dashboard</h1>
            <p className="text-lg text-indigo-100">
              Monitor growth, downloads and conversion performance across your extensions.
            </p>
            <button
              onClick={() => navigate("/analytics")}
              className="mt-6 rounded-xl bg-white text-slate-900 px-6 py-3 font-semibold hover:scale-105 transition"
            >
              View Full Analytics
            </button>
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -8, scale: 1.03 }}
              className="rounded-3xl p-6 glass"
            >
              <div className="dashboard-card-icon mb-4">
                {item.icon}
              </div>
              <h3 className="text-slate-400">{item.title}</h3>
              <p className="mt-2 text-4xl font-bold">{item.value}</p>
              <p className="mt-3 text-sm text-slate-500">{item.change}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl p-6 glass"
          >
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-bold">Performance Trend</h2>
                <p className="mt-2 text-slate-400">{selectedMeta.description}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.keys(metricMeta).map((metric) => (
                  <button
                    key={metric}
                    onClick={() => setSelectedMetric(metric)}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      selectedMetric === metric
                        ? "border-indigo-400 bg-indigo-500/20 text-indigo-100"
                        : "border-slate-700 text-slate-300 hover:border-slate-500 hover:bg-slate-800"
                    }`}
                  >
                    {metricMeta[metric].label}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(148,163,184,0.15)" strokeDasharray="3 3" />
                  <XAxis dataKey="period" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #334155" }} />
                  <Line
                    type="monotone"
                    dataKey={selectedMetric}
                    stroke={selectedMeta.color}
                    strokeWidth={3}
                    dot={{ r: 4, fill: selectedMeta.color }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl p-6 glass"
          >
            <h2 className="mb-6 text-xl font-bold">Downloads & Conversions</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(148,163,184,0.15)" strokeDasharray="3 3" />
                  <XAxis dataKey="period" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #334155" }} />
                  <Legend />
                  <Bar dataKey="downloads" fill="#38bdf8" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="conversions" fill="#c084fc" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 rounded-3xl p-6 glass"
        >
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold">Extension Pulse</h2>
              <p className="mt-2 text-slate-400">
                Track the fastest-growing extensions and engagement signals across your app.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/80 px-4 py-2 text-sm text-slate-300">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" /> Live updates
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {activity.map((item) => (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-slate-950/70 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{item.category}</p>
                    <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.badgeClass}`}>
                    {item.value}
                  </span>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
                  <div className={`${item.barClass} h-full rounded-full`} style={{ width: `${item.progress}%` }} />
                </div>
                <p className="mt-3 text-sm text-slate-400">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
          <div className="rounded-3xl p-6 glass">
            <h2 className="mb-6 text-2xl font-bold">Insights</h2>
            <div className="grid gap-4">
              {insights.map((item) => (
                <div key={item.title} className="rounded-3xl p-5 glass-soft">
                  <p className={`mb-2 text-sm font-semibold uppercase tracking-[0.2em] ${item.accent}`}>
                    Insight
                  </p>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-slate-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl p-6 glass">
            <h2 className="mb-6 text-2xl font-bold">Quick Wins</h2>
            <div className="space-y-4">
              <div className="rounded-3xl p-4 glass-soft">
                <p className="text-slate-400">Focus on extension templates with the highest repeat installs to boost conversion.</p>
              </div>
              <div className="rounded-3xl p-4 glass-soft">
                <p className="text-slate-400">Push a new onboarding flow for first-time creators to lift signups by 15%.</p>
              </div>
              <div className="rounded-3xl p-4 glass-soft">
                <p className="text-slate-400">Highlight the top-performing extension in the dashboard for faster user decisions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
