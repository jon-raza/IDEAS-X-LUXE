import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    total,
    promoCode,
    discountPercent,
    applyPromo,
    removePromo,
    cartCount,
  } = useCart();

  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");

  const handleApplyPromo = () => {
    if (!promoInput.trim()) return;
    const success = applyPromo(promoInput);
    if (!success) {
      setPromoError("Invalid promo code");
      setTimeout(() => setPromoError(""), 3000);
    } else {
      setPromoInput("");
      setPromoError("");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 pt-20 text-center">
        <h2 className="text-3xl font-bold text-white uppercase tracking-widest">
          Your Bag
        </h2>
        <p className="text-[#E2E8F0]/70 mt-4">
          Nothing here yet. Start curating your aesthetic.
        </p>
        <Link
          to="/"
          className="inline-block mt-8 border border-[#00F0FF] text-[#00F0FF] px-8 py-3 uppercase tracking-[0.2em] text-sm hover:bg-[#00F0FF] hover:text-[#050505] transition-all duration-300"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 pt-10 pb-20">
      <h1 className="text-4xl font-extrabold uppercase tracking-[0.15em] mb-10 text-center">
        Your <span className="text-[#00F0FF] neon-text">Cart</span>
      </h1>

      <div className="space-y-6">
        {cartItems.map((item, idx) => (
          <div
            key={item.id + item.size}
            className="flex flex-wrap items-center justify-between bg-[#0a0a0a] border border-white/10 p-4 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-[#111] flex items-center justify-center text-white/20 font-black text-xl rounded">
                IXL
              </div>
              <div>
                <h3 className="text-white font-semibold">{item.name}</h3>
                <p className="text-[#E2E8F0]/60 text-xs">Size: {item.size}</p>
                <p className="text-[#E2E8F0]/70 text-sm">
                  ${item.price} each
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <div className="flex items-center border border-white/20 rounded">
                <button
                  onClick={() => updateQuantity(item.id, item.size, -1)}
                  className="px-3 py-1 hover:bg-white/10 text-white text-lg"
                >
                  −
                </button>
                <span className="px-4 text-white font-medium">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.size, 1)}
                  className="px-3 py-1 hover:bg-white/10 text-white text-lg"
                >
                  +
                </button>
              </div>
              <p className="text-white font-bold w-20 text-right">
                ${(item.price * item.quantity).toLocaleString()}
              </p>
              <button
                onClick={() => removeFromCart(item.id, item.size)}
                className="text-[#E2E8F0]/50 hover:text-red-400 transition-colors"
                title="Remove item"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Promo & totals */}
      <div className="mt-10 border-t border-white/10 pt-6 grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-sm uppercase tracking-widest text-[#E2E8F0] mb-3">
            Promo Code
          </h3>
          {promoCode ? (
            <div className="flex items-center space-x-2">
              <span className="bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/50 px-3 py-1 rounded text-sm font-mono">
                {promoCode} ({discountPercent}% off)
              </span>
              <button
                onClick={removePromo}
                className="text-xs text-[#E2E8F0]/60 hover:text-red-400 underline"
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
                placeholder="Enter code"
                className="bg-[#050505] border border-white/20 text-white px-4 py-2 rounded w-40 uppercase text-sm focus:outline-none focus:border-[#00F0FF]"
              />
              <button
                onClick={handleApplyPromo}
                className="bg-white/5 border border-white/30 text-[#E2E8F0] px-5 py-2 rounded text-sm uppercase tracking-wider hover:bg-[#00F0FF] hover:text-black transition-all"
              >
                Apply
              </button>
            </div>
          )}
          {promoError && (
            <p className="text-red-400 text-xs mt-2">{promoError}</p>
          )}
        </div>

        <div className="text-right">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-[#E2E8F0]/80">
              <span>Subtotal ({cartCount} items)</span>
              <span>${subtotal.toLocaleString()}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-[#00F0FF]">
                <span>Promo Discount</span>
                <span>-${discountAmount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold text-white border-t border-white/10 pt-2">
              <span>Total</span>
              <span>${total.toLocaleString()}</span>
            </div>
          </div>
          <Link
            to="/checkout"
            className="mt-6 inline-block bg-[#00F0FF] text-[#050505] font-bold uppercase tracking-[0.2em] text-sm px-8 py-3 rounded hover:bg-white transition-all duration-300"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}