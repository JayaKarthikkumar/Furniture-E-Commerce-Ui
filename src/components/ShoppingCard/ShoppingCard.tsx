import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import sm from '../../assets/RP4.png'

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const ShoppingCart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Asgaard sofa',
      price: 250000.0,
      quantity: 1,
      image: sm ,
    },
  ]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      setCartItems(items =>
        items.map(item => (item.id === id ? { ...item, quantity: newQuantity } : item))
      );
    }
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const calculateSubtotal = (item: CartItem) => item.price * item.quantity;

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + calculateSubtotal(item), 0);

  const formatCurrency = (amount: number) =>
    `Rs. ${amount.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  return (
    <div className="min-h-[80vh] p-6 font-sans">
      <div className="max-w-[1200px] mx-auto flex gap-8 items-start flex-wrap">
        <div className="flex-2 min-w-[600px] bg-orange-50 rounded-lg overflow-hidden shadow-md">
          <div className="bg-orange-100 p-4 border-b border-yellow-300/20">
            <div className="grid grid-cols-[5fr_2fr_2fr_2fr_1fr] gap-4 text-sm font-semibold text-gray-800">
              <div>Product</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Subtotal</div>
              <div></div>
            </div>
          </div>

          <div className="p-6">
            {cartItems.map(item => (
              <div
                key={item.id}
                className="grid grid-cols-[5fr_2fr_2fr_2fr_1fr] gap-4 items-center py-4 border-b border-yellow-300/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-md overflow-hidden bg-yellow-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={e => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjZjNmNGY2Ii8+CjxwYXRoIGQ9Ik0yMCAyMEg0NFY0NEgyMFYyMFoiIGZpbGw9IiNkMWQ1ZGIiLz4KPHBhdGggZD0iTTI4IDMyTDMyIDM2TDM2IDI4IiBzdHJva2U9IiM5Y2EzYWYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPg==';
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-700">{item.name}</span>
                </div>

                <div>
                  <span className="text-sm text-gray-700">{formatCurrency(item.price)}</span>
                </div>

                <div>
                  <input
                    type="number"
                    value={item.quantity}
                    min={1}
                    onChange={e => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                    className="w-[60px] px-2 py-1 rounded border border-gray-300 text-center"
                  />
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-800">
                    {formatCurrency(calculateSubtotal(item))}
                  </span>
                </div>

                <div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-amber-500 hover:text-amber-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 min-w-[300px] max-w-[400px] self-start">
          <div className="bg-orange-50 rounded-lg border border-orange-100 shadow-lg overflow-hidden">
            <div className="bg-orange-100 p-5 text-center">
              <h2 className="text-2xl font-bold text-gray-800 m-0">Cart Totals</h2>
            </div>

            <div className="p-6">
              <div className="flex justify-between mb-4">
                <span className="font-semibold text-gray-800 text-lg">Subtotal</span>
                <span className="text-lg text-gray-700">{formatCurrency(calculateTotal())}</span>
              </div>

              <hr className="border-t border-yellow-300/20 my-4" />

              <div className="flex justify-between mb-6">
                <span className="font-semibold text-gray-800 text-lg">Total</span>
                <span className="font-bold text-amber-500 text-xl">
                  {formatCurrency(calculateTotal())}
                </span>
              </div>

              <button
                className="w-full py-4 px-8 border-2 border-gray-800 rounded-xl font-medium text-lg text-gray-800 bg-transparent hover:bg-gray-800 hover:text-white transition-all"
              >
                Check Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
