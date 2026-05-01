import { type ReactNode, type ElementType } from 'react';
import clsx from 'clsx';

type Props = {
  children: ReactNode;
  delay?: 0 | 1 | 2 | 3 | 4 | 5;
  as?: ElementType;
  className?: string;
};

/**
 * A small wrapper that adds a tasteful fade-and-lift entrance animation.
 * The animation is pure CSS (see globals.css → `.reveal`), gated behind
 * `<html class="js">` so non-JS / pre-hydration users see fully visible
 * content.
 *
 * This is a server component — no client-side JS needed.
 */
export function Reveal({ children, delay = 0, as: Tag = 'div', className }: Props) {
  return (
    <Tag
      data-delay={delay || undefined}
      className={clsx('reveal', className)}
    >
      {children}
    </Tag>
  );
}
