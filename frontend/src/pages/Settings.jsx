import { motion } from "framer-motion";
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Save,
} from "lucide-react";
import Sidebar from "./Sidebar";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";


function Settings() {
    const navigate = useNavigate();
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

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-indigo-600/20 via-violet-600/20 to-purple-600/20 p-8"
        >
          <h1 className="text-5xl font-bold">
            Settings ⚙️
          </h1>

          <p className="mt-3 text-slate-300">
            Manage your account preferences and platform settings.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">

          {/* Profile Settings */}
          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
          >
            <div className="mb-6 flex items-center gap-3">
              <User className="text-indigo-400" />
              <h2 className="text-xl font-bold">
                Profile Settings
              </h2>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 p-4 outline-none focus:border-indigo-500"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 p-4 outline-none focus:border-indigo-500"
              />
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
          >
            <div className="mb-6 flex items-center gap-3">
              <Bell className="text-yellow-400" />
              <h2 className="text-xl font-bold">
                Notifications
              </h2>
            </div>

            <div className="space-y-4">
              <label className="flex items-center justify-between">
                <span>Email Notifications</span>
                <input type="checkbox" defaultChecked />
              </label>

              <label className="flex items-center justify-between">
                <span>Extension Updates</span>
                <input type="checkbox" defaultChecked />
              </label>

              <label className="flex items-center justify-between">
                <span>Marketing Emails</span>
                <input type="checkbox" />
              </label>
            </div>
          </motion.div>

          {/* Security */}
          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
          >
            <div className="mb-6 flex items-center gap-3">
              <Shield className="text-green-400" />
              <h2 className="text-xl font-bold">
                Security
              </h2>
            </div>

            <button className="w-full rounded-xl bg-slate-800 p-4 text-left hover:bg-slate-700">
              Change Password
            </button>

            <button className="mt-4 w-full rounded-xl bg-slate-800 p-4 text-left hover:bg-slate-700">
              Enable Two-Factor Authentication
            </button>
          </motion.div>

          {/* Preferences */}
          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
          >
            <div className="mb-6 flex items-center gap-3">
              <Palette className="text-pink-400" />
              <h2 className="text-xl font-bold">
                Preferences
              </h2>
            </div>
            

            <select className="mb-4 w-full rounded-xl border border-slate-700 bg-slate-800 p-4 outline-none">
              <option>Dark Theme</option>
              <option>Light Theme</option>
            </select>

            <div className="flex items-center gap-3 rounded-xl bg-slate-800 p-4">
              <Globe />
              <span>Language: English</span>
            </div>
          </motion.div>

        </div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8"
        >
          <button className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-4 font-bold hover:scale-105 transition">
            <Save size={18} />
            Save Changes
          </button>
        </motion.div>

      </div>
    </div>
    
  );
}


export default Settings;