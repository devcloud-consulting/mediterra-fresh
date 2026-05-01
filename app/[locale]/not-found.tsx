import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Container, Section, Eyebrow, Button } from '@/components/ui';
import { Link } from '@/i18n/navigation';

export default async function LocaleNotFound() {
  const t = await getTranslations('nav');

  return (
    <Section tone="paper">
      <Container>
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <Eyebrow>404 · Page introuvable</Eyebrow>
            <h1 className="headline-lg mt-5 text-olive-900">Cette page a quitté le verger.</h1>
            <p className="mt-7 text-olive-700/85 leading-relaxed text-lg max-w-xl">
              La page que vous cherchez n&apos;existe pas, ou a été déplacée.
              <br />
              The page you are looking for does not exist or has moved.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button as={Link} href="/" variant="primary" size="lg">
                {t('home')}
              </Button>
              <Button as={Link} href="/catalogue" variant="secondary" size="lg">
                {t('catalogue')}
              </Button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-olive-100">
              <Image
                src="/images/hero/harvest-hands.jpg"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover tile-image"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
