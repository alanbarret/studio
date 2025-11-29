import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'CleanSweep Subscriptions',
  description: 'Impeccable Car Washes, Unmatched Convenience.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased min-h-screen bg-background ${inter.variable}`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
