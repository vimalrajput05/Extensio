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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const passwordStrength = formData.password
    ? formData.password.length < 6
      ? "weak"
      : formData.password.length < 10
      ? "medium"
      : "strong"
    : null;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-12">
        <div className="grid w-full overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl lg:grid-cols-2">
          <div className="flex flex-col justify-between bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-10 lg:p-14">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-indigo-100/80">
                Extensio.ai
              </p>
              <h1 className="max-w-md text-4xl font-extrabold leading-tight md:text-5xl">
                {isLogin ? "Welcome back" : "Create your account"}
              </h1>
              <p className="mt-4 max-w-md text-base text-indigo-100/90 md:text-lg">
                {isLogin
                  ? "Sign in to manage your extensions, analytics, and AI workflows."
                  : "Start building chrome extensions by creating your account."}
              </p>
            </div>

            <div className="mt-12 rounded-3xl border border-white/10 bg-white/10 p-6 text-sm text-indigo-50/90">
              <p className="font-semibold text-white">What you get</p>
              <ul className="mt-4 space-y-3">
                <li>AI-powered extension generation</li>
                <li>Analytics and downloads tracking</li>
                <li>Dashboard to manage all projects</li>
              </ul>
            </div>
          </div>

          <div className="p-8 md:p-10 lg:p-14">
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold text-white">
                  {isLogin ? "Login" : "Create Account"}
                </h2>
                <p className="mt-2 text-sm text-slate-400">
                  {isLogin
                    ? "Enter your email and password to continue."
                    : "Fill in your details to create a new account."}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setMode(isLogin ? "signup" : "login")}
                className="rounded-xl border border-indigo-400/30 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-200 transition hover:bg-indigo-500/20"
              >
                {isLogin ? "Create account" : "Login"}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500/60"
                    required
                  />
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500/60"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500/60"
                  required
                />
              </div>

              {!isLogin && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm your password"
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500/60"
                    required
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg transition hover:scale-[1.01] hover:from-indigo-500 hover:to-violet-500"
              >
                {isLogin ? "Login" : "Create Account"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-400">
              {isLogin ? "New here?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => setMode(isLogin ? "signup" : "login")}
                className="font-medium text-indigo-300 hover:text-indigo-200"
              >
                {isLogin ? "Create an account" : "Login now"}
              </button>
            </div>

            <div className="mt-8 text-center">
              <Link
                to="/"
                className="text-sm text-slate-500 transition hover:text-slate-300"
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
