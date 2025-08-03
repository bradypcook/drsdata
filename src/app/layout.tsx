import type { Metadata } from "next";
import { Orbitron } from 'next/font/google';
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const basePath = process.env.NODE_ENV === 'production' ? '/drsdata' : '';

export const metadata: Metadata = {
  title: {
    default: 'DRSdata',
    template: 'DRSdata - %s',
  },
  description: "Dive into real-time and historical Formula 1 stats, all in one place.",
  icons: {
    icon: `${basePath}/redcar.ico`,
  },
  openGraph: {
    title: 'DRSdata',
    description: "Dive into real-time and historical Formula 1 stats, all in one place.",
    url: 'https://bradypcook.github.io/drsdata',
    siteName: 'DRSdata',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={orbitron.variable}>
        {children}
      </body>
    </html>
  );
}
