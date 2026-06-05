import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Sparkles,
  FolderOpen,
  BarChart3,
  Settings,
} from "lucide-react";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Generate",
      path: "/generate",
      icon: <Sparkles size={20} />,
    },
    {
      name: "My Extensions",
      path: "/extensions",
      icon: <FolderOpen size={20} />,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: <BarChart3 size={20} />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <div className="flex min-h-screen w-72 flex-col border-r border-white/10 bg-slate-950 p-6">

      {/* Logo */}
      <div className="mb-10">
        <h1 className="bg-gradient-to-r from-indigo-400 to-violet-500 bg-clip-text text-3xl font-extrabold text-transparent">
          Extensio.ai
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          AI Chrome Extension Generator
        </p>
      </div>

      {/* Navigation */}
      <div className="space-y-3">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 rounded-2xl p-4 transition-all duration-300 ${
              location.pathname === item.path
                ? "border border-indigo-500/30 bg-indigo-500/20 text-white shadow-lg"
                : "text-slate-400 hover:bg-slate-900 hover:text-white"
            }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </div>

      {/* Bottom Card */}
      <div className="mt-auto rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 to-violet-500/10 p-5">
        <h3 className="font-semibold text-white">
          Upgrade to Pro 🚀
        </h3>

        <p className="mt-2 text-sm text-slate-400">
          Unlock advanced AI generation and premium features.
        </p>

        <button className="mt-4 w-full rounded-xl bg-indigo-600 py-3 font-medium transition hover:bg-indigo-500">
          Upgrade
        </button>
      </div>
    </div>
  );
}

export default Sidebar;