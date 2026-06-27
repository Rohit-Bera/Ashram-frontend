import React, { useState } from 'react';
import { ShoppingBag, X, Plus, Minus, Tag } from 'lucide-react';
import { useGlobalContext } from '../context/LangContext';

interface CartDrawerProps {
  onClose: () => void;
  onToast: (msg: string) => void;
  onNavigateToStore: () => void;
  onCheckout: () => void;
  onOpenAuth: () => void;
}

export function CartDrawer({ onClose, onToast, onNavigateToStore, onCheckout, onOpenAuth }: CartDrawerProps) {
  const { t, cart, products, updateCartQuantity, removeFromCart, currentUser, couponCode, discountRate, applyCoupon } = useGlobalContext();
  const [couponInput, setCouponInput] = useState('');

  const cartWithData = cart.map(item => {
    const p = products.find(prod => prod.id === item.productId);
    return { ...item, product: p };
  }).filter(item => item.product !== undefined);

  const subtotal = cartWithData.reduce((sum, item) => sum + (item.product!.price * item.quantity), 0);
  const couponDiscount = Math.round(subtotal * discountRate);
  const total = subtotal - couponDiscount;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = applyCoupon(couponInput);
    if (ok) {
      onToast('Auspicious coupon code accepted! Discount applied.');
    } else {
      onToast('Code is not recognized. Try "KRIYA10" or "YOGA10".');
    }
    setCouponInput('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-amber-950/30 backdrop-blur-sm flex justify-end">
      <div className="bg-amber-50 w-full max-w-md h-full shadow-2xl border-l border-amber-100 flex flex-col justify-between overflow-hidden text-left animate-in slide-in-from-right duration-200">

        <div className="bg-[#5C4D3C] text-white p-4 flex justify-between items-center border-b border-amber-100/10">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-serif font-bold tracking-wide">My Sacred Seva Cart</h3>
          </div>
          <button onClick={onClose} className="text-amber-100 hover:text-white bg-amber-900 p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {cartWithData.length === 0 ? (
            <div className="text-center py-16 text-amber-800/50 italic space-y-3 font-serif">
              <ShoppingBag className="w-12 h-12 mx-auto text-amber-200" />
              <p>Your Seva Cart is empty currently.</p>
              <button
                onClick={() => { onClose(); onNavigateToStore(); }}
                className="not-italic text-xs text-amber-600 underline font-bold mt-2"
              >
                Go browse spiritual store
              </button>
            </div>
          ) : (
            cartWithData.map((item, idx) => (
              <div key={idx} className="flex gap-4 items-center bg-white rounded-xl p-3 border border-amber-100/60 shadow-sm text-xs leading-snug">
                <img
                  src={item.product!.imageUrl}
                  alt={t(item.product!.name)}
                  className="w-16 h-16 object-cover rounded-lg bg-amber-50"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif font-bold text-amber-950 leading-tight truncate">{t(item.product!.name)}</h4>
                  <p className="text-[10px] text-amber-600 mt-1 uppercase font-bold">{item.product!.category}</p>
                  <p className="text-xs font-bold font-mono mt-1 text-amber-950">₹{item.product!.price}</p>
                  <div className="flex items-center gap-3 mt-2.5">
                    <div className="flex items-center border border-amber-200 rounded-lg overflow-hidden bg-amber-50/50">
                      <button onClick={() => updateCartQuantity(item.productId, item.quantity - 1)} className="p-1 hover:bg-amber-100">
                        <Minus className="w-3 h-3 text-amber-850" />
                      </button>
                      <span className="px-3 font-bold font-mono text-[11px]">{item.quantity}</span>
                      <button onClick={() => updateCartQuantity(item.productId, item.quantity + 1)} className="p-1 hover:bg-amber-100">
                        <Plus className="w-3 h-3 text-amber-850" />
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(item.productId)} className="text-rose-600 hover:text-rose-700 text-[10px] font-bold">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartWithData.length > 0 && (
          <div className="bg-amber-50 p-4 border-t border-amber-200 space-y-3.5">
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-2.5 top-2 w-3.5 h-3.5 text-amber-500" />
                <input
                  type="text"
                  placeholder="Enter Coupon (e.g. KRIYA10)"
                  value={couponInput}
                  onChange={e => setCouponInput(e.target.value)}
                  className="bg-white border border-amber-200 p-2 pl-8 rounded-lg text-xs w-full focus:outline-none"
                />
              </div>
              <button type="submit" className="bg-amber-950 hover:bg-black text-white px-3.5 py-1.5 rounded-lg text-xs font-bold">
                Apply
              </button>
            </form>

            <div className="space-y-2 border-t border-amber-100/50 pt-3 text-xs leading-none">
              <div className="flex justify-between text-amber-800">
                <span>Subtotal listings:</span>
                <span className="font-mono">₹{subtotal}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Applied discount ({couponCode}):</span>
                  <span className="font-mono">-₹{couponDiscount}</span>
                </div>
              )}
              <div className="flex justify-between text-amber-800">
                <span>Spiritual delivery:</span>
                <span className="text-emerald-700 font-bold">FREE (Annadan)</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-amber-950 border-t border-amber-200/50 pt-2.5">
                <span>Contributing Total:</span>
                <span className="font-mono text-base">₹{total}</span>
              </div>
            </div>

            <button
              onClick={() => {
                if (!currentUser) {
                  onToast('Please Devotee Sign In first to checkout securely.');
                  onClose();
                  onOpenAuth();
                  return;
                }
                onCheckout();
              }}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-xl py-3 text-xs font-bold shadow transition-all transform active:scale-97 text-center block"
            >
              Proceed to Secure Checkout
            </button>
          </div>
        )}

        <div className="h-1 bg-gradient-to-r from-amber-600 to-amber-500" />
      </div>
    </div>
  );
}
