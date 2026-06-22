'use client';

import { useState, type FormEvent } from 'react';
import { waLink } from '@/lib/data';
import type { Dictionary, Locale } from '@/lib/i18n';
import { WhatsAppIcon } from '@/components/icons';

interface ContactFormProps {
  dict: Dictionary;
  locale: Locale;
  destinations: string[];
}

export default function ContactForm({
  dict,
  locale,
  destinations,
}: ContactFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [dest, setDest] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const lines =
      locale === 'id'
        ? [
            'Halo Manta Bali Nusa Tours!',
            `Nama: ${name}`,
            `WhatsApp: ${phone}`,
            dest ? `Destinasi: ${dest}` : '',
            message ? `Pesan: ${message}` : '',
          ]
        : [
            'Hi Manta Bali Nusa Tours!',
            `Name: ${name}`,
            `WhatsApp: ${phone}`,
            dest ? `Destination: ${dest}` : '',
            message ? `Message: ${message}` : '',
          ];
    const text = lines.filter(Boolean).join('\n');
    window.open(waLink(text), '_blank', 'noopener,noreferrer');
  };

  const field =
    'mt-1.5 w-full rounded-xl border border-ink-200 bg-ink-50/50 px-4 py-3 text-sm text-ink-900 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100';

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-4xl bg-white p-7 shadow-card ring-1 ring-ink-900/5 sm:p-8"
    >
      <h3 className="font-display text-xl font-extrabold text-ink-900">
        {dict.contact.formTitle}
      </h3>
      <p className="mt-1.5 text-sm text-ink-500">{dict.contact.formSubtitle}</p>

      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor="cf-name" className="text-sm font-semibold text-ink-700">
            {dict.contact.name}
          </label>
          <input
            id="cf-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={dict.contact.namePlaceholder}
            className={field}
          />
        </div>

        <div>
          <label htmlFor="cf-phone" className="text-sm font-semibold text-ink-700">
            {dict.contact.phone}
          </label>
          <input
            id="cf-phone"
            required
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={dict.contact.phonePlaceholder}
            className={field}
          />
        </div>

        <div>
          <label htmlFor="cf-dest" className="text-sm font-semibold text-ink-700">
            {dict.contact.dest}
          </label>
          <select
            id="cf-dest"
            value={dest}
            onChange={(e) => setDest(e.target.value)}
            className={field}
          >
            <option value="">{dict.contact.destPlaceholder}</option>
            {destinations.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="cf-msg" className="text-sm font-semibold text-ink-700">
            {dict.contact.message}
          </label>
          <textarea
            id="cf-msg"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={dict.contact.messagePlaceholder}
            className={field}
          />
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-wa-500 px-5 py-3.5 text-sm font-bold text-white shadow-soft transition-transform hover:scale-[1.02] active:scale-95"
        >
          <WhatsAppIcon className="h-5 w-5" />
          {dict.contact.send}
        </button>

        <p className="text-center text-xs text-ink-400">{dict.contact.note}</p>
      </div>
    </form>
  );
}
