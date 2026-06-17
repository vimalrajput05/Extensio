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
import { API_BASE, TOKEN_KEY, USER_KEY } from "../config/api";
import { useEffect, useState } from "react";


function Settings() {
  const navigate = useNavigate();

  const [user, setUser] = useState({ email: "", name: "" });
  const [name, setName] = useState("");

  const [notifications, setNotifications] = useState({
    email: true,
    updates: true,
    marketing: false,
  });

  const [theme, setTheme] = useState("dark");
  const [language] = useState("English");

  const [twoFAEnabled, setTwoFAEnabled] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [passwordChangeMsg, setPasswordChangeMsg] = useState("");

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    let parsedUser = {};
    try {
      parsedUser = JSON.parse(localStorage.getItem(USER_KEY) || "{}") || {};
    } catch {
      parsedUser = {};
    }

    const currentName = parsedUser.name || "";
    const currentEmail = parsedUser.email || "";

    setUser({ email: currentEmail, name: currentName });
    setName(currentName);

    let notif = null;
    try {
      notif = JSON.parse(localStorage.getItem("extensio_notifications") || "null");
    } catch {
      notif = null;
    }

    if (notif && typeof notif === "object") {
      setNotifications({
        email: typeof notif.email === "boolean" ? notif.email : true,
        updates: typeof notif.updates === "boolean" ? notif.updates : true,
        marketing: typeof notif.marketing === "boolean" ? notif.marketing : false,
      });
    }

    let savedTheme = "dark";
    try {
      savedTheme = localStorage.getItem("extensio_theme") || "dark";
    } catch {
      savedTheme = "dark";
    }
    setTheme(savedTheme);
    if (savedTheme === "light") {
      document.documentElement.classList.add("light-mode");
    } else {
      document.documentElement.classList.remove("light-mode");
    }

    let saved2fa = false;
    try {
      saved2fa = localStorage.getItem("extensio_2fa") === "true";
    } catch {
      saved2fa = false;
    }
    setTwoFAEnabled(saved2fa);
  }, [navigate]);

  const applyTheme = (nextTheme) => {
    if (nextTheme === "light") {
      document.documentElement.classList.add("light-mode");
    } else {
      document.documentElement.classList.remove("light-mode");
    }
  };

  const onSave = async () => {
    setSuccessMsg("");
    setErrorMsg("");
    setIsSaving(true);

    try {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      const payload = { name };

      const res = await fetch(`${API_BASE}/api/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      const nextNotifications = {
        email: !!notifications.email,
        updates: !!notifications.updates,
        marketing: !!notifications.marketing,
      };

      localStorage.setItem("extensio_notifications", JSON.stringify(nextNotifications));

      if (!res.ok) {
        setErrorMsg(data?.error || "Failed to save settings");
        return;
      }

      if (data?.user) {
        localStorage.setItem(USER_KEY, JSON.stringify(data.user));
        setUser({ email: data.user.email || user.email, name: data.user.name || name });
        setName(data.user.name || name);
      }

      setSuccessMsg("Settings saved successfully");
      setTimeout(() => setSuccessMsg(""), 2500);
    } catch (e) {
      setErrorMsg(e?.message || "Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  const onSubmitPasswordChange = (e) => {
    e.preventDefault();
    setPasswordChangeMsg("Password change requires backend support (not yet implemented)");
  };

  const saveThemeImmediately = (next) => {
    setTheme(next);
    try {
      localStorage.setItem("extensio_theme", next);
    } catch {
      // ignore
    }
    applyTheme(next);
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

        {successMsg ? (
          <div className="mb-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
            {successMsg}
          </div>
        ) : null}
        {errorMsg ? (
          <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {errorMsg}
          </div>
        ) : null}

        {/* Background Glow */}
        <div className="fixed left-20 top-20 h-72 w-72 rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="fixed right-20 bottom-20 h-72 w-72 rounded-full bg-violet-500/10 blur-[120px]" />

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-indigo-600/20 via-violet-600/20 to-purple-600/20 p-8"
        >
          <h1 className="text-5xl font-bold">Settings ⚙️</h1>

          <p className="mt-3 text-slate-300">Manage your account preferences and platform settings.</p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Profile Settings */}
          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
          >
            <div className="mb-6 flex items-center gap-3">
              <User className="text-indigo-400" />
              <h2 className="text-xl font-bold">Profile Settings</h2>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 p-4 outline-none focus:border-indigo-500"
              />

              <input
                type="email"
                value={user.email}
                disabled
                readOnly
                className="w-full rounded-xl border border-slate-700 bg-slate-800 p-4 outline-none focus:border-indigo-500 opacity-70"
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
              <h2 className="text-xl font-bold">Notifications</h2>
            </div>

            <div className="space-y-4">
              <label className="flex items-center justify-between">
                <span>Email Notifications</span>
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={(e) =>
                    setNotifications((prev) => ({ ...prev, email: e.target.checked }))
                  }
                />
              </label>

              <label className="flex items-center justify-between">
                <span>Extension Updates</span>
                <input
                  type="checkbox"
                  checked={notifications.updates}
                  onChange={(e) =>
                    setNotifications((prev) => ({ ...prev, updates: e.target.checked }))
                  }
                />
              </label>

              <label className="flex items-center justify-between">
                <span>Marketing Emails</span>
                <input
                  type="checkbox"
                  checked={notifications.marketing}
                  onChange={(e) =>
                    setNotifications((prev) => ({ ...prev, marketing: e.target.checked }))
                  }
                />
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
              <h2 className="text-xl font-bold">Security</h2>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowPasswordForm((v) => !v);
                setPasswordChangeMsg("");
              }}
              className="w-full rounded-xl bg-slate-800 p-4 text-left hover:bg-slate-700"
            >
              Change Password
            </button>

            {showPasswordForm ? (
              <form onSubmit={onSubmitPasswordChange} className="mt-4 space-y-3">
                <input
                  type="password"
                  placeholder="Current Password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm((p) => ({ ...p, currentPassword: e.target.value }))}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 outline-none focus:border-indigo-500"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm((p) => ({ ...p, newPassword: e.target.value }))}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 outline-none focus:border-indigo-500"
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={passwordForm.confirmNewPassword}
                  onChange={(e) => setPasswordForm((p) => ({ ...p, confirmNewPassword: e.target.value }))}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="w-full rounded-xl bg-slate-700 p-4 text-left hover:bg-slate-650"
                >
                  Submit
                </button>
                {passwordChangeMsg ? (
                  <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-200">
                    {passwordChangeMsg}
                  </div>
                ) : null}
              </form>
            ) : null}

            <button
              type="button"
              onClick={() => {
                const next = !twoFAEnabled;
                setTwoFAEnabled(next);
                try {
                  localStorage.setItem("extensio_2fa", String(next));
                } catch {
                  // ignore
                }
              }}
              className="mt-4 w-full rounded-xl bg-slate-800 p-4 text-left hover:bg-slate-700"
            >
              {twoFAEnabled ? "2FA Enabled (UI only — backend pending)" : "Enable Two-Factor Authentication"}
            </button>
          </motion.div>

          {/* Preferences */}
          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
          >
            <div className="mb-6 flex items-center gap-3">
              <Palette className="text-pink-400" />
              <h2 className="text-xl font-bold">Preferences</h2>
            </div>

            <select
              className="mb-4 w-full rounded-xl border border-slate-700 bg-slate-800 p-4 outline-none"
              value={theme}
              onChange={(e) => saveThemeImmediately(e.target.value)}
            >
              <option value="dark">Dark Theme</option>
              <option value="light">Light Theme</option>
            </select>

            <div className="flex items-center gap-3 rounded-xl bg-slate-800 p-4">
              <Globe />
              <span>Language: {language}</span>
            </div>
          </motion.div>
        </div>

        {/* Save Button */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8">
          <button
            type="button"
            disabled={isSaving}
            onClick={onSave}
            className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-4 font-bold hover:scale-105 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Save size={18} />
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </motion.div>

        {/* keep same layout spacing */}
      </div>
    </div>
  );
}

export default Settings;
