import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog posts on software engineering, digital nomad life and my personal philosophies.',
  description: 'Read blog posts on software engineering, including front-end and back-end development, JS/TS, Rust, and more. Occasionally, Sometimes, I also write about digital nomad life and personal philosophies.',
};

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}