import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Download, Trash2, Eye, Search, ArrowLeft, Puzzle } from "lucide-react";

import { useEffect, useState } from "react";
import { API_BASE, TOKEN_KEY } from "../config/api";
import Sidebar from "../Sidebar";

function MyExtensions() {
  const navigate = useNavigate();
  const [extensions, setExtensions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    const fetchMyExtensions = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API_BASE}/api/extensions/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          setError(data?.error || "Failed to load extensions");
          return;
        }

        setExtensions(data.extensions || []);
      } catch (e) {
        setError(e?.message || "Failed to load extensions");
      } finally {
        setLoading(false);
      }
    };

    fetchMyExtensions();
  }, [navigate]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    const ok = window.confirm("Delete this extension? This cannot be undone.");
    if (!ok) return;

    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API_BASE}/api/extensions/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error || data?.message || "Failed to delete extension");
        return;
      }

      setExtensions((prev) => prev.filter((x) => x._id !== id && x.id !== id));
    } catch (e) {
      setError(e?.message || "Failed to delete extension");
    } finally {
      setLoading(false);
    }
  };

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

        {error ? (
          <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        ) : null}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative mb-8 overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-indigo-600/20 via-violet-600/20 to-purple-600/20 p-8"
        >
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl" />

          <h1 className="text-5xl font-bold">My Extensions 🚀</h1>
          <p className="mt-3 text-slate-300">
            Manage, monitor and download all your AI generated Chrome extensions.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <span className="rounded-full bg-green-500/20 px-4 py-2 text-green-400">
              {extensions.length} Extensions
            </span>
            <span className="rounded-full bg-indigo-500/20 px-4 py-2 text-indigo-400">
              Downloads
            </span>
            <span className="rounded-full bg-violet-500/20 px-4 py-2 text-violet-400">
              Success Rate
            </span>
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <motion.div whileHover={{ y: -8 }} className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-slate-400">Total Extensions</p>
            <h2 className="mt-2 text-4xl font-bold text-indigo-400">{extensions.length}</h2>
          </motion.div>

          <motion.div whileHover={{ y: -8 }} className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-slate-400">Downloads</p>
            <h2 className="mt-2 text-4xl font-bold text-green-400">0</h2>
          </motion.div>

          <motion.div whileHover={{ y: -8 }} className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-slate-400">Success Rate</p>
            <h2 className="mt-2 text-4xl font-bold text-violet-400">0%</h2>
          </motion.div>
        </div>

        <div className="mb-8 flex gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search extensions..."
              className="w-full rounded-2xl border border-slate-800 bg-slate-900 py-4 pl-12 pr-4 outline-none focus:border-indigo-500"
              disabled
            />
          </div>
          <button
            className="rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-4 font-semibold"
            disabled
          >
            Search
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {loading && extensions.length === 0 ? (
            <div className="col-span-full text-slate-300">Loading...</div>
          ) : null}

          {extensions.map((extension, index) => {
            const id = extension._id || extension.id;
            return (
              <motion.div
                key={id || extension.title || index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -12, scale: 1.03 }}
                className="rounded-3xl border border-slate-800 bg-slate-900 p-6 flex flex-col justify-center min-h-[150px] relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-pink-500/10 opacity-0 blur-3xl transition-all duration-500 group-hover:opacity-100" />

                <div className="relative z-10">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/20">
                      <Puzzle size={28} className="text-indigo-400" />
                    </div>
                    <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-400">
                      {extension.status || "generated"}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold">{extension.title || extension.name || "Untitled"}</h2>
                  <p className="mt-3 text-sm text-slate-400">
                    {extension.prompt ? extension.prompt.slice(0, 120) : extension.description || ""}
                  </p>

                  <div className="mt-5">
                    <div className="mb-2 flex justify-between text-xs">
                      <span>Completion</span>
                      <span>{extension.status === "failed" ? "0%" : "100%"}</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-800">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                        style={{ width: extension.status === "failed" ? "0%" : "100%" }}
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex gap-2">
                    <button
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-800 py-3 hover:bg-slate-700"
                      onClick={() => {
                        if (!id) return;
                        navigate(`/generate?extensionId=${id}`);
                      }}
                      disabled={!id}
                    >
                      <Eye size={16} />
                      View
                    </button>

                    <button
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3"
                      onClick={() => {
                        if (!id) return;
                        window.location.href = `${API_BASE}/api/extensions/download/${id}`;
                      }}
                      disabled={!id}
                    >
                      <Download size={16} />
                      Download
                    </button>

                    <button
                      className="rounded-xl bg-red-500/10 px-4 text-red-400 hover:bg-red-500/20"
                      onClick={() => handleDelete(id)}
                      disabled={!id || loading}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-slate-500">
          © 2026 Extensio.ai • AI Chrome Extension Generator
        </div>
      </div>
    </div>
  );
}

export default MyExtensions;

