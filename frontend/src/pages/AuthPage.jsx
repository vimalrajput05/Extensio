import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AuthPage() {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    remember: false,
  });

  const navigate = useNavigate();
  const isLogin = mode === "login";

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 1500);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const passwordStrength = formData.password
    ? formData.password.length < 6
      ? "Weak"
      : formData.password.length < 10
      ? "Medium"
      : "Strong"
    : null;

  const strengthColor =
    passwordStrength === "Weak"
      ? "bg-red-500"
      : passwordStrength === "Medium"
      ? "bg-amber-400"
      : "bg-emerald-400";

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-violet-700/30 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-32 -z-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-12">
          <div className="grid w-full overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl lg:grid-cols-[1.1fr_0.9fr]">
            <section className="relative flex flex-col justify-between gap-8 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.15),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(139,92,246,0.14),_transparent_30%)] p-10 lg:p-14">
              <div>
                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-indigo-100/80 shadow-sm">
                  <span className="mr-2 inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  Secure sign in
                </span>
                <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                  {isLogin ? "Welcome back to Extensio" : "Create your professional account"}
                </h1>
                <p className="mt-5 max-w-xl text-base leading-8 text-slate-300">
                  {isLogin
                    ? "Access your extension dashboard, analytics, and AI workflows with a secure, modern experience."
                    : "Create an account to unlock smart extension generation, real-time insights, and project management."}
                </p>
              </div>

              <div className="grid gap-4 rounded-[1.75rem] border border-white/10 bg-slate-950/50 p-6 text-sm text-slate-100 shadow-inner shadow-slate-950/20">
                <div className="flex items-center justify-between gap-4 rounded-2xl bg-white/5 p-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Built for teams</p>
                    <p className="mt-1 text-base font-semibold text-white">Collaborate & ship faster</p>
                  </div>
                  <span className="rounded-full bg-slate-800/80 px-3 py-1 text-xs text-slate-300">Trusted</span>
                </div>
                <div className="grid gap-3 text-slate-300 sm:grid-cols-2">
                  <div className="rounded-2xl bg-slate-950/80 p-4">
                    <p className="text-sm text-slate-400">Faster onboarding</p>
                    <p className="mt-2 text-lg font-semibold text-white">+35%</p>
                  </div>
                  <div className="rounded-2xl bg-slate-950/80 p-4">
                    <p className="text-sm text-slate-400">Higher productivity</p>
                    <p className="mt-2 text-lg font-semibold text-white">+20%</p>
                  </div>
                </div>
              </div>
            </section>

            <main className="relative bg-slate-950/95 p-8 md:p-10 lg:p-12">
              <div className="absolute inset-x-0 top-0 hidden h-24 bg-gradient-to-b from-indigo-500/10 to-transparent lg:block" />
              <div className="relative z-10">
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-3xl font-semibold text-white">{isLogin ? "Login" : "Sign Up"}</h2>
                    <p className="mt-2 text-sm text-slate-400">
                      {isLogin
                        ? "Enter your credentials to continue."
                        : "Complete the details below to get started."}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMode(isLogin ? "signup" : "login")}
                    className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-2 text-sm font-medium text-indigo-100 transition hover:border-indigo-400/30 hover:bg-slate-900/95"
                  >
                    {isLogin ? "Create account" : "Already have an account"}
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {!isLogin && (
                    <label className="block">
                      <span className="mb-3 block text-sm font-medium text-slate-300">Full name</span>
                      <div className="relative">
                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4 22c0-4 3.134-7 7-7s7 3 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          type="text"
                          placeholder="Jane Doe"
                          className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-12 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500/60"
                          required
                        />
                      </div>
                    </label>
                  )}

                  <label className="block">
                    <span className="mb-3 block text-sm font-medium text-slate-300">Email</span>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M3 7.5c0-1.38 1.12-2.5 2.5-2.5h13c1.38 0 2.5 1.12 2.5 2.5v9c0 1.38-1.12 2.5-2.5 2.5h-13c-1.38 0-2.5-1.12-2.5-2.5v-9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="m3.5 7.75 8.5 5.5 8.5-5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email"
                        placeholder="you@example.com"
                        className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-12 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500/60"
                        required
                      />
                    </div>
                  </label>

                  <label className="block">
                    <span className="mb-3 block text-sm font-medium text-slate-300">Password</span>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M7 11V8a5 5 0 0 1 10 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <rect x="5" y="11" width="14" height="10" rx="3" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                      </span>
                      <input
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-12 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500/60"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full px-2 py-1 text-sm text-slate-400 transition hover:text-white"
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </label>

                  {!isLogin && (
                    <label className="block">
                      <span className="mb-3 block text-sm font-medium text-slate-300">Confirm password</span>
                      <div className="relative">
                        <input
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          type={showConfirm ? "text" : "password"}
                          placeholder="Confirm your password"
                          className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500/60"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirm((prev) => !prev)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full px-2 py-1 text-sm text-slate-400 transition hover:text-white"
                        >
                          {showConfirm ? "Hide" : "Show"}
                        </button>
                      </div>
                    </label>
                  )}

                  {passwordStrength && !isLogin && (
                    <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-300">
                      <span>Password strength</span>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${strengthColor} text-slate-950`}>
                        {passwordStrength}
                      </span>
                    </div>
                  )}

                  {isLogin && (
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <label className="inline-flex items-center gap-2 text-sm text-slate-300">
                        <input
                          name="remember"
                          checked={formData.remember}
                          onChange={handleChange}
                          type="checkbox"
                          className="h-4 w-4 rounded border-white/20 bg-slate-800 text-indigo-500 focus:ring-indigo-400"
                        />
                        Remember me
                      </label>
                      <Link to="/" className="text-sm text-indigo-300 hover:text-indigo-200">
                        Forgot password?
                      </Link>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:scale-[1.01] hover:from-indigo-500 hover:to-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? "Processing..." : isLogin ? "Continue to dashboard" : "Create account"}
                  </button>
                </form>

                <div className="mt-6 grid gap-3 text-sm text-slate-400">
                  <div className="relative text-center before:absolute before:inset-x-8 before:top-1/2 before:h-px before:bg-slate-700/60">
                    <span className="relative bg-slate-950 px-3">Or continue with</span>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <button type="button" className="inline-flex items-center justify-center gap-3 rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-200 transition hover:border-indigo-400/30 hover:bg-slate-900">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-indigo-300">G</span>
                      Google
                    </button>
                    <button type="button" className="inline-flex items-center justify-center gap-3 rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-200 transition hover:border-indigo-400/30 hover:bg-slate-900">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-indigo-300">Git</span>
                      GitHub
                    </button>
                  </div>
                </div>

                <p className="mt-8 text-center text-sm text-slate-500">
                  {isLogin ? "New here?" : "Already have an account?"}{" "}
                  <button
                    type="button"
                    onClick={() => setMode(isLogin ? "signup" : "login")}
                    className="font-medium text-indigo-300 hover:text-indigo-200"
                  >
                    {isLogin ? "Create an account" : "Login now"}
                  </button>
                </p>

                <div className="mt-4 text-center">
                  <Link to="/" className="text-sm text-slate-500 transition hover:text-slate-300">
                    Back to home
                  </Link>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
