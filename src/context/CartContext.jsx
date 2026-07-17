import { createContext, useContext, useState, useMemo, useCallback } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState(null);
  const [discountPercent, setDiscountPercent] = useState(0);

  const addToCart = useCallback((product, size) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.size === size
      );
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          size,
          quantity: 1,
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((id, size) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === id && item.size === size))
    );
  }, []);

  const updateQuantity = useCallback((id, size, amount) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id && item.size === size
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    setPromoCode(null);
    setDiscountPercent(0);
  }, []);

  const applyPromo = useCallback((code) => {
    if (code.trim().toUpperCase() === "LUXE20") {
      setPromoCode("LUXE20");
      setDiscountPercent(20);
      return true;
    }
    return false;
  }, []);

  const removePromo = useCallback(() => {
    setPromoCode(null);
    setDiscountPercent(0);
  }, []);

  const { subtotal, discountAmount, total, cartCount } = useMemo(() => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const discountAmount = subtotal * (discountPercent / 100);
    const total = subtotal - discountAmount;
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    return { subtotal, discountAmount, total, cartCount };
  }, [cartItems, discountPercent]);

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      promoCode,
      discountPercent,
      applyPromo,
      removePromo,
      subtotal,
      discountAmount,
      total,
      cartCount,
    }),
    [
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      promoCode,
      discountPercent,
      applyPromo,
      removePromo,
      subtotal,
      discountAmount,
      total,
      cartCount,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}