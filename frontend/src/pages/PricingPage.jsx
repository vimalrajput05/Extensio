import { motion } from "framer-motion";
import { Crown, ShieldCheck, Zap, Rocket, Wand2, Cloud } from "lucide-react";
import { Star, CheckCircle, Users, Sparkles } from "lucide-react";
  import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";


const proFeatures = [

  {
    icon: Rocket,
    title: "API-Based Extensions",
    desc: "Create powerful extensions with external API integrations.",
  },
  {
    icon: Crown,
    title: "Unlimited Projects",
    desc: "Build and manage unlimited Chrome extension projects.",
  },
  {
    icon: Zap,
    title: "Priority Processing",
    desc: "Faster AI generation with optimized performance.",
  },
  {
    icon: Wand2,
    title: "Advanced Editing",
    desc: "Modify extensions deeply with intelligent prompts.",
  },
  {
    icon: Cloud,
    title: "Cloud Storage",
    desc: "Save all your generated projects securely in cloud.",
  },
  {
    icon: ShieldCheck,
    title: "Premium Security",
    desc: "Advanced protection for generated extension files.",
  },
];

function PricingPage() {
  const navigate = useNavigate();
  
  return (
    
    <div className="min-h-screen bg-slate-950 text-white">
      
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.22),_transparent_40%),radial-gradient(circle_at_bottom_left,_rgba(168,85,247,0.22),_transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-20">
<motion.button
  whileHover={{ x: -5 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => navigate("/dashboard")}
  className="mb-8 flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 hover:bg-slate-800 transition"
>
  <ArrowLeft size={18} />
  Back to Dashboard
</motion.button>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-block px-4 py-1 text-sm font-semibold text-violet-300 border border-violet-400/30 rounded-full bg-violet-500/10">
              Pricing
            </span>
            <h1 className="mt-5 text-4xl md:text-5xl font-bold">Choose your plan</h1>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
              Free is limited to 3 extension generations. Pro includes unlimited extensions and all
              premium capabilities.
            </p>
          </motion.div>
          <div className="mt-12 grid gap-6 md:grid-cols-4">
  {[
    { title: "50K+", sub: "Extensions Generated" },
    { title: "15K+", sub: "Premium Users" },
    { title: "98%", sub: "AI Accuracy" },
    { title: "24/7", sub: "Support" },
  ].map((item) => (
    <div
      key={item.title}
      className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl"
    >
      <h2 className="text-3xl font-bold text-violet-400">
        {item.title}
      </h2>
      <p className="mt-2 text-slate-400">
        {item.sub}
      </p>
    </div>
  ))}
</div>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {/* Free */}
            <motion.div
  whileHover={{ scale: 1.03 }}
  className="rounded-[30px] border border-indigo-500/20 bg-gradient-to-br from-slate-900 to-slate-800 p-8"
>
  <h2 className="text-3xl font-bold">
    Free Plan
  </h2>

  <p className="mt-2 text-slate-400">
    Perfect for beginners
  </p>

  <div className="mt-6 text-6xl font-bold text-indigo-400">
    3
  </div>

  <p className="text-slate-400">
    Extensions Included
  </p>

  <div className="mt-8 space-y-4">
    <div>✅ Basic Generation</div>
    <div>✅ Download ZIP Files</div>
    <div>✅ Community Support</div>
    <div>❌ Cloud Storage</div>
    <div>❌ API Integrations</div>
  </div>

  <button className="mt-8 w-full rounded-2xl bg-slate-700 py-4 font-bold">
    Current Plan
  </button>
</motion.div>
            {/* Pro */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative rounded-[30px] border border-violet-500/30 bg-gradient-to-b from-violet-500/10 to-white/5 backdrop-blur-xl p-8"
            >
              <div className="absolute -top-4 left-8 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-sm font-semibold border border-white/10">
                Most Popular
              </div>
              <motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  className="mt-24"
>
  <h2 className="mb-10 text-center text-4xl font-bold">
    Premium Templates
  </h2>

  <div className="grid gap-6 md:grid-cols-3">
    {[
      "YouTube Focus Pro",
      "AI Study Assistant",
      "Amazon Price Tracker",
      "LinkedIn Job Tracker",
      "Productivity Booster",
      "AI Note Summarizer",
    ].map((item) => (
      <div
        key={item}
        className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:scale-105 transition"
      >
        <Sparkles className="mb-4 text-violet-400" />
        <h3 className="font-bold text-xl">
          {item}
        </h3>
      </div>
    ))}
  </div>
</motion.div>

              <div className="pt-4 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Pro</h2>
                  <p className="mt-2 text-sm text-slate-300">Unlimited + all premium features</p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-violet-300 uppercase tracking-wide">Unlimited</div>
                </div>
              </div>

              <div className="mt-6">
                <div className="text-4xl font-bold">∞</div>
                <div className="text-slate-300">extensions included</div>
              </div>

              <ul className="mt-8 space-y-4">
                {proFeatures.map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-200">
                      <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-500/20 border border-indigo-500/30">
                        <Icon size={14} className="text-indigo-200" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">{f.title}</div>
                        <div className="text-slate-400">{f.desc}</div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-9 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 p-[1px] shadow-[0_20px_80px_rgba(99,102,241,0.35)]">
                <div className="rounded-2xl bg-slate-950 p-5">
                  <p className="text-sm text-slate-300">
                    All Pro features included. No feature removals.
                  </p>
                  <p className="mt-1 text-xs text-violet-300">
                    (Payment/upgrade integration can be wired to your backend later.)
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="mt-24">
  <h2 className="mb-10 text-center text-4xl font-bold">
    Loved By Developers
  </h2>

  <div className="grid gap-6 md:grid-cols-3">
    {[1, 2, 3].map((item) => (
      <div
        key={item}
        className="rounded-3xl border border-white/10 bg-white/5 p-6"
      >
        <div className="mb-4 flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              size={18}
              className="fill-yellow-400 text-yellow-400"
            />
          ))}
        </div>

        <p className="text-slate-300">
          Generated my extension in minutes.
          Amazing experience.
        </p>

        <p className="mt-4 text-violet-400">
          Frontend Developer
        </p>
      </div>
    ))}
  </div>
</div>
        </div>
      </div>
      <div className="mt-24 rounded-[40px] bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 p-12 text-center">
  <h2 className="text-5xl font-bold">
    Ready To Go Pro? 🚀
  </h2>

  <p className="mt-4 text-xl text-white/90">
    Build unlimited AI-powered Chrome extensions.
  </p>

  <button className="mt-8 rounded-2xl bg-white px-10 py-4 font-bold text-black hover:scale-105 transition">
    Start Pro Trial
  </button>
</div>
    </div>
    
  );
}

export default PricingPage;

