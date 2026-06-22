import { WHATSAPP_LINK } from '@/lib/data';
import { WhatsAppIcon } from '@/components/icons';

export default function FloatingWhatsApp({ label }: { label: string }) {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full bg-wa-500 px-4 py-4 text-white shadow-glow transition-transform hover:scale-105 active:scale-95"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-wa-500/40" />
      <WhatsAppIcon className="h-7 w-7" />
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-bold transition-all duration-300 group-hover:max-w-[140px] sm:inline">
        {label}
      </span>
    </a>
  );
}
