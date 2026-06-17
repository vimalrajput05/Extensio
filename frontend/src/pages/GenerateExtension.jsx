import { motion } from "framer-motion";
import {
  Sparkles,
  Wand2,
  Zap,
  ShieldCheck,
  FileCode,
  Lightbulb,
  ArrowLeft,
} from "lucide-react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { API_BASE, TOKEN_KEY } from "../config/api";

function GenerateExtension() {
  const [step, setStep] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showFiles, setShowFiles] = useState(false);
  const [files, setFiles] = useState([]);

  const [downloadUrl, setDownloadUrl] = useState('');

  const navigate = useNavigate();

  const handleGenerate = async () => {
    const token = localStorage.getItem(TOKEN_KEY) || '';
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }

    const promptEl = document.querySelector('textarea');
    const prompt = promptEl?.value || '';

    if (!prompt || !prompt.trim()) {
      alert('Please enter your extension idea');
      return;
    }

    setLoading(true);
    setProgress(0);
    setShowFiles(false);
    setFiles([]);
    setDownloadUrl('');

    let timer = null;
    let value = 0;

    timer = setInterval(() => {
      value += 20;
      setProgress(value);

      if (value === 20) setStep('🤖 Analyzing Requirements...');
      if (value === 40) setStep('📄 Creating manifest.json...');
      if (value === 60) setStep('⚙️ Generating Content Scripts...');
      if (value === 80) setStep('🎨 Building Popup UI...');
    }, 800);

    try {
      const res = await fetch(`${API_BASE}/api/extensions/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt, title: 'Untitled Extension' }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.success) {
        throw new Error(data?.error || 'Generate failed');
      }

      setProgress(100);
      setStep('✅ Extension Generated Successfully!');

      // Response contains:
      // files: [{filename, content}]
      // downloadUrl: '/api/extensions/download/<id>'
      setFiles(data.files || []);
      setDownloadUrl(data.downloadUrl || '');
      setShowFiles(true);
    } catch (e) {
      setStep('❌ Failed to generate extension');
      alert(e.message || 'Failed to generate');
    } finally {
      if (timer) clearInterval(timer);
      setLoading(false);
    }
  };

  const previewNames = files.map((f) => f?.filename).filter(Boolean);

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

        <div className="fixed left-20 top-20 h-72 w-72 rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="fixed right-20 bottom-20 h-72 w-72 rounded-full bg-violet-500/10 blur-[120px]" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mb-8 overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-indigo-600/20 via-violet-600/20 to-purple-600/20 p-8"
        >
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl"></div>

          <h1 className="text-5xl font-bold">
            Build Chrome Extensions
            <span className="block bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Using Plain English ✨
            </span>
          </h1>

          <p className="mt-4 max-w-3xl text-slate-300">
            Describe your idea and let AI generate extension structures,
            scripts, manifests and UI automatically.
          </p>
        </motion.div>

        <div className="mt-4 flex gap-3">
          <span className="rounded-full bg-green-500/20 px-4 py-2 text-green-400">
            Beginner Friendly
          </span>

          <span className="rounded-full bg-indigo-500/20 px-4 py-2 text-indigo-400">
            AI Powered
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <div className="rounded-xl bg-slate-800 px-4 py-3">⚡ Estimated Time: 5 Seconds</div>
          <div className="rounded-xl bg-slate-800 px-4 py-3">📦 Output: AI Files</div>
          <div className="rounded-xl bg-slate-800 px-4 py-3">🔒 Manifest V3 Ready</div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl border border-slate-800 bg-slate-900 p-8"
            >
              <label className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <Sparkles size={20} />
                Extension Requirement
              </label>

              <textarea
                className="h-64 w-full rounded-2xl border border-slate-700 bg-slate-800 p-5 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                placeholder="Create a Chrome extension that blocks YouTube Shorts, tracks productivity and generates weekly reports..."
              />

              <motion.button
                onClick={handleGenerate}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 py-4 text-lg font-bold"
                disabled={loading}
              >
                {loading ? 'Generating...' : '✨ Generate Extension'}
              </motion.button>

              {loading && (
                <div className="mt-6">
                  <div className="mb-2 flex justify-between text-sm">
                    <span>Generating Extension...</span>
                    <span>{progress}%</span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      className="h-full bg-gradient-to-r from-indigo-500 to-violet-500"
                    />
                  </div>

                  <div className="mt-4 text-sm text-slate-400">{step || 'Working...'}</div>
                </div>
              )}

              {showFiles && downloadUrl && (
                <button
                  className="mt-4 w-full rounded-2xl bg-green-600 py-4 font-bold hover:bg-green-500 transition"
                  onClick={() => {
                    window.location.href = `${API_BASE}${downloadUrl}`;
                  }}
                >
                  📦 Download Extension ZIP
                </button>
              )}

              <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-6">
                <div className="text-sm text-slate-400 mb-3">Preview</div>

                {previewNames.length ? (
                  <div className="space-y-3">
                    {previewNames.map((name, index) => (
                      <motion.div
                        key={name + index}
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-3 rounded-xl bg-slate-800 p-3"
                      >
                        <FileCode size={18} />
                        {name}
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400">Generate an extension to preview files...</p>
                )}
              </div>
            </motion.div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 h-fit">
            <Lightbulb size={28} className="mb-4 text-yellow-400" />
            <h2 className="mb-4 text-xl font-bold">AI Tips</h2>

            <div className="space-y-4 text-slate-300">
              <div className="rounded-xl bg-slate-800 p-4">Mention the extension purpose clearly.</div>
              <div className="rounded-xl bg-slate-800 p-4">Specify popup UI requirements.</div>
              <div className="rounded-xl bg-slate-800 p-4">Mention API integrations.</div>
              <div className="rounded-xl bg-slate-800 p-4">Define permissions needed.</div>
              <div className="rounded-xl bg-slate-800 p-4">Include storage requirements.</div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-1">
              <motion.div whileHover={{ y: -10, scale: 1.03 }} className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                <Zap className="mb-4 text-yellow-400" />
                <h3 className="mb-2 font-bold">Instant Generation</h3>
                <p className="text-sm text-slate-400">Generate extension structures instantly.</p>
              </motion.div>
              <motion.div whileHover={{ y: -10, scale: 1.03 }} className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                <ShieldCheck className="mb-4 text-green-400" />
                <h3 className="mb-2 font-bold">Secure Code</h3>
                <p className="text-sm text-slate-400">Clean and secure extension architecture.</p>
              </motion.div>
              <motion.div whileHover={{ y: -10, scale: 1.03 }} className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                <Wand2 className="mb-4 text-indigo-400" />
                <h3 className="mb-2 font-bold">Production Ready</h3>
                <p className="text-sm text-slate-400">Built with scalability and deployment in mind.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenerateExtension;

