
import { useState } from "react";



function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log({ email, password, rememberMe });
    // Connect your login API here later.
  };

  return (
    <main className="min-h-screen bg-slate-100 p-4 sm:p-8 lg:p-12 flex items-center justify-center">
      <div className="w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl grid md:grid-cols-2">

        {/* Left branding panel */}
        <section className="relative hidden md:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-blue-800 via-blue-700 to-indigo-950 p-10 text-white lg:p-14">
          <div className="absolute -right-24 top-32 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" />

          <div className="relative z-10 flex items-center gap-4">
            <div className="rounded-2xl bg-white/15 p-4">
             
            </div>
            <div>
              <h1 className="text-2xl font-bold lg:text-3xl">
                Ticketing System
              </h1>
              <p className="mt-1 text-blue-200">
                Fast. Simple. Reliable.
              </p>
            </div>
          </div>

          <div className="relative z-10 my-12">
            <div className="mx-auto flex h-64 max-w-sm items-center justify-center rounded-3xl border border-white/20 bg-white/10 backdrop-blur-sm">
              <div className="relative rounded-2xl bg-white p-8 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-blue-100 p-3 text-blue-700">
                    
                  </div>
                  <div>
                    <div className="h-3 w-28 rounded bg-slate-200" />
                    <div className="mt-2 h-2 w-20 rounded bg-slate-100" />
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="h-3 w-52 max-w-full rounded bg-slate-100" />
                  <div className="h-3 w-40 rounded bg-slate-100" />
                  <div className="h-3 w-48 rounded bg-slate-100" />
                </div>

                
              </div>
            </div>

            <h2 className="mt-10 text-3xl font-bold leading-tight lg:text-4xl">
              Better support.
              <br />
              Better experience.
            </h2>
            <p className="mt-4 max-w-md text-base leading-7 text-blue-100 lg:text-lg">
              Submit tickets, track progress, and get solutions faster than ever.
            </p>
          </div>

          <div className="relative z-10 flex gap-2">
            <span className="h-2 w-8 rounded-full bg-white" />
            <span className="h-2 w-2 rounded-full bg-white/40" />
            <span className="h-2 w-2 rounded-full bg-white/40" />
          </div>
        </section>

        {/* Right login panel */}
        <section className="relative flex min-h-[620px] flex-col justify-center px-6 py-12 sm:px-12 lg:px-16">
          <button
            type="button"
            aria-label="Theme toggle (not implemented)"
            className="absolute right-6 top-6 rounded-xl border border-slate-200 p-3 text-slate-600 transition hover:bg-slate-100"
          >
            
          </button>

          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 md:hidden">
             
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Welcome back!
            </h2>
            <p className="mt-3 text-slate-500">
              Log in to your account to continue
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Email address
              </label>
              <div className="flex items-center rounded-xl border border-slate-300 transition focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100">
                
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl bg-transparent px-4 py-4 text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-slate-700"
                >
                  Password
                </label>
                <button
                  type="button"
                  className="text-sm font-medium text-blue-600 hover:text-blue-800"
                  onClick={() => alert("Password reset will be added later.")}
                >
                  Forgot password?
                </button>
              </div>

              <div className="flex items-center rounded-xl border border-slate-300 transition focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100">
               
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full min-w-0 bg-transparent px-4 py-4 text-slate-900 outline-none placeholder:text-slate-400"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                  className="mr-4 text-slate-400 hover:text-slate-700"
                >
                  
                </button>
              </div>
            </div>

            <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 accent-blue-600"
              />
              Remember me
            </label>

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-700 py-4 font-semibold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200 active:scale-[0.99]"
            >
              Login
            </button>
          </form>

          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-sm text-slate-400">Secure access</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <p className="text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-semibold text-blue-700 hover:text-blue-900"
            >
              Sign up
            </a>
          </p>

          <p className="mt-8 text-center text-xs text-slate-400">
            © 2026 Ticketing System. All rights reserved.
          </p>
        </section>
      </div>
    </main>
  );
}

export default Login;
