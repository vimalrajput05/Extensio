import { motion } from "framer-motion";
import {
  Sparkles,
  Wand2,
  Zap,
  ShieldCheck,
  FileCode,
  Lightbulb,
} from "lucide-react";
import Sidebar from "./Sidebar";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function GenerateExtension() {
  const [step, setStep] = useState("");
  const [showFiles, setShowFiles] = useState(false);
  const [loading, setLoading] = useState(false);
const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const handleGenerate = () => {
  setLoading(true);
  setProgress(0);
  setShowFiles(false);

  let value = 0;

  const timer = setInterval(() => {
    value += 20;
    setProgress(value);

    if (value === 20)
      setStep("🤖 Analyzing Requirements...");

    if (value === 40)
      setStep("📄 Creating manifest.json...");

    if (value === 60)
      setStep("⚙️ Generating Content Scripts...");

    if (value === 80)
      setStep("🎨 Building Popup UI...");

    if (value >= 100) {
      setStep("✅ Packaging Extension...");
      clearInterval(timer);

      setTimeout(() => {
        setShowFiles(true);
        setStep("🚀 Extension Generated Successfully!");
      }, 1000);
    }
  }, 800);
};

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

        {/* Hero Section */}
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

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-3">

          {/* Left Side */}
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
>
  ✨ Generate Extension
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

    <div className="mt-4 text-sm text-slate-400">
      {progress < 20 && "Analyzing Requirements..."}
      {progress >= 20 && progress < 40 && "Generating Manifest..."}
      {progress >= 40 && progress < 60 && "Creating Content Scripts..."}
      {progress >= 60 && progress < 80 && "Building Popup UI..."}
      {progress >= 80 && progress < 100 && "Packaging Extension..."}
      {progress === 100 && "✅ Extension Generated Successfully"}
    </div>
  </div>
)}
{loading && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="mt-4 rounded-xl bg-slate-800 p-4"
  >
    <p className="text-indigo-400 font-medium">
      {step}
    </p>
  </motion.div>
)}
              {/* Templates */}
              <div className="mt-8">
                <h3 className="mb-4 text-lg font-semibold">
                  Popular Templates
                </h3>

                <div className="flex flex-wrap gap-3">
                  {[
                    "YouTube Blocker",
                    "Job Tracker",
                    "Dark Mode Tool",
                    "Productivity Booster",
                    "Price Tracker",
                    "AI Note Taker",
                  ].map((item) => (
                    <button
                      key={item}
                      className="rounded-full bg-slate-800 px-4 py-2 transition hover:bg-indigo-600"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Features */}
            <div className="mt-8 grid gap-6 md:grid-cols-3">

              <motion.div
                whileHover={{ y: -10, scale: 1.03 }}
                className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
              >
                <Zap className="mb-4 text-yellow-400" />
                <h3 className="mb-2 font-bold">
                  Instant Generation
                </h3>
                <p className="text-sm text-slate-400">
                  Generate extension structures instantly.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -10, scale: 1.03 }}
                className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
              >
                <ShieldCheck className="mb-4 text-green-400" />
                <h3 className="mb-2 font-bold">
                  Secure Code
                </h3>
                <p className="text-sm text-slate-400">
                  Clean and secure extension architecture.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -10, scale: 1.03 }}
                className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
              >
                <Wand2 className="mb-4 text-indigo-400" />
                <h3 className="mb-2 font-bold">
                  Production Ready
                </h3>
                <p className="text-sm text-slate-400">
                  Built with scalability and deployment in mind.
                </p>
              </motion.div>

            </div>

            {/* Preview */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-6"
            >
{showFiles ? (
  <div className="space-y-3">
    {files.map((file, index) => (
      <motion.div
        key={file}
        initial={{
          opacity: 0,
          x: -40,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          delay: index * 0.2,
        }}
        className="flex items-center gap-3 rounded-xl bg-slate-800 p-3"
      >
        <FileCode size={18} />
        {file}
      </motion.div>
    ))}
  </div>
) : (
  <p className="text-slate-400">
    Generate an extension to preview files...
  </p>
)}
              <div className="space-y-3">
                {[
                  "manifest.json",
                  "background.js",
                  "content.js",
                  "popup.html",
                  "popup.css",
                  "popup.js",
                ].map((file) => (
                  <div
                    key={file}
                    className="flex items-center gap-3 rounded-xl bg-slate-800 p-3"
                  >
                    <FileCode size={18} />
                    {file}
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-slate-800 bg-slate-900 p-6 h-fit"
          >
            <Lightbulb
              size={28}
              className="mb-4 text-yellow-400"
            />

            <h2 className="mb-4 text-xl font-bold">
              AI Tips
            </h2>

            <div className="space-y-4 text-slate-300">

              <div className="rounded-xl bg-slate-800 p-4">
                Mention the extension purpose clearly.
              </div>

              <div className="rounded-xl bg-slate-800 p-4">
                Specify popup UI requirements.
              </div>

              <div className="rounded-xl bg-slate-800 p-4">
                Mention API integrations.
              </div>

              <div className="rounded-xl bg-slate-800 p-4">
                Define permissions needed.
              </div>

              <div className="rounded-xl bg-slate-800 p-4">
                Include storage requirements.
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </div>
  

  );
}

export default GenerateExtension;