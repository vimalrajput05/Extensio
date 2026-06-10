import { motion } from "framer-motion";
import {
  Rocket,
  Crown,
  Zap,
  Wand2,
  Cloud,
  ShieldCheck,
} from "lucide-react";

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

function ProFeatures() {
  return (
    <section id="pricing" className="relative bg-black py-24 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.25),_transparent_40%),radial-gradient(circle_at_bottom_left,_rgba(168,85,247,0.25),_transparent_40%)]"></div>

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 text-sm font-semibold text-violet-300 border border-violet-400/30 rounded-full bg-violet-500/10">
            Pro Features
          </span>

          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-white">
            Unlock Premium Power
          </h2>

          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            Experience advanced features, faster generation, and unlimited
            capabilities with Pro plan.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {proFeatures.map((item, i) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                whileHover={{
                  scale: 1.08,
                  rotateX: 6,
                  rotateY: -6,
                }}
                className="group relative rounded-[30px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-[30px] bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20 opacity-0 group-hover:opacity-100 blur-xl transition"></div>

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-xl">
                    <Icon size={30} className="text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm text-slate-300 leading-7">
                    {item.desc}
                  </p>

                  <span className="mt-5 inline-block text-xs text-violet-300 uppercase tracking-wide">
                    Pro Only
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-20 rounded-[32px] border border-violet-500/30 bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 p-[1px] shadow-[0_20px_80px_rgba(99,102,241,0.4)]"
        >
          <div className="rounded-[32px] bg-black px-8 py-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white">
                Upgrade to Pro 🚀
              </h3>
              <p className="mt-2 text-slate-300">
                Unlock unlimited features and build smarter extensions faster.
              </p>
            </div>

            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 rounded-xl bg-white text-black font-semibold"
              >
                Upgrade Now
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 rounded-xl border border-white/30 text-white"
              >
                View Pricing
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ProFeatures;