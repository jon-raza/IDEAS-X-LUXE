import { useState } from "react";
import { useCart } from "../context/CartContext";
import OrderModal from "../components/OrderModal";

export default function Checkout() {
  const {
    cartItems,
    subtotal,
    discountAmount,
    total,
    promoCode,
    discountPercent,
    applyPromo,
    removePromo,
    clearCart,
  } = useCart();

  const [shipping, setShipping] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    country: "",
  });

  const [promoInput, setPromoInput] = useState("");
  const [promoMsg, setPromoMsg] = useState("");
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [formError, setFormError] = useState("");

  const handleShippingChange = (e) => {
    setShipping((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleApplyPromo = () => {
    if (!promoInput.trim()) return;
    const ok = applyPromo(promoInput);
    if (ok) {
      setPromoMsg("Promo applied!");
      setPromoInput("");
    } else {
      setPromoMsg("Invalid code");
    }
    setTimeout(() => setPromoMsg(""), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, address, city, zip } = shipping;
    if (!name || !email || !address || !city || !zip) {
      setFormError("Please fill in all required fields.");
      return;
    }
    setFormError("");

    setOrderData({
      items: cartItems,
      subtotal,
      discount: discountAmount,
      total,
      promo: promoCode,
      discountPercent,
      shipping,
    });
    setShowOrderModal(true);
    clearCart();
  };

  if (cartItems.length === 0 && !showOrderModal) {
    return (
      <div className="max-w-3xl mx-auto px-6 pt-20 text-center">
        <h2 className="text-3xl font-bold text-white uppercase">Checkout</h2>
        <p className="text-[#E2E8F0]/70 mt-4">
          Your cart is empty. Add items before checking out.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-6xl mx-auto px-6 pt-10 pb-20 grid lg:grid-cols-5 gap-10">
        {/* Shipping form */}
        <div className="lg:col-span-3">
          <h1 className="text-3xl font-bold uppercase tracking-[0.15em] mb-8">
            Billing <span className="text-[#00F0FF] neon-text">Details</span>
          </h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#E2E8F0] mb-1">
                  Full Name *
                </label>
                <input
                  name="name"
                  value={shipping.name}
                  onChange={handleShippingChange}
                  className="w-full bg-[#0a0a0a] border border-white/20 text-white p-3 rounded focus:outline-none focus:border-[#00F0FF]"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#E2E8F0] mb-1">
                  Email *
                </label>
                <input
                  name="email"
                  type="email"
                  value={shipping.email}
                  onChange={handleShippingChange}
                  className="w-full bg-[#0a0a0a] border border-white/20 text-white p-3 rounded focus:outline-none focus:border-[#00F0FF]"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#E2E8F0] mb-1">
                Address *
              </label>
              <input
                name="address"
                value={shipping.address}
                onChange={handleShippingChange}
                className="w-full bg-[#0a0a0a] border border-white/20 text-white p-3 rounded focus:outline-none focus:border-[#00F0FF]"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#E2E8F0] mb-1">
                  City *
                </label>
                <input
                  name="city"
                  value={shipping.city}
                  onChange={handleShippingChange}
                  className="w-full bg-[#0a0a0a] border border-white/20 text-white p-3 rounded focus:outline-none focus:border-[#00F0FF]"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#E2E8F0] mb-1">
                  ZIP *
                </label>
                <input
                  name="zip"
                  value={shipping.zip}
                  onChange={handleShippingChange}
                  className="w-full bg-[#0a0a0a] border border-white/20 text-white p-3 rounded focus:outline-none focus:border-[#00F0FF]"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#E2E8F0] mb-1">
                  Country
                </label>
                <input
                  name="country"
                  value={shipping.country}
                  onChange={handleShippingChange}
                  className="w-full bg-[#0a0a0a] border border-white/20 text-white p-3 rounded focus:outline-none focus:border-[#00F0FF]"
                />
              </div>
            </div>
            {formError && (
              <p className="text-red-400 text-sm">{formError}</p>
            )}
            <button
              type="submit"
              className="w-full bg-[#00F0FF] text-[#050505] font-bold uppercase tracking-[0.2em] py-3 rounded hover:bg-white transition-all duration-300"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* Order summary & promo */}
        <div className="lg:col-span-2 bg-[#0a0a0a] border border-white/10 rounded-lg p-6 h-fit">
          <h2 className="text-xl font-bold uppercase tracking-wider mb-4">
            Order Summary
          </h2>
          <div className="space-y-3 text-sm">
            {cartItems.map((item, idx) => (
              <div key={idx} className="flex justify-between text-[#E2E8F0]/80">
                <span>
                  {item.name} ({item.size}) x{item.quantity}
                </span>
                <span>${(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-white/10 pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toLocaleString()}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-[#00F0FF]">
                <span>Promo ({promoCode} - {discountPercent}%)</span>
                <span>-${discountAmount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg mt-2 text-white">
              <span>Total</span>
              <span>${total.toLocaleString()}</span>
            </div>
          </div>

          {/* Promo input */}
          <div className="mt-6">
            <label className="block text-xs uppercase tracking-widest text-[#E2E8F0] mb-2">
              Voucher Code
            </label>
            {promoCode ? (
              <div className="flex items-center justify-between bg-[#00F0FF]/10 border border-[#00F0FF]/40 rounded px-3 py-2">
                <span className="text-[#00F0FF] font-mono text-sm">
                  {promoCode} active
                </span>
                <button
                  onClick={removePromo}
                  className="text-xs text-[#E2E8F0] hover:text-red-400 underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="LUXE20"
                  className="flex-1 bg-[#050505] border border-white/20 text-white px-3 py-2 rounded uppercase text-sm focus:outline-none focus:border-[#00F0FF]"
                />
                <button
                  onClick={handleApplyPromo}
                  className="bg-white/5 border border-white/30 text-[#E2E8F0] px-4 py-2 rounded text-sm uppercase tracking-wider hover:bg-[#00F0FF] hover:text-black transition-all"
                >
                  Apply
                </button>
              </div>
            )}
            {promoMsg && (
              <p className={`text-xs mt-1 ${promoMsg.includes("Invalid") ? "text-red-400" : "text-[#00F0FF]"}`}>
                {promoMsg}
              </p>
            )}
          </div>
        </div>
      </div>

      <OrderModal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        orderData={orderData}
      />
    </>
  );
}