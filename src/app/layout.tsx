import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'UIC — Make your presence felt.',
  description:
    'Unique Identity Crafting. Brand identities, websites, business systems and NFC experiences, built around what makes you different.',
};

export const viewport: Viewport = { themeColor: '#101112' };

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
