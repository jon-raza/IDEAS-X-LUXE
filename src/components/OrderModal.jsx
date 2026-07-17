import { useNavigate } from "react-router-dom";

function generateOrderId() {
  return "IXL-" + Math.random().toString(36).substring(2, 10).toUpperCase();
}

export default function OrderModal({ isOpen, onClose, orderData }) {
  const navigate = useNavigate();
  if (!isOpen) return null;

  const orderId = generateOrderId();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]/90 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#0a0a0a] border border-[#00F0FF]/30 rounded-lg p-8 max-w-lg w-full mx-4 shadow-neon-glow neon-border">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-widest text-[#00F0FF] neon-text uppercase">
            Order Confirmed
          </h1>
          <p className="text-sm text-[#E2E8F0]/70 mt-2">
            PROCESSING SLOTS — #{orderId}
          </p>
        </div>

        <div className="mt-6 border-t border-white/10 pt-4 space-y-2 text-[#E2E8F0]">
          <h3 className="font-semibold uppercase tracking-wide text-sm text-white">
            Digital Receipt
          </h3>
          {orderData.items.map((item, idx) => (
            <div key={idx} className="flex justify-between text-sm">
              <span>
                {item.name} ({item.size}) x{item.quantity}
              </span>
              <span className="font-medium">
                ${(item.price * item.quantity).toLocaleString()}
              </span>
            </div>
          ))}
          <div className="border-t border-white/10 pt-2 mt-2 space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${orderData.subtotal.toLocaleString()}</span>
            </div>
            {orderData.discount > 0 && (
              <div className="flex justify-between text-[#00F0FF]">
                <span>Promo ({orderData.promo} - {orderData.discountPercent}%)</span>
                <span>-${orderData.discount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg mt-1 text-white">
              <span>Total</span>
              <span>${orderData.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {orderData.shipping && (
          <div className="mt-4 text-sm text-[#E2E8F0]/80 border-t border-white/10 pt-3">
            <p className="font-semibold text-white">Shipping to:</p>
            <p>{orderData.shipping.name}</p>
            <p>{orderData.shipping.address}</p>
            <p>{orderData.shipping.city}, {orderData.shipping.zip}</p>
          </div>
        )}

        <button
          onClick={() => {
            onClose();
            navigate("/");
          }}
          className="mt-6 w-full bg-[#00F0FF] text-[#050505] font-bold py-3 rounded hover:bg-white transition-all duration-300 uppercase tracking-wider"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}