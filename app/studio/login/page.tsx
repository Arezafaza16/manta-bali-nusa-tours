'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Logo from '@/components/Logo';

export default function StudioLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/studio/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        router.replace('/studio');
        router.refresh();
      } else {
        setError(data.error ?? 'Login failed.');
        setLoading(false);
      }
    } catch {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-dvh items-center justify-center bg-ink-gradient px-5 py-12">
      <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-brand-400/20 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" />

      <div className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-card sm:p-10">
        <div className="flex items-center gap-2.5">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink-50 ring-1 ring-ink-100">
            <Logo className="h-8 w-8" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-bold text-ink-900">
              Manta Balinusa
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-600">
              Studio
            </span>
          </span>
        </div>

        <h1 className="mt-8 font-display text-2xl font-bold text-ink-900">
          Sign in
        </h1>
        <p className="mt-2 text-sm text-ink-500">
          Manage your tour packages.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-ink-800">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-xl border border-ink-200 bg-ink-50/50 px-4 py-3 text-sm text-ink-900 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-ink-800">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-2 w-full rounded-xl border border-ink-200 bg-ink-50/50 px-4 py-3 text-sm text-ink-900 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-ink-gradient px-5 py-3.5 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <Link
          href="/"
          className="mt-6 block text-center text-sm text-ink-500 transition-colors hover:text-ink-700"
        >
          ← Back to website
        </Link>
      </div>
    </div>
  );
}
