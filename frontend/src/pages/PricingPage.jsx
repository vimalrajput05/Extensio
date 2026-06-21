import { motion } from "framer-motion";
import { Crown, ShieldCheck, Zap, Rocket, Wand2, Cloud } from "lucide-react";

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
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.22),_transparent_40%),radial-gradient(circle_at_bottom_left,_rgba(168,85,247,0.22),_transparent_40%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20">
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

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {/* Free */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-xl p-8"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Free</h2>
                  <p className="mt-2 text-sm text-slate-400">For trying the generator</p>
                </div>
                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-white/10 text-slate-200 border border-white/10">
                  $0
                </span>
              </div>

              <div className="mt-6">
                <div className="text-4xl font-bold">3</div>
                <div className="text-slate-400">extensions included</div>
              </div>

              <ul className="mt-8 space-y-3">
                {["Basic generation", "Download generated extension files", "Community support"].map(
                  (t, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-200">
                      <span className="mt-1 inline-block h-5 w-5 rounded-full bg-emerald-500/15 border border-emerald-500/30" />
                      <span>{t}</span>
                    </li>
                  )
                )}
              </ul>

              <div className="mt-8 rounded-2xl bg-black/30 border border-white/10 p-4">
                <p className="text-sm text-slate-300">
                  Upgrade to Pro for unlimited extensions and premium features.
                </p>
              </div>
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
        </div>
      </div>
    </div>
  );
}

export default PricingPage;

