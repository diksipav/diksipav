import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BgLayout from '@/components/BgLayout';
import '@/globals.css';

export const metadata: Metadata = {
  title: 'Software Engineer & Consultants | Insights on Tech, AI & Software',
  description:
    "Hi, I'm a software engineer and digital nomad from Serbia. Explore my insights on software engineering, tech adventures, and personal interests. Currently building with EdgeDB and sharing my experiences with coding, nature, and more.",
  authors: [{ name: 'Dijana Pavlovic' }],
  openGraph: {
    title: 'Software Engineer & Consultants | Insights on Tech, AI & Software',
    description:
      "Hi, I'm a software engineer and digital nomad from Serbia. Explore my insights on software engineering, tech adventures, and personal interests. Currently building with EdgeDB and sharing my experiences with coding, nature, and more.",
    type: 'website',
    url: 'https://www.diksipav.com',
    images: [
      {
        url: 'https://www.diksipav.com/profile.png',
        width: 1200,
        height: 630,
        alt: 'Dijana Pavlovic',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@diksipav',
    images: ['https://www.diksipav.com/profile.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <BgLayout>
          <Header />
          {children}
          <Footer />
        </BgLayout>
      </body>
    </html>
  );
}
