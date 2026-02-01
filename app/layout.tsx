import type { Metadata } from "next";
import "./globals.css";
import { DM_Sans } from 'next/font/google'
import { Syne } from 'next/font/google'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['400', '500', '600', '700'],
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '600', '700', '800'],
})


export const metadata: Metadata = {
  title: 'Cleanframe - Remove Watermarks from Videos for Free',
  description: 'Remove watermarks, text, stamps and logos from your videos instantly. Get clean HD clips on X-Design for free, no sign-up needed.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${syne.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
