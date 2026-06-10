import { useContext } from "react";
import { animateScroll as scroll } from "react-scroll";
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { ThemeContext } from "../ThemeContext";


function Navbar() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
<nav className="sticky top-4 z-50 mx-auto w-[95%] rounded-2xl border border-white/10 bg-slate-950/70 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl">    
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold text-indigo-500">Extensio.ai</h1>
          <p className="text-xs text-slate-400">Chrome Extension Generator</p>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
<button
  onClick={() => scroll.scrollToTop({ duration: 800, smooth: "easeInOutQuart" })}
  className="relative transition hover:text-white after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-indigo-500 after:transition-all hover:after:w-full"
>
  Home
</button>
          <a
            href="#features"
            className="relative transition hover:text-white after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-indigo-500 after:transition-all hover:after:w-full"
          >
            Features
          </a>

          <a
            href="#pricing"
            className="relative transition hover:text-white after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-indigo-500 after:transition-all hover:after:w-full"
          >
            Pricing
          </a>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="inline-flex items-center gap-2 rounded-xl border border-indigo-400/20 bg-slate-900/80 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            {theme === "dark" ? "Light" : "Dark"}
          </button>

          <Link
            to="/login"
            className="rounded-xl border border-indigo-400/30 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:scale-[1.05] hover:bg-indigo-500/20 hover:border-indigo-400 hover:text-indigo-300 hover:shadow-[0_5px_20px_rgba(99,102,241,0.4)]"
          >
            Login
          </Link>

          <Link
            to="/dashboard"
            className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;