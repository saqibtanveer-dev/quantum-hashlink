import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});


export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata = {
  metadataBase: new URL('https://quantum-hashlink.com'),
  title: {
    default: 'Quantum HashLink | Modern Software Development & Tech Solutions',
    template: '%s | Quantum HashLink',
  },
  description: 'Quantum HashLink is a tech startup providing modern, scalable software solutions. From web development to mobile apps — we craft technology that grows with you.',
  keywords: ['software development', 'web development', 'tech solutions', 'quantum hashlink', 'pakistan tech company'],
  authors: [{ name: 'Quantum HashLink' }],
  creator: 'Quantum HashLink',
  publisher: 'Quantum HashLink',
  openGraph: {
    title: 'Quantum HashLink | Modern Software Development & Tech Solutions',
    description: 'We build modern, scalable, and efficient software tailored to your business goals.',
    url: 'https://quantum-hashlink.com',
    siteName: 'Quantum HashLink',
    images: [{ url: '/qhl_logo.png', width: 512, height: 512, alt: 'Quantum HashLink Logo' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quantum HashLink | Modern Software Development',
    description: 'We build modern, scalable, and efficient software tailored to your business goals.',
    images: ['/qhl_logo.png'],
  },
  alternates: {
    canonical: 'https://quantum-hashlink.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Quantum HashLink',
  url: 'https://quantum-hashlink.com',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Quantum HashLink',
  url: 'https://quantum-hashlink.com',
  logo: 'https://quantum-hashlink.com/qhl_logo.png',
  description: 'A tech startup providing modern, scalable software solutions.',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+92-336-0000994',
    contactType: 'customer service',
    areaServed: 'PK',
    availableLanguage: ['English', 'Urdu'],
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Jadoon Hostel, University Road',
    addressLocality: 'Haripur',
    addressRegion: 'Khyber Pakhtunkhwa',
    addressCountry: 'PK',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.className} antialiased bg-[#FCFCFC]`}
      >
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[99999] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:top-2 focus:left-2 focus:rounded">
          Skip to main content
        </a>
        <Header />
        <main id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
