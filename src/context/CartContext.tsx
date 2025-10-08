import React, { createContext, useState, ReactNode } from "react";

export interface CartItem {
  id: number;
  name: string;
  description: string;
  price: string; // Example: "Rp 1,200,000"
  priceValue: number; // Numeric value of price
  quantity: number;
  image: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  cartCount: number;
  cartTotal: number;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // ✅ Add to cart
  const addToCart = (product: any) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);

      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      const priceValue = parseFloat(
        product.price.replace(/[^\d]/g, "")
      );

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          priceValue,
          quantity: 1,
          image: product.image,
        },
      ];
    });
  };

  // ✅ Remove item
  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // ✅ Update quantity
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // ✅ Total items count
  const cartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // ✅ Total price
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.priceValue * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
