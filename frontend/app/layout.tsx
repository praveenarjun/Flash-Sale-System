
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flash Sale System",
  description: "High performance microservices based flash sale system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <nav className="bg-gray-900 text-white p-4 shadow-md sticky top-0 z-50 backdrop-blur-md bg-opacity-80">
            <div className="container mx-auto flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                FlashSale
              </Link>
              <div className="space-x-6">
                <Link href="/products" className="hover:text-pink-400 transition-colors">Products</Link>
                <Link href="/cart" className="hover:text-pink-400 transition-colors">Cart</Link>
              </div>
            </div>
          </nav>
          <main className="min-h-screen bg-gray-50 text-gray-900">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
