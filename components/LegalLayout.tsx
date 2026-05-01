import Image from 'next/image';
import { Container, Section, Eyebrow } from './ui';
import type { ReactNode } from 'react';

type Props = {
  title: string;
  lastUpdate: string;
  lastUpdateLabel: string;
  /** Optional table of contents — array of { id, label } entries. */
  toc?: { id: string; label: string }[];
  children: ReactNode;
};

export function LegalLayout({ title, lastUpdate, lastUpdateLabel, toc, children }: Props) {
  return (
    <>
      <section className="relative bg-paper">
        <Container className="py-16 sm:py-20">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <Eyebrow>
                {lastUpdateLabel} : {lastUpdate}
              </Eyebrow>
              <h1 className="headline-lg mt-5 text-olive-900">{title}</h1>
            </div>
            <div className="lg:col-span-5">
              <div className="relative aspect-[5/4] rounded-3xl overflow-hidden bg-olive-100">
                <Image
                  src="/images/categories/cat-herbes.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover tile-image"
                  priority
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section className="pt-12 sm:pt-16">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12">
            {toc && toc.length > 0 ? (
              <aside className="lg:col-span-3">
                <div className="sticky top-24">
                  <p className="eyebrow text-olive-600 mb-4">Sommaire</p>
                  <ol className="space-y-2 text-sm">
                    {toc.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="text-olive-700 hover:text-olive-900 hover:underline underline-offset-4 transition-colors"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              </aside>
            ) : null}
            <div className={toc && toc.length > 0 ? 'lg:col-span-9' : 'lg:col-span-12 max-w-3xl'}>
              <div className="prose-legal text-olive-800 leading-relaxed space-y-6">
                {children}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
