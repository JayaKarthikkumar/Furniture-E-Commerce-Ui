import React, { useState } from "react";
import { X } from "lucide-react";
import Add from "../../assets/Add.png";
import Add1 from "../../assets/Add1.png";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface AddToCartProps {
  open: boolean;
  onClose: () => void;
}

const AddToCart: React.FC<AddToCartProps> = ({ open, onClose }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Asgaard sofa",
      price: 250000.0,
      quantity: 1,
      image: Add,
    },
    {
      id: "2",
      name: "Casaliving Wood",
      price: 270000.0,
      quantity: 1,
      image: Add1,
    },
  ]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const formatPrice = (price: number): string => {
    return `Rs. ${price.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const handleRemove = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-[999]"
        onClick={onClose}
      />

      <div
        className={`fixed top-0 right-0 h-screen w-[400px] bg-white shadow-2xl z-[1000] transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6 font-sans">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-black">Shopping Cart</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <X size={24} className="text-gray-600" />
            </button>
          </div>

          <div className="h-px bg-gray-200 mb-6" />

          <div className="flex-1 overflow-y-auto">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div key={item.id}>
                  <div className="flex items-start gap-3 pb-4">
                    <div className="w-20 h-20 rounded-lg p-2 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>

                    <div className="flex flex-col flex-1 gap-2">
                      <h3 className="text-base text-black">{item.name}</h3>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-sm text-black">
                          <span>{item.quantity}</span>
                          <span>×</span>
                          <span className="text-yellow-700 font-medium">
                            {formatPrice(item.price)}
                          </span>
                        </div>

                        <button
                          onClick={() => handleRemove(item.id)}
                          className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                        >
                          <X size={16} className="text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {index < cartItems.length - 1 && (
                    <div className="h-px bg-gray-200 my-4" />
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-10">
                Your cart is empty.
              </p>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="pt-6 border-t border-gray-200 mt-auto">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold text-black">Subtotal</span>
                <span className="text-lg font-bold text-yellow-700">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 py-3 border border-black rounded-full text-sm text-black hover:bg-gray-100">
                  Cart
                </button>
                <button className="flex-1 py-3 border border-black rounded-full text-sm text-black hover:bg-gray-100">
                  Checkout
                </button>
                <button className="flex-1 py-3 border border-black rounded-full text-sm text-black hover:bg-gray-100">
                  Comparison
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddToCart;
