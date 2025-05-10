import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={`${inter.className} antialiased`}>
        <header className="bg-gray-100 border-b border-gray-200 text-gray-900 p-4">
          <div className="container mx-auto flex items-center">
            <h1 className="text-xl font-bold">G21 Portal</h1>
            <nav className="ml-6 flex space-x-4">
              <Link href="/" className="text-gray-900 hover:text-gray-600 transition-colors">
                Home
              </Link>
              <Link href="/reviews" className="text-gray-900 hover:text-gray-600 transition-colors">
                Reviews
              </Link>
              <Link href="/submit" className="text-gray-900 hover:text-gray-600 transition-colors">
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
