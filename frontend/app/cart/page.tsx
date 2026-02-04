
"use client";

import { useCart } from '@/context/CartContext';
import { placeOrder } from '@/lib/api';
import { Trash2, CreditCard, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
    const { cart, removeFromCart, clearCart, total } = useCart();
    const [isProcessing, setIsProcessing] = useState(false);
    const router = useRouter();

    const handleCheckout = async () => {
        setIsProcessing(true);
        try {
            // Process each item as a separate order for now, or bundle them if API supports it
            // The OrderService places one order at a time based on API inspection
            for (const item of cart) {
                const orderRequest = {
                    skuCode: item.skuCode, // Using name as skuCode
                    price: item.price,
                    quantity: item.quantity,
                    orderNumber: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}` // Generate a random order number
                };
                await placeOrder(orderRequest);
            }
            alert('Order Placed Successfully!');
            clearCart();
            // Optional: Redirect to success page or orders page
        } catch (error) {
            alert('Failed to place order. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                    <ShoppingBagIcon className="text-gray-400" size={40} />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-gray-800">Your Cart is Empty</h2>
                <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
                <button
                    onClick={() => router.push('/products')}
                    className="bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
                >
                    Start Shopping <ArrowRight size={18} />
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Shopping Cart</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {cart.map((item) => (
                        <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <span className="font-bold text-gray-400 text-xl">{item.name.charAt(0)}</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <p className="font-bold text-lg text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-colors"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-24">
                        <h2 className="text-xl font-bold mb-6 text-gray-800">Order Summary</h2>
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span className="text-green-600">Free</span>
                            </div>
                            <div className="border-t pt-3 flex justify-between font-bold text-xl text-gray-900">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                        <button
                            onClick={handleCheckout}
                            disabled={isProcessing}
                            className={`w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 ${isProcessing ? 'opacity-75 cursor-not-allowed' : 'hover:scale-[1.02]'}`}
                        >
                            {isProcessing ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                            ) : (
                                <>
                                    <CreditCard size={20} />
                                    Checkout
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ShoppingBagIcon({ className, size }: { className?: string, size?: number }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
    )
}

