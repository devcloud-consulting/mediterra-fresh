import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { LegalLayout } from '@/components/LegalLayout';
import { siteConfig } from '@/lib/site';
import type { Locale } from '@/i18n/routing';

const LAST_UPDATE = '2025-01-15';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legal.privacy' });
  return { title: t('title') };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const safeLocale = locale as Locale;

  const t = await getTranslations('legal.privacy');

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
      <h3>1. Responsable du traitement</h3>
      <p>
        Le responsable du traitement des données collectées via ce site est{' '}
        <strong>{siteConfig.legalName}</strong>, dont le siège est situé{' '}
        {siteConfig.address.street}, {siteConfig.address.postal}{' '}
        {siteConfig.address.city}, {siteConfig.address.country}. Contact :{' '}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
      </p>
      <p>
        Le traitement est déclaré auprès de la Commission Nationale de
        contrôle de la Protection des Données à caractère Personnel (CNDP) sous
        la référence {siteConfig.legal.cndp}, conformément à la loi marocaine
        n° 09-08.
      </p>

      <h3>2. Données collectées</h3>
      <ul>
        <li><strong>Formulaire de contact</strong> : nom, établissement, fonction, ville, email, téléphone, message.</li>
        <li><strong>Mesure d&apos;audience</strong> : adresse IP anonymisée, pages visitées, durée, type d&apos;appareil, source de visite. Aucune donnée personnellement identifiante n&apos;est conservée.</li>
        <li><strong>Cookies fonctionnels</strong> : choix de langue, état des bandeaux d&apos;information.</li>
      </ul>

      <h3>3. Finalités</h3>
      <ul>
        <li>Répondre à vos demandes commerciales (devis, échantillons, questions).</li>
        <li>Vous recontacter dans le cadre d&apos;une relation B2B.</li>
        <li>Améliorer la performance et la lisibilité du site.</li>
        <li>Respecter nos obligations comptables et fiscales (factures, contrats).</li>
      </ul>

      <h3>4. Base légale</h3>
      <p>
        Vos données sont traitées sur la base de votre <strong>consentement</strong> (formulaire de contact, inscription newsletter), de l&apos;
        <strong>exécution d&apos;un contrat</strong> ou de mesures précontractuelles, et de notre <strong>intérêt légitime</strong> à promouvoir notre activité B2B.
      </p>

      <h3>5. Durée de conservation</h3>
      <ul>
        <li>Données prospects : 3 ans à compter du dernier contact.</li>
        <li>Données clients : durée de la relation contractuelle + 10 ans (obligation comptable).</li>
        <li>Logs d&apos;analyse : 13 mois maximum.</li>
      </ul>

      <h3>6. Destinataires</h3>
      <p>
        Vos données ne sont jamais vendues. Elles sont accessibles à notre équipe
        commerciale interne et, le cas échéant, à nos sous-traitants techniques
        (hébergeur, outil d&apos;envoi d&apos;email, CRM), liés par contrat de
        sous-traitance conforme à la loi 09-08.
      </p>

      <h3>7. Vos droits</h3>
      <p>
        Conformément à la loi 09-08 (et au RGPD pour les ressortissants UE), vous
        disposez d&apos;un droit d&apos;accès, de rectification, d&apos;opposition,
        de limitation et de suppression de vos données. Pour exercer ces droits :{' '}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> — réponse
        sous 30 jours. Vous pouvez également saisir la CNDP (
        <a href="https://www.cndp.ma" target="_blank" rel="noopener">www.cndp.ma</a>).
      </p>

      <h3>8. Sécurité</h3>
      <p>
        Le site est servi en HTTPS. Les données sont stockées sur des serveurs
        sécurisés avec contrôle d&apos;accès et sauvegardes chiffrées. Aucune
        donnée n&apos;est transférée hors d&apos;un pays jugé adéquat sans votre
        consentement explicite.
      </p>

      <h3>9. Désinscription email</h3>
      <p>
        Tout email B2B que nous envoyons contient un lien de désinscription
        fonctionnel. Vous pouvez également écrire à{' '}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> avec pour
        objet « Désinscription ».
      </p>
    </>
  );
}

function EN() {
  return (
    <>
      <h3>1. Data controller</h3>
      <p>
        The controller for personal data collected through this site is{' '}
        <strong>{siteConfig.legalName}</strong>, registered office at{' '}
        {siteConfig.address.street}, {siteConfig.address.postal}{' '}
        {siteConfig.address.city}, {siteConfig.address.country}. Contact:{' '}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
      </p>
      <p>
        Processing is declared with the Moroccan CNDP ({siteConfig.legal.cndp})
        under law 09-08, and complies with the GDPR for EU residents.
      </p>

      <h3>2. Data we collect</h3>
      <ul>
        <li><strong>Contact form</strong>: name, venue, role, city, email, phone, message.</li>
        <li><strong>Analytics</strong>: anonymised IP, pages, duration, device, source. No personally identifying data is retained.</li>
        <li><strong>Functional cookies</strong>: language preference, banner state.</li>
      </ul>

      <h3>3. Purposes</h3>
      <ul>
        <li>Respond to your commercial requests.</li>
        <li>Contact you within a B2B context.</li>
        <li>Improve site performance.</li>
        <li>Meet accounting and tax obligations.</li>
      </ul>

      <h3>4. Legal basis</h3>
      <p>
        We process your data based on <strong>consent</strong>, <strong>contract performance</strong>
        or pre-contractual steps, and our <strong>legitimate interest</strong> in B2B prospecting.
      </p>

      <h3>5. Retention</h3>
      <ul>
        <li>Prospect data: 3 years from last contact.</li>
        <li>Customer data: duration of contract + 10 years (accounting).</li>
        <li>Analytics logs: 13 months max.</li>
      </ul>

      <h3>6. Recipients</h3>
      <p>
        We never sell your data. Access is limited to our sales team and, where
        relevant, technical processors (hosting, email tooling, CRM), bound by
        Law 09-08-compliant data processing agreements.
      </p>

      <h3>7. Your rights</h3>
      <p>
        Under Law 09-08 (and GDPR for EU residents) you have rights of access,
        rectification, objection, restriction and deletion. Email{' '}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> — reply
        within 30 days. You may also lodge a complaint with the CNDP at{' '}
        <a href="https://www.cndp.ma" target="_blank" rel="noopener">www.cndp.ma</a>.
      </p>

      <h3>8. Security</h3>
      <p>
        The site runs over HTTPS. Data is stored on secured servers with access
        control and encrypted backups.
      </p>

      <h3>9. Email opt-out</h3>
      <p>
        Every B2B email contains a working unsubscribe link. You may also email{' '}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> with
        subject &quot;Unsubscribe&quot;.
      </p>
    </>
  );
}

function AR() {
  return (
    <>
      <h3>1. المسؤول عن المعالجة</h3>
      <p>
        المسؤول عن معالجة البيانات المجموعة عبر هذا الموقع هو{' '}
        <strong>{siteConfig.legalName}</strong>، مقره {siteConfig.address.street}،{' '}
        {siteConfig.address.postal} {siteConfig.address.city}،{' '}
        {siteConfig.address.country}. للتواصل:{' '}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
      </p>
      <p>المعالجة مصرح بها لدى CNDP ({siteConfig.legal.cndp}) وفق القانون 09-08.</p>

      <h3>2. البيانات المجموعة</h3>
      <ul>
        <li><strong>نموذج الاتصال</strong>: الاسم، المؤسسة، الوظيفة، المدينة، البريد، الهاتف، الرسالة.</li>
        <li><strong>تحليل الزيارات</strong>: عنوان IP مجهول، الصفحات، المدة، الجهاز، المصدر.</li>
        <li><strong>كوكيز وظيفية</strong>: تفضيل اللغة، حالة اللوافت.</li>
      </ul>

      <h3>3. الأهداف</h3>
      <ul>
        <li>الرد على طلباتكم التجارية.</li>
        <li>الاتصال بكم في إطار علاقة B2B.</li>
        <li>تحسين أداء الموقع.</li>
        <li>الوفاء بالالتزامات المحاسبية والضريبية.</li>
      </ul>

      <h3>4. حقوقكم</h3>
      <p>
        لكم الحق في الوصول والتعديل والاعتراض والحد والحذف وفق القانون 09-08.
        راسلونا على{' '}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
      </p>
    </>
  );
}
