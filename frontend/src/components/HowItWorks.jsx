import { motion } from "framer-motion";
import { PencilLine, Sparkles, Download } from "lucide-react";

const steps = [
  {
    icon: PencilLine,
    title: "Enter Your Idea",
    desc: "Describe your Chrome extension requirement in plain English.",
  },
  {
    icon: Sparkles,
    title: "AI Generates Files",
    desc: "AI creates manifest, scripts, and UI automatically.",
  },
  {
    icon: Download,
    title: "Download & Use",
    desc: "Download and install extension instantly.",
  },
];

function HowItWorks() {
  return (
    <section className="bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p className="text-indigo-400 font-semibold uppercase text-sm">
            Workflow
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
            How It Works
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5 }}
                className="group relative rounded-[30px] border border-slate-800 bg-slate-900 p-8 shadow-lg"
              >
                {/* Glow */}
                <div className="absolute inset-0 rounded-[30px] bg-gradient-to-br from-indigo-500/20 to-violet-500/20 opacity-0 group-hover:opacity-100 blur-xl transition"></div>

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 shadow-lg">
                    <Icon size={30} className="text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-white">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-slate-400 text-sm leading-7">
                    {step.desc}
                  </p>

                  <p className="mt-4 text-xs text-indigo-400 uppercase">
                    Step {i + 1}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;