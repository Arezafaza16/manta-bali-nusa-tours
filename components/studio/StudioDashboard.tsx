'use client';

import { Fragment, useMemo, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/components/Logo';
import { formatPrice } from '@/lib/i18n';
import type { TourCategory } from '@/lib/types';
import PackageForm from './PackageForm';
import ConfirmModal from './ConfirmModal';
import type { PackageDraft, StudioPackage } from './types';

interface StudioDashboardProps {
  initialPackages: StudioPackage[];
  initialCategories: string[];
  email: string;
}

export default function StudioDashboard({
  initialPackages,
  initialCategories,
  email,
}: StudioDashboardProps) {
  const router = useRouter();
  const [packages, setPackages] = useState<StudioPackage[]>(initialPackages);
  const [categories, setCategories] = useState<string[]>(initialCategories);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'All' | TourCategory>('All');
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<StudioPackage | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<StudioPackage | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  // Add-category inline form
  const [addingCategory, setAddingCategory] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categorySaving, setCategorySaving] = useState(false);
  const [categoryError, setCategoryError] = useState('');

  const filters = ['All', ...categories];

  const filtered = useMemo(() => {
    return packages.filter((p) => {
      const matchesCat = filter === 'All' || p.category === filter;
      const matchesSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [packages, filter, search]);

  const stats = useMemo(
    () => [
      { label: 'Total packages', value: packages.length },
      {
        label: 'Best Sellers',
        value: packages.filter((p) => p.featured).length,
      },
      {
        label: 'Nusa Penida',
        value: packages.filter((p) => p.category === 'Nusa Penida Tours')
          .length,
      },
      {
        label: 'Ubud',
        value: packages.filter((p) => p.category === 'Ubud Adventures').length,
      },
    ],
    [packages],
  );

  const handleLogout = async () => {
    await fetch('/api/studio/auth/logout', { method: 'POST' });
    router.replace('/studio/login');
    router.refresh();
  };

  const handleAddCategory = async (e: FormEvent) => {
    e.preventDefault();
    const name = categoryName.trim();
    if (!name) return;
    setCategorySaving(true);
    setCategoryError('');
    try {
      const res = await fetch('/api/studio/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        const added: string = data.category.name;
        setCategories((prev) =>
          prev.includes(added) ? prev : [...prev, added],
        );
        setCategoryName('');
        setAddingCategory(false);
      } else {
        setCategoryError(data.error ?? 'Could not add category.');
      }
    } catch {
      setCategoryError('Network error. Please try again.');
    } finally {
      setCategorySaving(false);
    }
  };

  const handleSubmit = async (draft: PackageDraft) => {
    setError('');
    const isEdit = Boolean(editing);
    const url = isEdit
      ? `/api/studio/packages/${editing!._id}`
      : '/api/studio/packages';
    const res = await fetch(url, {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(draft),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(data.error ?? 'Save failed.');
      throw new Error(data.error ?? 'Save failed.');
    }
    const saved: StudioPackage = data.package;
    setPackages((prev) =>
      isEdit
        ? prev.map((p) => (p._id === saved._id ? saved : p))
        : [...prev, saved],
    );
    setCreating(false);
    setEditing(null);
    router.refresh(); // revalidate the public homepage
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    setError('');
    const res = await fetch(`/api/studio/packages/${deleteTarget._id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setPackages((prev) => prev.filter((p) => p._id !== deleteTarget._id));
      setDeleteTarget(null);
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? 'Delete failed.');
    }
    setDeleting(false);
  };

  return (
    <div>
      <header className="sticky top-0 z-30 border-b border-ink-100 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-50 ring-1 ring-ink-100">
              <Logo className="h-7 w-7" />
            </span>
            <div className="leading-none">
              <p className="font-display text-base font-bold text-ink-900">
                Manta Balinusa
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-600">
                Studio
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-ink-500 sm:inline">{email}</span>
            <Link
              href="/"
              target="_blank"
              className="hidden rounded-xl border border-ink-200 px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-50 sm:block"
            >
              View site
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl bg-ink-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-ink-800"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">
            Tour packages
          </h1>
          <p className="text-sm text-ink-500">
            Changes here update the live homepage immediately.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl bg-white p-6 shadow-soft ring-1 ring-ink-900/5"
            >
              <p className="font-display text-3xl font-bold text-ink-900">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-ink-500">{s.label}</p>
            </div>
          ))}
        </div>

        {error && (
          <p
            role="alert"
            className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
          >
            {error}
          </p>
        )}

        <div className="mt-8 flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-soft ring-1 ring-ink-900/5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search packages…"
              className="w-full rounded-xl border border-ink-200 bg-ink-50/40 px-4 py-2.5 text-sm text-ink-900 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100 sm:max-w-xs"
            />
            <div className="flex flex-wrap gap-2">
              {filters.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFilter(c)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                    filter === c
                      ? 'bg-ink-gradient text-white'
                      : 'bg-ink-50 text-ink-700 hover:bg-ink-100'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setCategoryError('');
                setAddingCategory((v) => !v);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-ink-200 px-4 py-2.5 text-sm font-bold text-ink-700 transition-colors hover:bg-ink-50"
            >
              + New category
            </button>
            <button
              type="button"
              onClick={() => {
                setEditing(null);
                setCreating((v) => !v);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-bold text-white shadow-glow transition-transform hover:scale-105 active:scale-95"
            >
              + New package
            </button>
          </div>
        </div>

        {addingCategory && (
          <form
            onSubmit={handleAddCategory}
            className="animate-reveal mt-6 rounded-2xl border border-ink-200 bg-white p-5 shadow-soft"
          >
            <label className="text-sm font-medium text-ink-800">
              New category name
            </label>
            <div className="mt-1.5 flex flex-col gap-3 sm:flex-row">
              <input
                autoFocus
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="e.g. Lembongan Tours"
                className="w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm text-ink-900 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100 sm:max-w-xs"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={categorySaving || !categoryName.trim()}
                  className="rounded-xl bg-brand-gradient px-5 py-2.5 text-sm font-bold text-white shadow-soft transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-60"
                >
                  {categorySaving ? 'Adding…' : 'Add category'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAddingCategory(false);
                    setCategoryName('');
                    setCategoryError('');
                  }}
                  className="rounded-xl border border-ink-200 px-5 py-2.5 text-sm font-semibold text-ink-700 transition-colors hover:bg-ink-50"
                >
                  Cancel
                </button>
              </div>
            </div>
            {categoryError && (
              <p className="mt-2 text-sm font-medium text-red-600">
                {categoryError}
              </p>
            )}
            <p className="mt-2 text-xs text-ink-400">
              It will appear in the category dropdown when adding or editing a
              package.
            </p>
          </form>
        )}

        {creating && (
          <div className="mt-6">
            <PackageForm
              initial={null}
              categories={categories}
              onClose={() => setCreating(false)}
              onSubmit={handleSubmit}
            />
          </div>
        )}

        <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-ink-900/5">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-ink-100 text-xs uppercase tracking-wider text-ink-500">
                  <th className="px-6 py-4 font-semibold">Package</th>
                  <th className="px-6 py-4 font-semibold">Category</th>
                  <th className="px-6 py-4 font-semibold">Price</th>
                  <th className="px-6 py-4 font-semibold">Featured</th>
                  <th className="px-6 py-4 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-ink-400">
                      No packages yet. Click “New package” to add one.
                    </td>
                  </tr>
                ) : (
                  filtered.map((pkg) => (
                    <Fragment key={pkg._id}>
                    <tr className="border-b border-ink-50 transition-colors hover:bg-ink-50/50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-ink-100">
                            {pkg.image && (
                              <Image
                                src={pkg.image}
                                alt={pkg.title}
                                fill
                                sizes="64px"
                                className="object-cover"
                                unoptimized
                              />
                            )}
                          </span>
                          <span className="font-medium text-ink-900">
                            {pkg.title}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="rounded-full bg-ink-50 px-3 py-1 text-xs font-medium text-ink-700">
                          {pkg.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-ink-900">
                        {formatPrice(pkg.priceValue)}
                      </td>
                      <td className="px-6 py-4">
                        {pkg.featured ? (
                          <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
                            Best Seller
                          </span>
                        ) : (
                          <span className="text-ink-300">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setCreating(false);
                              setEditing((cur) =>
                                cur?._id === pkg._id ? null : pkg,
                              );
                            }}
                            className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                              editing?._id === pkg._id
                                ? 'border-brand-300 bg-brand-50 text-brand-700'
                                : 'border-ink-200 text-ink-700 hover:bg-ink-50'
                            }`}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteTarget(pkg)}
                            className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                    {editing?._id === pkg._id && (
                      <tr>
                        <td
                          colSpan={5}
                          className="bg-ink-50/60 px-4 pb-5 pt-1 sm:px-6"
                        >
                          <PackageForm
                            key={pkg._id}
                            initial={editing}
                            categories={categories}
                            onClose={() => setEditing(null)}
                            onSubmit={handleSubmit}
                          />
                        </td>
                      </tr>
                    )}
                    </Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete package?"
        message={`“${deleteTarget?.title}” will be permanently removed from the live site.`}
        loading={deleting}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
