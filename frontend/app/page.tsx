
import Link from 'next/link';
import { Sparkles, Zap, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Hero Section */}
      <section className="w-full py-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
              Flash Sale
            </span>
            <br />
            Is Live Now!
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Grab the best deals on premium products before they run out. High-performance, secure, and fast.
          </p>
          <Link href="/products" className="inline-block bg-white text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-transform transform hover:scale-105 shadow-lg">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 w-full bg-white">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-2xl bg-gray-50 hover:shadow-xl transition-shadow">
            <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-pink-600">
              <Zap size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Lightning Fast</h3>
            <p className="text-gray-600">Optimized for high traffic and speed.</p>
          </div>
          <div className="p-6 rounded-2xl bg-gray-50 hover:shadow-xl transition-shadow">
            <div className="bg-violet-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-violet-600">
              <Sparkles size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Premium Quality</h3>
            <p className="text-gray-600">Curated products from top brands.</p>
          </div>
          <div className="p-6 rounded-2xl bg-gray-50 hover:shadow-xl transition-shadow">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Secure Payments</h3>
            <p className="text-gray-600">100% secure checkout process.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
