import React, { useState } from 'react';
import { useGlobalContext } from '../context/LangContext';
import { X, CreditCard, ShieldCheck, Truck, ShoppingBag, Heart, Sparkles, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { ShippingAddress, OrderItem } from '../types';

interface CheckoutModalProps {
  onClose: () => void;
  onOrderPlaced: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ onClose, onOrderPlaced }) => {
  const { cart, products, t, currentUser, discountRate, couponCode, clearCart } = useGlobalContext();
  const [step, setStep] = useState<number>(1); // 1: Shipping, 2: Payment, 3: Success

  // Shipping form fields
  const [shippingForm, setShippingForm] = useState<ShippingAddress>({
    fullName: currentUser?.name || '',
    addressLines: currentUser?.shippingAddress?.addressLines || '',
    city: currentUser?.shippingAddress?.city || '',
    state: currentUser?.shippingAddress?.state || '',
    postalCode: currentUser?.shippingAddress?.postalCode || '',
    country: currentUser?.shippingAddress?.country || 'India'
  });

  // Credit card mockup states
  const [cardNo, setCardNo] = useState<string>('');
  const [expiry, setExpiry] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [placedOrderId, setPlacedOrderId] = useState<string>('');
  const [placedTrackingNo, setPlacedTrackingNo] = useState<string>('');

  // Cart item matches
  const cartWithProductData = cart.map(item => {
    const p = products.find(prod => prod.id === item.productId);
    return {
      productId: item.productId,
      quantity: item.quantity,
      product: p
    };
  }).filter(item => item.product !== undefined);

  // Computations
  const subtotal = cartWithProductData.reduce((sum, item) => sum + (item.product!.price * item.quantity), 0);
  const discount = Math.round(subtotal * discountRate);
  const total = subtotal - discount;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingForm.fullName || !shippingForm.addressLines || !shippingForm.city || !shippingForm.state || !shippingForm.postalCode) {
      alert('Kindly fill in all required shipping address elements to proceed safely.');
      return;
    }
    setStep(2);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cardNo.length < 15 || expiry.length < 4 || cvv.length < 3) {
      alert('Kindly enter valid simulated card credentials (15-16 digits card, expiry MM/YY, 3-4 digit CVV).');
      return;
    }

    setIsProcessing(true);

    try {
      // Structure standard checkout order payload
      const orderItems: OrderItem[] = cartWithProductData.map(item => ({
        productId: item.productId,
        productName: item.product!.name,
        quantity: item.quantity,
        price: item.product!.price
      }));

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser?.id || 'usr-default',
          items: orderItems,
          subtotal,
          couponCode: couponCode || undefined,
          discount,
          total,
          shippingAddress: shippingForm
        })
      });

      const orderResult = await res.json();
      if (orderResult.success) {
        setPlacedOrderId(orderResult.data.id);
        setPlacedTrackingNo(orderResult.data.trackingNumber);
        setStep(3);
        clearCart();
      } else {
        alert('Order placement failed on the server. Please try again.');
      }
    } catch (err) {
      console.error('Checkout processing error:', err);
      alert('Network disruption during payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-amber-950/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FAF7F2] w-full max-w-2xl rounded-2xl border border-amber-100 shadow-2xl overflow-hidden flex flex-col md:flex-row relative animate-in zoom-in-95 duration-150">
        
        {/* Close Button */}
        {step !== 3 && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-amber-900 hover:bg-amber-100/50 rounded-lg p-1.5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Left Aspect: Invoice Summary Card */}
        <div className="bg-gradient-to-b from-amber-50 to-amber-100/30 w-full md:w-80 p-6 border-b md:border-b-0 md:border-r border-amber-100 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-serif font-semibold text-amber-950 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              {t({
                en: 'Seva Cart Summary',
                hi: 'झोली सारांश',
                gu: 'થેલી વિગત',
                bn: 'মাঙ্গলিক সামগ্রী তালিকা'
              })}
            </h3>
            
            {/* Step progress pipeline */}
            <div className="mt-4 flex items-center gap-2">
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${step >= 1 ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-800'}`}>1. Shipping</span>
              <ArrowRight className="w-3 h-3 text-amber-400" />
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${step >= 2 ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-800'}`}>2. Payment</span>
            </div>

            {/* Invoices listings */}
            <div className="mt-6 space-y-3.5 max-h-[180px] overflow-y-auto pr-1">
              {cartWithProductData.map((item, i) => (
                <div key={i} className="flex gap-2.5 items-center bg-white p-2 rounded-lg border border-amber-100/50">
                  <img
                    src={item.product!.imageUrl}
                    alt={t(item.product!.name)}
                    className="w-10 h-10 object-cover rounded bg-amber-50"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-medium text-amber-950 truncate">{t(item.product!.name)}</p>
                    <p className="text-[10px] text-amber-700 font-mono mt-0.5">
                      {item.quantity} x ₹{item.product!.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing aggregates footer */}
          <div className="mt-6 border-t border-amber-200/80 pt-4 space-y-2 text-xs">
            <div className="flex justify-between text-amber-800">
              <span>Subtotal:</span>
              <span className="font-mono">₹{subtotal}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>Coupon ({couponCode}):</span>
                <span className="font-mono">-₹{discount}</span>
              </div>
            )}
            <div className="flex justify-between text-amber-800">
              <span>Standard delivery:</span>
              <span className="text-emerald-700 font-bold">FREE (Sacred Seva)</span>
            </div>
            <div className="flex justify-between text-base font-bold text-amber-950 pt-2 border-t border-amber-200/40">
              <span>Grand Total:</span>
              <span className="font-mono">₹{total}</span>
            </div>
          </div>
        </div>

        {/* Right Aspect: Animated Form View */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          
          {/* STEP 1: SHIPPING DETAILS ENTRY */}
          {step === 1 && (
            <form onSubmit={handleShippingSubmit} className="space-y-4 flex flex-col justify-between h-full">
              <div>
                <h4 className="text-base font-serif font-medium text-amber-950 mb-4 flex items-center gap-1.5">
                  <Truck className="w-5 h-5 text-amber-600" />
                  Delivery Coordinates
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div className="md:col-span-2">
                    <label className="text-[10px] font-bold text-amber-900 tracking-wider block mb-1 uppercase">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={shippingForm.fullName}
                      onChange={e => setShippingForm({...shippingForm, fullName: e.target.value})}
                      className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2.5 text-amber-950 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-[10px] font-bold text-amber-900 tracking-wider block mb-1 uppercase">Mailing Address *</label>
                    <input
                      type="text"
                      required
                      placeholder="Street, Room/Floor, Apartment complex"
                      value={shippingForm.addressLines}
                      onChange={e => setShippingForm({...shippingForm, addressLines: e.target.value})}
                      className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2.5 text-amber-950 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-amber-900 tracking-wider block mb-1 uppercase">City *</label>
                    <input
                      type="text"
                      required
                      value={shippingForm.city}
                      onChange={e => setShippingForm({...shippingForm, city: e.target.value})}
                      className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2.5 text-amber-950 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-amber-900 tracking-wider block mb-1 uppercase">State *</label>
                    <input
                      type="text"
                      required
                      value={shippingForm.state}
                      onChange={e => setShippingForm({...shippingForm, state: e.target.value})}
                      className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2.5 text-amber-950 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-amber-900 tracking-wider block mb-1 uppercase">PIN / Postal Code *</label>
                    <input
                      type="text"
                      required
                      value={shippingForm.postalCode}
                      onChange={e => setShippingForm({...shippingForm, postalCode: e.target.value})}
                      className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2.5 text-amber-950 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-amber-900 tracking-wider block mb-1 uppercase">Country *</label>
                    <input
                      type="text"
                      required
                      value={shippingForm.country}
                      onChange={e => setShippingForm({...shippingForm, country: e.target.value})}
                      className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2.5 text-amber-950 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-6 bg-amber-600 hover:bg-amber-700 text-white rounded-lg py-3 text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1"
              >
                Proceed to Secure Payment
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 2: SECURE CREDIT CARD GATEWAY SIMULATION (STRIPE/RAZORPAY STYLE) */}
          {step === 2 && (
            <form onSubmit={handlePaymentSubmit} className="space-y-4 flex flex-col justify-between h-full">
              <div>
                <h4 className="text-base font-serif font-medium text-amber-950 mb-4 flex items-center gap-1.5">
                  <CreditCard className="w-5 h-5 text-amber-600 animate-pulse" />
                  Secure Temple Gateway
                </h4>

                {/* Secure Trust Indicator banner */}
                <div className="bg-amber-100/50 rounded-xl p-3 border border-amber-200 text-[10px] text-amber-900 flex items-start gap-2 mb-4 leading-relaxed">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-950">Sandboxed Environment.</span> No actual funds will be transferred. Use mock details for testing purposes. (Sadhana donation clearance).
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] font-bold text-amber-900 tracking-wider block mb-1 uppercase">Credit Card Number</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-2.5 w-4 h-4 text-amber-500" />
                      <input
                        type="text"
                        required
                        placeholder="4111 2222 3333 4444"
                        maxLength={19}
                        value={cardNo}
                        onChange={e => setCardNo(e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim())}
                        className="w-full text-xs bg-white border border-amber-200 rounded-lg pl-9 pr-4 py-2.5 text-amber-950 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-[10px] font-bold text-amber-900 tracking-wider block mb-1 uppercase">Expiry Month/Year</label>
                      <input
                        type="text"
                        required
                        placeholder="MM/YY"
                        maxLength={5}
                        value={expiry}
                        onChange={e => setExpiry(e.target.value)}
                        className="w-full text-xs bg-white border border-amber-200 rounded-lg p-2.5 text-amber-950 text-center focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-amber-900 tracking-wider block mb-1 uppercase">Secure Code (CVV)</label>
                      <input
                        type="password"
                        required
                        placeholder="•••"
                        maxLength={4}
                        value={cvv}
                        onChange={e => setCvv(e.target.value.replace(/\D/g, ''))}
                        className="w-full text-xs bg-[#FAF7F2] border border-amber-200 rounded-lg p-2.5 text-amber-950 text-center tracking-widest focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 mt-6">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-55 text-white rounded-lg py-3 text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Decrypting Temple Ingress Authorization...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      Authorize Seva Donation ₹{total}
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  disabled={isProcessing}
                  className="w-full text-amber-900 hover:bg-amber-100/30 text-xs py-1.5 rounded-lg transition-colors font-medium text-center"
                >
                  Back to Coordinates
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: TRANSACTION COMPLETE (SUCCESS SCREEN) */}
          {step === 3 && (
            <div className="text-center py-6 px-4 flex flex-col items-center justify-center h-full space-y-4 animate-in fade-in zoom-in duration-300">
              <div className="bg-emerald-100 p-3 rounded-full border border-emerald-200 mb-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 animate-bounce" />
              </div>

              <h4 className="text-xl font-serif font-bold text-amber-900">
                Seva Contribution Accepted!
              </h4>
              
              <p className="text-xs text-amber-800 leading-relaxed max-w-sm">
                Hari Bol! Offer accepted with auspicious blessings. Your order is registered in our portal database and is currently preparing at holy Goshala works.
              </p>

              {/* Order invoice metadata card */}
              <div className="bg-white rounded-xl p-4 border border-amber-100 shadow-sm w-full divide-y divide-amber-50 text-[11px] font-mono text-left">
                <div className="pb-2 flex justify-between items-center text-amber-950">
                  <span>Order Identifier:</span>
                  <span className="font-bold">{placedOrderId}</span>
                </div>
                <div className="py-2 flex justify-between items-center text-amber-850">
                  <span>Devotee Consignee:</span>
                  <span>{shippingForm.fullName}</span>
                </div>
                <div className="py-2 flex justify-between items-center text-amber-800">
                  <span>Tracking Code:</span>
                  <span>{placedTrackingNo}</span>
                </div>
                <div className="pt-2 flex justify-between items-center text-emerald-700 font-bold">
                  <span>Gateway Status:</span>
                  <span>PAID (MOCK STRIPE SUCCESS)</span>
                </div>
              </div>

              <p className="text-[10px] text-amber-600 italic">
                A confirmation note has been dispatched to {currentUser?.email || 'your email'}.
              </p>

              <button
                onClick={() => {
                  onOrderPlaced();
                  onClose();
                }}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-lg py-2.5 text-xs font-bold shadow-md transition-colors"
              >
                Track My Orders in Profile
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
