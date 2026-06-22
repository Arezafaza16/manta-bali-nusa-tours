'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import Image from 'next/image';
import { formatPrice } from '@/lib/i18n';
import { CloseIcon, ClockIcon } from '@/components/icons';
import AutoTextarea from './AutoTextarea';
import ImagePositioner from './ImagePositioner';
import type { PackageDraft, StudioPackage } from './types';
import type { TourCategory } from '@/lib/types';

interface PackageFormProps {
  initial?: StudioPackage | null;
  categories: string[];
  onClose: () => void;
  onSubmit: (draft: PackageDraft) => Promise<void>;
}

// Crop frame / card image aspect ratio (width / height). The card image area is
// h-48 and roughly this wide on desktop.
const CARD_ASPECT = 1.9;

export default function PackageForm({
  initial,
  categories,
  onClose,
  onSubmit,
}: PackageFormProps) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [category, setCategory] = useState<TourCategory>(
    initial?.category ?? categories[0] ?? 'Nusa Penida Tours',
  );
  // Always keep the current value selectable, even if it isn't in the list yet.
  const categoryOptions = categories.includes(category)
    ? categories
    : [category, ...categories];
  const [description, setDescription] = useState(initial?.description ?? '');
  const [descriptionId, setDescriptionId] = useState(
    initial?.descriptionId ?? '',
  );
  const [duration, setDuration] = useState(initial?.duration ?? '');
  const [durationId, setDurationId] = useState(initial?.durationId ?? '');
  const [priceValue, setPriceValue] = useState(
    initial ? String(initial.priceValue) : '',
  );
  const [image, setImage] = useState(initial?.image ?? '');
  const [imageStatus, setImageStatus] = useState('');
  const [originalSrc, setOriginalSrc] = useState('');
  const [positionerSrc, setPositionerSrc] = useState<string | null>(null);
  const [destinations, setDestinations] = useState(
    initial?.destinations.join('\n') ?? '',
  );
  const [includes, setIncludes] = useState(initial?.includes.join('\n') ?? '');
  const [featured, setFeatured] = useState(initial?.featured ?? false);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // Free any blob URL when it is replaced or on unmount.
  useEffect(() => {
    return () => {
      if (originalSrc.startsWith('blob:')) URL.revokeObjectURL(originalSrc);
    };
  }, [originalSrc]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ''; // allow re-picking the same file later
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setImageStatus('Please choose an image file.');
      return;
    }
    const url = URL.createObjectURL(file);
    setOriginalSrc(url); // previous one is revoked by the effect cleanup
    setPositionerSrc(url);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSubmit({
        title: title.trim(),
        category,
        description: description.trim(),
        descriptionId: descriptionId.trim(),
        duration: duration.trim(),
        durationId: durationId.trim(),
        priceValue: Math.max(0, Math.round(Number(priceValue) || 0)),
        image: image.trim(),
        destinations: destinations
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
        includes: includes
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
        featured,
        order: initial?.order ?? 0,
      });
    } finally {
      setSaving(false);
    }
  };

  const field =
    'mt-1.5 w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm text-ink-900 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100';
  const label = 'text-sm font-medium text-ink-800';

  return (
    <div className="animate-reveal rounded-2xl border border-ink-200 bg-white p-6 shadow-soft">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="font-display text-lg font-bold text-ink-900">
          {initial ? 'Edit package' : 'New package'}
        </h3>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-500 transition-colors hover:bg-ink-50"
        >
          <CloseIcon className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Card-accurate image preview + click-to-upload */}
        <div>
          <label className={label}>Featured image</label>
          <p className="mt-0.5 text-xs text-ink-400">
            Click to upload. The preview shows exactly how it appears on the
            card.
          </p>

          <div className="mt-2 overflow-hidden rounded-xs bg-white shadow-soft ring-1 ring-ink-900/[0.07] sm:w-[365px]">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className={`group relative block h-48 w-full overflow-hidden ${
                image
                  ? ''
                  : 'border-2 border-dashed border-ink-200 bg-ink-50/60 hover:border-brand-400 hover:bg-ink-50'
              } transition-colors`}
            >
              {image ? (
                <>
                  <Image
                    src={image}
                    alt="Package image"
                    fill
                    sizes="365px"
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 to-transparent" />
                  {duration && (
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-xs bg-white/90 px-2.5 py-1 text-[11px] font-bold text-ink-800 backdrop-blur">
                      <ClockIcon className="h-3 w-3 text-brand-500" />
                      {duration}
                    </span>
                  )}
                  <span className="absolute inset-0 flex items-center justify-center bg-ink-950/0 text-sm font-semibold text-white opacity-0 transition-all group-hover:bg-ink-950/45 group-hover:opacity-100">
                    Click to upload a new image
                  </span>
                </>
              ) : (
                <span className="flex h-full flex-col items-center justify-center gap-2 text-ink-400">
                  <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none">
                    <path
                      d="M12 16V4m0 0L8 8m4-4l4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-sm font-medium">
                    Click to upload an image
                  </span>
                </span>
              )}
            </button>

            {/* Mini card body so the crop is shown in real card context */}
            <div className="p-3">
              <p className="line-clamp-1 font-display text-sm font-extrabold text-ink-900">
                {title.trim() || 'Package title'}
              </p>
              <p className="mt-0.5 text-[11px] text-ink-400">Starting from</p>
              <p className="font-display text-base font-extrabold text-brand-600">
                {formatPrice(Number(priceValue) || 0)}
              </p>
            </div>
          </div>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
          />

          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
            {image && (
              <button
                type="button"
                onClick={() => setPositionerSrc(originalSrc || image)}
                className="text-xs font-semibold text-brand-600 hover:text-brand-700"
              >
                Reposition
              </button>
            )}
            {imageStatus && (
              <span className="text-xs text-ink-500">{imageStatus}</span>
            )}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={label}>Title</label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={field}
              placeholder="Nusa Penida West Tour"
            />
          </div>

          <div>
            <label className={label}>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as TourCategory)}
              className={field}
            >
              {categoryOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={label}>Price (IDR)</label>
            <input
              required
              inputMode="numeric"
              value={priceValue}
              onChange={(e) =>
                setPriceValue(e.target.value.replace(/[^\d]/g, ''))
              }
              className={field}
              placeholder="725000"
            />
            {priceValue && (
              <p className="mt-1 text-xs text-ink-400">
                Shows as {formatPrice(Number(priceValue) || 0)}
              </p>
            )}
          </div>

          <div>
            <label className={label}>Duration (EN)</label>
            <input
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className={field}
              placeholder="Full Day"
            />
          </div>
          <div>
            <label className={label}>Duration (ID)</label>
            <input
              value={durationId}
              onChange={(e) => setDurationId(e.target.value)}
              className={field}
              placeholder="1 Hari Penuh"
            />
          </div>

          <div>
            <label className={label}>Description (EN)</label>
            <AutoTextarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={field}
              placeholder="Short, enticing summary…"
            />
          </div>
          <div>
            <label className={label}>Description (ID)</label>
            <AutoTextarea
              value={descriptionId}
              onChange={(e) => setDescriptionId(e.target.value)}
              className={field}
              placeholder="Ringkasan singkat…"
            />
          </div>

          <div>
            <label className={label}>Destinations</label>
            <AutoTextarea
              value={destinations}
              onChange={(e) => setDestinations(e.target.value)}
              className={field}
              placeholder={'One per line:\nKelingking Beach\nBroken Beach'}
            />
          </div>
          <div>
            <label className={label}>Includes</label>
            <AutoTextarea
              value={includes}
              onChange={(e) => setIncludes(e.target.value)}
              className={field}
              placeholder={'One per line:\nFast Boat Ticket\nLunch'}
            />
          </div>
        </div>

        <label className="flex items-center gap-3 rounded-xl bg-ink-50 px-4 py-3">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="h-4 w-4 rounded border-ink-300 text-brand-500 focus:ring-brand-300"
          />
          <span className="text-sm font-medium text-ink-800">
            Mark as Best Seller (featured badge)
          </span>
        </label>

        <div className="flex justify-end gap-3 border-t border-ink-100 pt-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-ink-200 px-6 py-3 text-sm font-semibold text-ink-700 transition-colors hover:bg-ink-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-brand-gradient px-6 py-3 text-sm font-bold text-white shadow-soft transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-60"
          >
            {saving ? 'Saving…' : initial ? 'Save changes' : 'Create package'}
          </button>
        </div>
      </form>

      {positionerSrc && (
        <ImagePositioner
          src={positionerSrc}
          aspect={CARD_ASPECT}
          onCancel={() => setPositionerSrc(null)}
          onApply={(dataUrl, chars) => {
            setImage(dataUrl);
            setImageStatus(`Optimized to ${(chars / 1024 / 1024).toFixed(2)} MB`);
            setPositionerSrc(null);
          }}
        />
      )}
    </div>
  );
}
