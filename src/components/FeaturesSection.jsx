import { motion } from "framer-motion";
import {
  Sparkles,
  FileCode,
  Download,
  PenTool,
  LayoutDashboard,
  ShieldCheck,
} from "lucide-react";

const features = [
  { icon: Sparkles, title: "AI Generation" },
  { icon: FileCode, title: "Clean Code Output" },
  { icon: Download, title: "ZIP Download" },
  { icon: PenTool, title: "Edit Requests" },
  { icon: LayoutDashboard, title: "Dashboard" },
  { icon: ShieldCheck, title: "Secure Output" },
];

function FeaturesSection() {
  return (
    <section id="features" className="bg-black py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Features
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const Icon = f.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{
                  scale: 1.08,
                  rotate: 1,
                }}
                className="group relative overflow-hidden rounded-[28px] border border-slate-800 bg-slate-900 p-8"
              >
                {/* Animated glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition"></div>

                <div className="relative z-10">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 shadow-xl">
                    <Icon size={30} className="text-white" />
                  </div>

                  <h3 className="text-xl font-semibold text-white">
                    {f.title}
                  </h3>

                  <p className="mt-3 text-sm text-slate-400">
                    Powerful feature to enhance your extension workflow.
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

export default FeaturesSection;