import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { LegalLayout } from '@/components/LegalLayout';
import { Link } from '@/i18n/navigation';
import { siteConfig } from '@/lib/site';
import type { Locale } from '@/i18n/routing';

const LAST_UPDATE = '2025-01-15';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legal.cgv' });
  return { title: t('title') };
}

export default async function CGVPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const safeLocale = locale as Locale;

  const t = await getTranslations('legal.cgv');

  return (
    <LegalLayout title={t('title')} lastUpdate={LAST_UPDATE} lastUpdateLabel={t('lastUpdate')}>
      {safeLocale === 'fr' && <FR />}
      {safeLocale === 'en' && <EN />}
      {safeLocale === 'ar' && <AR />}
    </LegalLayout>
  );
}

function FR() {
  return (
    <>
      <h3>Article 1 — Objet et champ d&apos;application</h3>
      <p>
        Les présentes conditions générales de vente (« CGV ») régissent les
        relations contractuelles entre <strong>{siteConfig.legalName}</strong> («
        le Fournisseur ») et tout client professionnel (« le Client »), à
        l&apos;exclusion des consommateurs au sens du droit marocain.
      </p>

      <h3>Article 2 — Commande</h3>
      <p>
        Toute commande, qu&apos;elle soit passée par téléphone, WhatsApp, email
        ou via le site, est ferme et définitive après confirmation écrite du
        Fournisseur. Le Client s&apos;engage à respecter le minimum de commande
        applicable à sa zone : 800 MAD HT pour Marrakech, 1 000 MAD HT pour
        Agadir, sauf dérogation expresse.
      </p>

      <h3>Article 3 — Prix</h3>
      <p>
        Les prix s&apos;entendent en dirhams marocains, hors taxes (HT), sauf
        mention contraire. La TVA en vigueur (20 %) est ajoutée à la facture.
        Les prix peuvent évoluer en fonction des cours de gros et de la
        saisonnalité, et sont confirmés à chaque commande.
      </p>

      <h3>Article 4 — Livraison</h3>
      <p>
        La livraison s&apos;effectue dans les zones desservies (Marrakech, Agadir,
        et autres villes sur demande), entre 6h et 10h du lundi au samedi.
        Le créneau précis est confirmé par WhatsApp la veille. Le Fournisseur ne
        peut être tenu responsable d&apos;un retard imputable à un cas de force
        majeure.
      </p>

      <h3>Article 5 — Réception et réclamations</h3>
      <p>
        Le Client doit vérifier la conformité de la marchandise à réception. Toute
        réclamation portant sur un défaut visible, une erreur de quantité ou de
        référence doit être notifiée par écrit (email ou WhatsApp) dans les 4
        heures suivant la livraison, photos à l&apos;appui. Passé ce délai, la
        marchandise est réputée acceptée.
      </p>

      <h3>Article 6 — Paiement</h3>
      <p>
        Sauf accord particulier, le paiement s&apos;effectue comptant à la
        livraison, ou par virement bancaire à 15 ou 30 jours date de facture
        après ouverture d&apos;un compte client. Toute somme non payée à
        l&apos;échéance produira de plein droit des intérêts de retard au taux
        légal marocain, sans qu&apos;une mise en demeure préalable soit
        nécessaire.
      </p>

      <h3>Article 7 — Réserve de propriété</h3>
      <p>
        La marchandise reste la propriété du Fournisseur jusqu&apos;au paiement
        intégral du prix par le Client, conformément à l&apos;article 618 du
        Dahir des Obligations et des Contrats.
      </p>

      <h3>Article 8 — Force majeure</h3>
      <p>
        Sont notamment considérés comme cas de force majeure les intempéries
        affectant la récolte, les ruptures d&apos;approvisionnement non imputables
        au Fournisseur, les grèves, les blocages de transport, les épidémies, et
        tout événement échappant au contrôle raisonnable des parties.
      </p>

      <h3>Article 9 — Confidentialité et données</h3>
      <p>
        Les parties s&apos;engagent à respecter la confidentialité des
        informations échangées. Les données du Client sont traitées
        conformément à la <Link href="/politique-confidentialite">politique
        de confidentialité</Link> et à la loi 09-08.
      </p>

      <h3>Article 10 — Loi applicable et juridiction</h3>
      <p>
        Les présentes CGV sont soumises au droit marocain. À défaut d&apos;accord
        amiable, tout litige relatif à leur exécution sera de la compétence
        exclusive du tribunal de commerce de Marrakech.
      </p>
    </>
  );
}

function EN() {
  return (
    <>
      <h3>Article 1 — Scope</h3>
      <p>
        These terms (&quot;Terms&quot;) govern the contractual relationship
        between <strong>{siteConfig.legalName}</strong> (the &quot;Supplier&quot;)
        and any professional client (the &quot;Client&quot;), excluding consumers.
      </p>

      <h3>Article 2 — Order</h3>
      <p>
        Any order placed by phone, WhatsApp, email or through the website becomes
        binding upon written confirmation by the Supplier. The Client agrees to
        the applicable minimum order: MAD 800 ex-VAT for Marrakech, MAD 1,000
        ex-VAT for Agadir, save express derogation.
      </p>

      <h3>Article 3 — Prices</h3>
      <p>
        Prices are in Moroccan dirhams, ex-VAT, unless otherwise stated. VAT (20%)
        is added on the invoice. Prices may vary with market and seasonality, and
        are confirmed at each order.
      </p>

      <h3>Article 4 — Delivery</h3>
      <p>
        Delivery is carried out in served areas, Mon–Sat between 6:00 and 10:00.
        The precise slot is confirmed by WhatsApp the day before. The Supplier is
        not liable for delays caused by force majeure.
      </p>

      <h3>Article 5 — Receipt and claims</h3>
      <p>
        The Client must check conformity on receipt. Any claim for visible defect,
        wrong quantity or SKU must be notified in writing within 4 hours of
        delivery, with photos. After this period, goods are deemed accepted.
      </p>

      <h3>Article 6 — Payment</h3>
      <p>
        Unless otherwise agreed, payment is due on delivery or by bank transfer
        15 or 30 days from invoice date after opening a customer account.
        Overdue amounts trigger statutory late-payment interest under Moroccan
        law without prior notice.
      </p>

      <h3>Article 7 — Retention of title</h3>
      <p>
        Goods remain the Supplier&apos;s property until full payment, per Article
        618 of the Moroccan Code of Obligations and Contracts.
      </p>

      <h3>Article 8 — Force majeure</h3>
      <p>
        Force majeure includes weather damaging the harvest, supply disruptions
        beyond the Supplier&apos;s control, strikes, transport blockages,
        epidemics, and any event beyond reasonable control.
      </p>

      <h3>Article 9 — Confidentiality and data</h3>
      <p>
        The parties undertake to keep exchanged information confidential. The
        Client&apos;s data is processed per our{' '}
        <Link href="/politique-confidentialite">privacy policy</Link> and Law 09-08.
      </p>

      <h3>Article 10 — Governing law and jurisdiction</h3>
      <p>
        These Terms are governed by Moroccan law. Failing amicable settlement,
        any dispute falls under the exclusive jurisdiction of the Commercial
        Court of Marrakech.
      </p>
    </>
  );
}

function AR() {
  return (
    <>
      <h3>المادة 1 — المجال</h3>
      <p>
        تنظم هذه الشروط العامة العلاقة التعاقدية بين{' '}
        <strong>{siteConfig.legalName}</strong> (&quot;المورد&quot;) وأي عميل مهني
        (&quot;العميل&quot;)، باستثناء المستهلكين.
      </p>

      <h3>المادة 2 — الطلب</h3>
      <p>
        كل طلب عبر الهاتف أو واتساب أو البريد أو الموقع يصبح نهائياً بعد التأكيد
        الكتابي من المورد. الحد الأدنى للطلب: 800 درهم لمراكش، 1000 درهم لأكادير.
      </p>

      <h3>المادة 3 — الأسعار</h3>
      <p>
        الأسعار بالدرهم المغربي، خارج الضريبة. تضاف الضريبة على القيمة المضافة
        (20%). يمكن أن تتغير حسب السوق والموسم.
      </p>

      <h3>المادة 4 — التسليم</h3>
      <p>
        التسليم في المناطق المعنية من الإثنين إلى السبت بين 6 و 10 صباحاً. يُؤكَّد
        الموعد الدقيق عشية اليوم السابق عبر واتساب.
      </p>

      <h3>المادة 5 — التحقق والمطالبات</h3>
      <p>
        على العميل التحقق من المطابقة عند الاستلام. أي مطالبة بعيب ظاهر أو خطأ
        في الكمية يجب الإبلاغ بها كتابياً خلال 4 ساعات مع صور.
      </p>

      <h3>المادة 6 — الدفع</h3>
      <p>
        نقداً عند التسليم، أو بتحويل بنكي 15 أو 30 يوماً بعد فتح حساب العميل.
      </p>

      <h3>المادة 7 — القانون المطبق</h3>
      <p>
        تخضع هذه الشروط للقانون المغربي. تختص المحكمة التجارية بمراكش بالنظر في
        أي نزاع.
      </p>
    </>
  );
}
