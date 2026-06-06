import { useState } from "react";
import { samplePrompts } from "../data/homeData";

function HeroSection() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    if (!prompt.trim()) {
      alert("Please enter your extension idea");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("Later this will connect to backend API");
    }, 2000);
  };

  return (
    <main className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-2">
      <section className="flex flex-col justify-center">
<h2 className="text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl">
  <span className="block">Build Chrome Extensions</span>
  
  <span className="block bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
    using plain English
  </span>
</h2>
<p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">

          Describe what your Chrome extension should do. The AI will generate
          the required extension files like manifest.json, content scripts,
          popup UI, and prepare them for download.
        </p>

        <div className="mt-8">
          <p className="mb-3 text-sm font-semibold text-slate-300">
            Sample prompts
          </p>

          <div className="flex flex-wrap gap-3">
            {samplePrompts.map((item, index) => (
              <button
                key={index}
                onClick={() => setPrompt(item)}
             className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400 hover:bg-white/10 hover:text-white" >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl">

        <div className="mb-6">
          <h3 className="text-2xl font-bold text-white">Generate Extension</h3>
          <p className="mt-2 text-sm text-slate-400">
            Type your idea clearly so the backend can generate proper extension files.
          </p>
        </div>

        <label className="mb-2 block text-sm font-semibold text-slate-300">
          Extension Requirement
        </label>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Example: Create a Chrome extension that hides YouTube shorts..."
          className="h-56 w-full rounded-2xl border border-slate-700 bg-slate-800 p-4 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
        />

        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-slate-500">Be specific for better output</p>
          <p className="text-xs text-slate-500">{prompt.length} characters</p>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400"
        >
          {loading ? "Generating..." : "Generate Extension"}
        </button>
      </section>
    </main>
  );
}

export default HeroSection;