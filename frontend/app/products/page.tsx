
"use client";

import { useEffect, useState } from 'react';
import { getProducts } from '@/lib/api';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Tag } from 'lucide-react';

type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl?: string;
};

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProducts();
            setProducts(data);
            setLoading(false);
        };
        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-pink-500"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
                Latest <span className="text-pink-600">Flash Deals</span>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                    <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-gray-100 flex flex-col">
                        <div className="h-64 bg-gray-100 flex items-center justify-center overflow-hidden relative">
                            {product.imageUrl ? (
                                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain p-4 mix-blend-multiply" />
                            ) : (
                                <Tag size={48} className="text-gray-400" />
                            )}
                        </div>
                        <div className="p-6 flex-grow flex flex-col justify-between">
                            <div>
                                <h2 className="text-xl font-bold mb-2 text-gray-900 line-clamp-2">{product.name}</h2>
                                <p className="text-gray-600 mb-4 text-sm line-clamp-3">{product.description}</p>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                                <button
                                    onClick={() => addToCart(product)}
                                    className="bg-gray-900 text-white p-3 rounded-full hover:bg-pink-600 transition-colors flex items-center gap-2 text-sm font-semibold"
                                >
                                    <ShoppingCart size={18} />
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {products.length === 0 && (
                <div className="text-center text-gray-500 mt-20">
                    <p className="text-xl">No products available at the moment.</p>
                </div>
            )}
        </div>
    );
}
