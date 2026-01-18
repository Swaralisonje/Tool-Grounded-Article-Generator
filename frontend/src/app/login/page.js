'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/api';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const data = await login(username, password);
      localStorage.setItem('token', data.access_token);
      window.dispatchEvent(new Event("storage"));
      router.replace('/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-slate-50 font-sans">

      {/* LEFT SIDE - VISUAL SECTION */}
      {/* Increased width to 60% on large screens for better balance */}
      <div className="hidden lg:flex lg:w-[60%] relative bg-indigo-900 items-center justify-center overflow-hidden">

        {/* Rich Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-indigo-800 to-purple-900 opacity-95 z-0"></div>

        {/* Background Pattern (Abstract Circles) */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        {/* Content Container with Glassmorphism */}
        <div className="relative z-10 p-16 max-w-2xl text-center">
          <div className="mb-8 inline-block p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 shadow-xl">
             <span className="text-4xl">🚀</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-sm">
            SourceCraft AI
          </h1>
          <p className="text-indigo-100 text-xl leading-relaxed font-light">
            Harness the power of AI grounded with real-time Google Search data.
            Create accurate, <span className="font-semibold text-white">SEO-optimized</span> articles in seconds.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - LOGIN FORM */}
      {/* Centered vertically and horizontally */}
      <div className="w-full lg:w-[40%] flex items-center justify-center p-8 lg:p-12 bg-white relative">

        <div className="w-full max-w-[420px] space-y-8">

          {/* Header Section */}
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              Welcome Back
            </h2>
            <p className="mt-3 text-slate-500 text-sm font-medium uppercase tracking-wider">
              Please enter your details to sign in
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-medium rounded-md flex items-center gap-2 animate-pulse">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                {error}
              </div>
            )}

            <div className="space-y-5">
              {/* Username Input */}
              <div className="group">
                <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    className="block w-full h-12 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-transparent transition-all duration-200 ease-in-out shadow-sm"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="group">
                <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    className="block w-full h-12 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-transparent transition-all duration-200 ease-in-out shadow-sm"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-base font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </span>
              ) : 'Sign In'}
            </button>

            {/* Footer Text */}
            <p className="text-center text-sm text-slate-400 mt-6">
              © 2024 SourceCraft AI. All rights reserved.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}