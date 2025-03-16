
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import RootProvider from '@/context/providers/root-provider';
import { Geist, Geist_Mono } from "next/font/google";
import { ReactNode } from "react";

import type { Metadata } from "next";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: 'Address Lookup',
  description: 'Address lookup application',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <RootProvider>

          <Header />

          {children}
          
          <Footer />

        </RootProvider>
      </body>
    </html>
  );
}
