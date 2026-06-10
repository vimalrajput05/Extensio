import { motion } from "framer-motion";
import Sidebar from "../pages/Sidebar";
function Premium() {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <div className="flex-1 p-8">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 p-10"
        >
          <h1 className="text-6xl font-bold">
            Extensio Pro 🚀
          </h1>

          <p className="mt-4 text-xl">
            Unlock AI-powered extension generation with premium tools.
          </p>
        </motion.div>

      </div>
    </div>
  );
}

export default Premium;