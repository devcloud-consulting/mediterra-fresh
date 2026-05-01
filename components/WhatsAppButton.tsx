import { useTranslations } from 'next-intl';
import { siteConfig } from '@/lib/site';

export function WhatsAppButton() {
  const t = useTranslations('cta');
  const tCommon = useTranslations('common');

  const message = encodeURIComponent(
    "Bonjour, je suis intéressé par vos produits et j'aimerais en savoir plus."
  );
  const href = `https://wa.me/${siteConfig.whatsapp}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={tCommon('openWhatsapp')}
      className="group fixed z-50 inline-flex items-center gap-2.5 rounded-full bg-[#25D366] hover:bg-[#1da851] text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)] hover:shadow-[0_18px_40px_-10px_rgba(0,0,0,0.45)] hover:scale-[1.03] active:scale-100 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]
        bottom-[max(1rem,env(safe-area-inset-bottom))] end-[max(1rem,env(safe-area-inset-right))]
        sm:bottom-[max(1.5rem,env(safe-area-inset-bottom))] sm:end-[max(1.5rem,env(safe-area-inset-right))]
        h-14 w-14 sm:h-auto sm:w-auto sm:px-5 sm:py-3.5 justify-center"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="shrink-0"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
      <span className="hidden sm:inline text-sm font-medium whitespace-nowrap">
        {t('whatsapp')}
      </span>
      {/* Subtle pulse animation around the button on mobile */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full ring-2 ring-[#25D366]/40 sm:hidden animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite] pointer-events-none"
      />
    </a>
  );
}
