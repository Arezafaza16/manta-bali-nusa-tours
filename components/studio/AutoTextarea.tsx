'use client';

import { useLayoutEffect, useRef, type TextareaHTMLAttributes } from 'react';

type AutoTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  value: string;
};

/**
 * Textarea that grows with its content instead of scrolling. Height is set to
 * the content's scrollHeight on every value change.
 */
export default function AutoTextarea({
  value,
  className = '',
  ...props
}: AutoTextareaProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  return (
    <textarea
      ref={ref}
      value={value}
      rows={2}
      className={`resize-none overflow-hidden ${className}`}
      {...props}
    />
  );
}
