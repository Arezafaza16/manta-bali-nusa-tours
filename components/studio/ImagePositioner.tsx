'use client';

import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { CloseIcon } from '@/components/icons';

// Keep the cropped/stored (base64) image comfortably under 1 MB.
const MAX_CHARS = 950_000;
const OUTPUT_HEIGHT = 440;

interface ImagePositionerProps {
  /** Object URL or data URL of the picked image. */
  src: string;
  /** Crop window width / height (matches the card's image area). */
  aspect: number;
  onCancel: () => void;
  onApply: (dataUrl: string, chars: number) => void;
}

type Gesture =
  | { mode: 'pan'; startX: number; startY: number; ox: number; oy: number }
  | {
      mode: 'pinch';
      startDist: number;
      startScale: number;
      ox: number;
      oy: number;
      midX: number;
      midY: number;
    };

export default function ImagePositioner({
  src,
  aspect,
  onCancel,
  onApply,
}: ImagePositionerProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState({ w: 360, h: 340 });
  const stageMirror = useRef(stage);
  const [nat, setNat] = useState<{ w: number; h: number } | null>(null);
  const imgElRef = useRef<HTMLImageElement | null>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [error, setError] = useState('');

  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef<Gesture | null>(null);

  // Crop window geometry (centered in the stage).
  const FW = Math.round(stage.w * 0.84);
  const FH = Math.round(FW / aspect);
  const frameLeft = Math.round((stage.w - FW) / 2);
  const frameTop = Math.round((stage.h - FH) / 2);

  // Scale bounds: never smaller than "covers the crop window".
  const minScale = nat ? Math.max(FW / nat.w, FH / nat.h) : 1;
  const containScale = nat ? Math.min(stage.w / nat.w, stage.h / nat.h) : 1;
  const maxScale = Math.max(minScale, containScale) * 5;

  const dispW = nat ? nat.w * scale : 0;
  const dispH = nat ? nat.h * scale : 0;

  const clampOffset = (x: number, y: number, s: number) => {
    const dW = (nat?.w ?? 0) * s;
    const dH = (nat?.h ?? 0) * s;
    return {
      x: Math.min(frameLeft, Math.max(frameLeft + FW - dW, x)),
      y: Math.min(frameTop, Math.max(frameTop + FH - dH, y)),
    };
  };

  // Clamped offset used for display, gestures and cropping.
  const co = clampOffset(offset.x, offset.y, scale);

  // Responsive stage.
  useEffect(() => {
    const compute = () => {
      const w = Math.min(440, window.innerWidth - 48);
      const h = Math.min(w, 380);
      const s = { w, h };
      stageMirror.current = s;
      setStage(s);
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  // Load image, fit it in the stage, center the crop window.
  useEffect(() => {
    const img = document.createElement('img');
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imgElRef.current = img;
      const n = { w: img.naturalWidth, h: img.naturalHeight };
      const s = stageMirror.current;
      const fW = Math.round(s.w * 0.84);
      const fH = Math.round(fW / aspect);
      const minS = Math.max(fW / n.w, fH / n.h);
      const contain = Math.min(s.w / n.w, s.h / n.h);
      const initScale = Math.max(minS, contain);
      const dW = n.w * initScale;
      const dH = n.h * initScale;
      const fl = (s.w - fW) / 2;
      const ft = (s.h - fH) / 2;
      const ox = Math.min(fl, Math.max(fl + fW - dW, (s.w - dW) / 2));
      const oy = Math.min(ft, Math.max(ft + fH - dH, (s.h - dH) / 2));
      setError('');
      setNat(n);
      setScale(initScale);
      setOffset({ x: ox, y: oy });
    };
    img.onerror = () =>
      setError('Could not load this image. Please upload a file instead.');
    img.src = src;
  }, [src, aspect]);

  const dist = (a: { x: number; y: number }, b: { x: number; y: number }) =>
    Math.hypot(a.x - b.x, a.y - b.y);

  const onPointerDown = (e: PointerEvent) => {
    if (!nat) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 1) {
      gesture.current = {
        mode: 'pan',
        startX: e.clientX,
        startY: e.clientY,
        ox: co.x,
        oy: co.y,
      };
    } else if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      const r = stageRef.current!.getBoundingClientRect();
      gesture.current = {
        mode: 'pinch',
        startDist: dist(a, b),
        startScale: scale,
        ox: co.x,
        oy: co.y,
        midX: (a.x + b.x) / 2 - r.left,
        midY: (a.y + b.y) / 2 - r.top,
      };
    }
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!pointers.current.has(e.pointerId) || !nat) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const g = gesture.current;
    if (!g) return;

    if (g.mode === 'pan' && pointers.current.size === 1) {
      setOffset(
        clampOffset(g.ox + (e.clientX - g.startX), g.oy + (e.clientY - g.startY), scale),
      );
    } else if (g.mode === 'pinch' && pointers.current.size >= 2) {
      const [a, b] = [...pointers.current.values()];
      let ns = g.startScale * (dist(a, b) / g.startDist);
      ns = Math.min(maxScale, Math.max(minScale, ns));
      // keep the point under the pinch midpoint anchored
      const imgX = (g.midX - g.ox) / g.startScale;
      const imgY = (g.midY - g.oy) / g.startScale;
      setScale(ns);
      setOffset(clampOffset(g.midX - imgX * ns, g.midY - imgY * ns, ns));
    }
  };

  const onPointerUp = (e: PointerEvent) => {
    pointers.current.delete(e.pointerId);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* no-op */
    }
    if (pointers.current.size === 1) {
      const [p] = [...pointers.current.values()];
      gesture.current = {
        mode: 'pan',
        startX: p.x,
        startY: p.y,
        ox: co.x,
        oy: co.y,
      };
    } else if (pointers.current.size === 0) {
      gesture.current = null;
    }
  };

  const zoomTo = (next: number) => {
    if (!nat) return;
    const ns = Math.min(maxScale, Math.max(minScale, next));
    const cx = stage.w / 2;
    const cy = stage.h / 2;
    const imgX = (cx - co.x) / scale;
    const imgY = (cy - co.y) / scale;
    setScale(ns);
    setOffset(clampOffset(cx - imgX * ns, cy - imgY * ns, ns));
  };

  const handleApply = () => {
    const img = imgElRef.current;
    if (!nat || !img) return;
    const srcX = (frameLeft - co.x) / scale;
    const srcY = (frameTop - co.y) / scale;
    const srcW = FW / scale;
    const srcH = FH / scale;

    const outH = OUTPUT_HEIGHT;
    const outW = Math.round(outH * aspect);
    const canvas = document.createElement('canvas');
    canvas.width = outW;
    canvas.height = outH;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, outW, outH);
    ctx.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, outW, outH);

    try {
      let quality = 0.85;
      let dataUrl = '';
      for (let i = 0; i < 10; i++) {
        dataUrl = canvas.toDataURL('image/jpeg', quality);
        if (dataUrl.length <= MAX_CHARS || quality <= 0.4) break;
        quality -= 0.1;
      }
      onApply(dataUrl, dataUrl.length);
    } catch {
      setError('Could not process this image. Please upload a file instead.');
    }
  };

  const sliderStep = maxScale > minScale ? (maxScale - minScale) / 100 : 0.001;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-ink-950/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-card">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg font-bold text-ink-900">
              Move and scale
            </h3>
            <p className="text-xs text-ink-400">
              Drag to move · pinch or use the slider to zoom. The bright area is
              what shows on the card.
            </p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Cancel"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-500 transition-colors hover:bg-ink-50"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="flex justify-center">
          <div
            ref={stageRef}
            className="relative touch-none overflow-hidden rounded-xl bg-ink-950"
            style={{ width: stage.w, height: stage.h }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            {nat && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={src}
                alt="Reposition preview"
                draggable={false}
                className="pointer-events-none absolute max-w-none select-none"
                style={{
                  width: dispW,
                  height: dispH,
                  transform: `translate(${co.x}px, ${co.y}px)`,
                }}
              />
            )}
            {/* Dim mask with a clear card-shaped crop window */}
            <div
              className="pointer-events-none absolute rounded-xs border-2 border-white/85"
              style={{
                left: frameLeft,
                top: frameTop,
                width: FW,
                height: FH,
                boxShadow: '0 0 0 9999px rgba(7, 18, 28, 0.62)',
              }}
            />
            {!nat && (
              <div className="absolute inset-0 flex items-center justify-center text-sm text-white/70">
                Loading…
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <span className="text-xs font-semibold text-ink-400">Zoom</span>
          <input
            type="range"
            min={minScale}
            max={maxScale}
            step={sliderStep}
            value={scale}
            onChange={(e) => zoomTo(Number(e.target.value))}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-ink-200 accent-brand-500"
            aria-label="Zoom"
          />
        </div>

        {error && (
          <p
            role="alert"
            className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
          >
            {error}
          </p>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-ink-200 px-6 py-3 text-sm font-semibold text-ink-700 transition-colors hover:bg-ink-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApply}
            disabled={!nat}
            className="rounded-xl bg-brand-gradient px-6 py-3 text-sm font-bold text-white shadow-soft transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-60"
          >
            Use this image
          </button>
        </div>
      </div>
    </div>
  );
}
