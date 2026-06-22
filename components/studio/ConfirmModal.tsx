'use client';

interface ConfirmModalProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = 'Delete',
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-ink-950/50 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm rounded-3xl bg-white p-7 shadow-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-600">
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
            <path
              d="M12 9v4m0 4h.01M10.3 3.86l-8.07 14A2 2 0 004 21h16a2 2 0 001.77-3.14l-8.07-14a2 2 0 00-3.4 0z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="mt-5 font-display text-xl font-bold text-ink-900">
          {title}
        </h3>
        <p className="mt-2 text-sm text-ink-600">{message}</p>

        <div className="mt-7 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex-1 rounded-xl border border-ink-200 px-5 py-3 text-sm font-semibold text-ink-700 transition-colors hover:bg-ink-50 disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-60"
          >
            {loading ? 'Deleting…' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
