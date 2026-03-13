import type { ReactNode } from 'react';
import './globals.css';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], display: 'swap' });

export const metadata = {
  title: 'Telemedicine Auth',
  description: 'Secure sign in for doctors and patients.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={spaceGrotesk.className}>
      <body>{children}</body>
    </html>
  );
}
