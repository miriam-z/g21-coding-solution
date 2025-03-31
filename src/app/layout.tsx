import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "G21 Portal Coding Challenge",
  description: "A coding challenge for G21 Portal developer candidates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.className} ${geistMono.className} antialiased`}
      >
        <header className="bg-blue-700 text-white p-4">
          <div className="container mx-auto flex items-center">
            <h1 className="text-xl font-bold">G21 Portal</h1>
            <nav className="ml-6 flex space-x-4">
              <Link href="/" className="text-white hover:text-blue-200">
                Home
              </Link>
              <Link href="/reviews" className="text-white hover:text-blue-200">
                Reviews
              </Link>
              <Link href="/submit" className="text-white hover:text-blue-200">
                Submit
              </Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
