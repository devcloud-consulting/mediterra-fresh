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
  const t = await getTranslations({ locale, namespace: 'legal.mentions' });
  return { title: t('title'), robots: { index: false, follow: true } };
}

export default async function MentionsLegales({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const safeLocale = locale as Locale;

  const t = await getTranslations('legal.mentions');

  return (
    <LegalLayout
      title={t('title')}
      lastUpdate={LAST_UPDATE}
      lastUpdateLabel={t('lastUpdate')}
    >
      {safeLocale === 'fr' && <FR />}
      {safeLocale === 'en' && <EN />}
      {safeLocale === 'ar' && <AR />}
    </LegalLayout>
  );
}

function FR() {
  return (
    <>
      <h3>1. Éditeur du site</h3>
      <p>
        Le site <a href={siteConfig.url}>{siteConfig.url}</a> est édité par{' '}
        <strong>{siteConfig.legalName}</strong>, société à responsabilité limitée
        de droit marocain, immatriculée au Registre du Commerce d&apos;Agadir sous
        le numéro {siteConfig.legal.rc}.
      </p>
      <ul>
        <li>Siège social : {siteConfig.address.street}, {siteConfig.address.postal} {siteConfig.address.city}, {siteConfig.address.country}</li>
        <li>ICE : {siteConfig.legal.ice}</li>
        <li>IF : {siteConfig.legal.if}</li>
        <li>Patente : {siteConfig.legal.patente}</li>
        <li>CNSS : {siteConfig.legal.cnss}</li>
        <li>Téléphone : {siteConfig.phoneDisplay}</li>
        <li>Email : <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></li>
        <li>Directeur de la publication : [Prénom Nom du gérant]</li>
      </ul>

      <h3>2. Hébergement</h3>
      <p>
        Le site est hébergé par [Nom de l&apos;hébergeur — ex. LWS / Genious
        Communication / Vercel Inc.], dont les coordonnées sont communiquées sur
        simple demande à l&apos;adresse <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
      </p>

      <h3>3. Propriété intellectuelle</h3>
      <p>
        L&apos;ensemble des contenus du site (textes, photographies, logos, marques)
        est la propriété exclusive de {siteConfig.legalName} ou de ses partenaires.
        Toute reproduction, représentation ou diffusion, totale ou partielle, sans
        autorisation écrite préalable est interdite et constituerait une
        contrefaçon sanctionnée par les articles 65 et suivants de la loi marocaine
        n° 17-97 relative à la protection de la propriété industrielle et la loi
        n° 2-00 relative aux droits d&apos;auteur.
      </p>

      <h3>4. Données personnelles</h3>
      <p>
        Le traitement des données à caractère personnel collectées via ce site est
        encadré par la loi         n° 09-08 et déclaré auprès de la CNDP (
        {siteConfig.legal.cndp}). Pour plus de détails, consultez notre{' '}
        <Link href="/politique-confidentialite">politique de confidentialité</Link>.
      </p>

      <h3>5. Cookies</h3>
      <p>
        Le site utilise uniquement des cookies strictement nécessaires à son
        fonctionnement et, si activé, un outil d&apos;analyse de fréquentation
        respectueux de la vie privée (Plausible / Google Analytics avec IP
        anonymisée). Aucun cookie tiers à finalité publicitaire n&apos;est déposé.
      </p>

      <h3>6. Loi applicable</h3>
      <p>
        Les présentes mentions légales sont régies par le droit marocain. En cas
        de litige, compétence est attribuée aux tribunaux d&apos;Agadir.
      </p>
    </>
  );
}

function EN() {
  return (
    <>
      <h3>1. Publisher</h3>
      <p>
        This website (<a href={siteConfig.url}>{siteConfig.url}</a>) is published
        by <strong>{siteConfig.legalName}</strong>, a Moroccan limited liability
        company registered with the Agadir trade register under{' '}
        {siteConfig.legal.rc}.
      </p>
      <ul>
        <li>Registered office: {siteConfig.address.street}, {siteConfig.address.postal} {siteConfig.address.city}, {siteConfig.address.country}</li>
        <li>ICE: {siteConfig.legal.ice}</li>
        <li>Phone: {siteConfig.phoneDisplay}</li>
        <li>Email: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></li>
        <li>Publication director: [Manager full name]</li>
      </ul>

      <h3>2. Hosting</h3>
      <p>
        This site is hosted by [Hosting provider name]. Full details on request
        at <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
      </p>

      <h3>3. Intellectual property</h3>
      <p>
        All content on this site (text, photos, logos, trademarks) is the
        exclusive property of {siteConfig.legalName} or its partners. Any
        reproduction without prior written authorisation is prohibited.
      </p>

      <h3>4. Personal data</h3>
      <p>
        Personal data processing on this site is governed by Moroccan law 09-08
        and declared with the CNDP ({siteConfig.legal.cndp}). See our{' '}
        <Link href="/politique-confidentialite">privacy policy</Link>.
      </p>

      <h3>5. Cookies</h3>
      <p>
        We only use strictly necessary cookies and, optionally, a privacy-friendly
        analytics tool. No third-party advertising cookies are set.
      </p>

      <h3>6. Applicable law</h3>
      <p>
        These legal notices are governed by Moroccan law. The Agadir courts
        shall have exclusive jurisdiction.
      </p>
    </>
  );
}

function AR() {
  return (
    <>
      <h3>1. ناشر الموقع</h3>
      <p>
        هذا الموقع (<a href={siteConfig.url}>{siteConfig.url}</a>) ناشره{' '}
        <strong>{siteConfig.legalName}</strong>، شركة ذات مسؤولية محدودة خاضعة
        للقانون المغربي، مسجلة في السجل التجاري بأكادير تحت رقم{' '}
        {siteConfig.legal.rc}.
      </p>
      <ul>
        <li>المقر الاجتماعي: {siteConfig.address.street}، {siteConfig.address.postal} {siteConfig.address.city}، {siteConfig.address.country}</li>
        <li>ICE: {siteConfig.legal.ice}</li>
        <li>الهاتف: {siteConfig.phoneDisplay}</li>
        <li>البريد: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></li>
      </ul>

      <h3>2. الاستضافة</h3>
      <p>الموقع مُستضاف لدى [اسم المستضيف]. يمكن طلب التفاصيل عبر البريد.</p>

      <h3>3. الملكية الفكرية</h3>
      <p>
        جميع محتويات الموقع (نصوص، صور، شعارات) هي ملكية حصرية لـ
        {' '}{siteConfig.legalName} أو شركائها. يُمنع أي استنساخ بدون إذن خطي مسبق.
      </p>

      <h3>4. البيانات الشخصية</h3>
      <p>
        تخضع معالجة البيانات الشخصية على هذا الموقع للقانون 09-08 وللتصريح لدى
        CNDP ({siteConfig.legal.cndp}). راجع{' '}
        <Link href="/politique-confidentialite">سياسة الخصوصية</Link>.
      </p>

      <h3>5. القانون المطبق</h3>
      <p>
        تخضع هذه الإشعارات للقانون المغربي. وتختص محاكم أكادير بالنظر في أي نزاع.
      </p>
    </>
  );
}
