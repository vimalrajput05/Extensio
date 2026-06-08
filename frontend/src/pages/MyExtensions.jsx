import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Puzzle,
  Download,
  Trash2,
  Eye,
  Search,
  ArrowLeft,
} from "lucide-react";

import Sidebar from "./Sidebar";

function MyExtensions() {
  const navigate = useNavigate();
  const extensions = [
    {
      name: "YouTube Focus Mode",
      description: "Hide Shorts, recommendations and distractions.",
      progress: "95%",
    },
    {
      name: "Job Tracker",
      description: "Track job applications and interviews.",
      progress: "88%",
    },
    {
      name: "Dark Mode Assistant",
      description: "Enable dark mode across websites.",
      progress: "92%",
    },
    {
      name: "Productivity Booster",
      description: "Block distractions and improve focus.",
      progress: "97%",
    },
    {
      name: "AI Note Taker",
      description: "Automatically summarize webpages.",
      progress: "90%",
    },
    {
      name: "Price Tracker",
      description: "Track product prices and alerts.",
      progress: "85%",
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 text-white overflow-hidden">
      <Sidebar />

      <div className="relative flex-1 p-8">
        <motion.button
  whileHover={{ x: -5 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => navigate("/dashboard")}
  className="mb-6 flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 hover:bg-slate-800 transition"
>
  <ArrowLeft size={18} />
  Back to Dashboard
</motion.button>

        {/* Background Glow */}
        <div className="fixed left-20 top-20 h-72 w-72 rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="fixed right-20 bottom-20 h-72 w-72 rounded-full bg-violet-500/10 blur-[120px]" />

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative mb-8 overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-indigo-600/20 via-violet-600/20 to-purple-600/20 p-8"
        >
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl"></div>

          <h1 className="text-5xl font-bold">
            My Extensions 🚀
          </h1>

          <p className="mt-3 text-slate-300">
            Manage, monitor and download all your AI generated
            Chrome extensions.
          </p>
                  <div className="mt-5 flex flex-wrap gap-3">
  <span className="rounded-full bg-green-500/20 px-4 py-2 text-green-400">
    24 Extensions
  </span>

  <span className="rounded-full bg-indigo-500/20 px-4 py-2 text-indigo-400">
    156 Downloads
  </span>

  <span className="rounded-full bg-violet-500/20 px-4 py-2 text-violet-400">
    98% Success Rate
  </span>
</div>

        </motion.div>

        {/* Stats */}
        <div className="mb-8 grid gap-6 md:grid-cols-3">

          <motion.div
            whileHover={{ y: -8 }}
            className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
          >
            <p className="text-slate-400">
              Total Extensions
            </p>

            <h2 className="mt-2 text-4xl font-bold text-indigo-400">
              24
            </h2>
          </motion.div>

          <motion.div
            whileHover={{ y: -8 }}
            className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
          >
            <p className="text-slate-400">
              Downloads
            </p>

            <h2 className="mt-2 text-4xl font-bold text-green-400">
              156
            </h2>
          </motion.div>

          <motion.div
            whileHover={{ y: -8 }}
            className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
          >
            <p className="text-slate-400">
              Success Rate
            </p>

            <h2 className="mt-2 text-4xl font-bold text-violet-400">
              98%
            </h2>
          </motion.div>

        </div>

        {/* Search */}
        <div className="mb-8 flex gap-4">

          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-4 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search extensions..."
              className="w-full rounded-2xl border border-slate-800 bg-slate-900 py-4 pl-12 pr-4 outline-none focus:border-indigo-500"
            />
          </div>

          <button className="rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-4 font-semibold">
            Search
          </button>

        </div>

        {/* Extensions Grid */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {extensions.map((extension, index) => (
            <motion.div
              key={extension.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                y: -12,
                scale: 1.03,
              }}
           className="rounded-3xl border border-slate-800 bg-slate-900 p-6 flex flex-col justify-center min-h-[150px]" >
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-pink-500/10 opacity-0 blur-3xl transition-all duration-500 group-hover:opacity-100"></div>

              <div className="relative z-10">

                {/* Header */}
                <div className="mb-5 flex items-center justify-between">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/20">
                    <Puzzle
                      size={28}
                      className="text-indigo-400"
                    />
                  </div>

                  <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-400">
                    Active
                  </span>

                </div>
<h2 className="text-xl font-bold">
  {extension.name}
</h2>

<div className="mt-2 flex gap-2">
  <span className="rounded-full bg-indigo-500/20 px-2 py-1 text-xs text-indigo-400">
    Productivity
  </span>

  <span className="rounded-full bg-green-500/20 px-2 py-1 text-xs text-green-400">
    AI Powered
  </span>
</div>

<p className="mt-3 text-sm text-slate-400">
  {extension.description}
</p>
<span className="rounded-full bg-indigo-500/20 px-2 py-1 text-xs text-indigo-400">
  {extension.category}
</span>
                {/* Progress */}
                <div className="mt-5">

                  <div className="mb-2 flex justify-between text-xs">
                    <span>Completion</span>
                    <span>{extension.progress}</span>
                  </div>

                  <div className="h-2 rounded-full bg-slate-800">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                      style={{
                        width: extension.progress,
                      }}
                    ></div>
                  </div>

                </div>

                {/* Date */}
                <p className="mt-4 text-xs text-slate-500">
                  Generated on May 2026
                </p>

                {/* Buttons */}
                <div className="mt-6 flex gap-2">

                  <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-800 py-3 hover:bg-slate-700">
                    <Eye size={16} />
                    View
                  </button>

                  <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3">
                    <Download size={16} />
                    Download
                  </button>

                  <button className="rounded-xl bg-red-500/10 px-4 text-red-400 hover:bg-red-500/20">
                    <Trash2 size={18} />
                  </button>

                </div>

              </div>
            </motion.div>
          ))}

        </div>

        {/* Footer */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-slate-500">
          © 2026 Extensio.ai • AI Chrome Extension Generator
        </div>

      </div>
    </div>
  );
}

export default MyExtensions;