import { useState, useEffect, createContext, useContext } from "react";
import { Share2, RotateCcw, Heart, X, ShoppingCart } from "lucide-react";
import { generateMockProducts } from "../../utils/generateMockProduct";
import { CartContext } from "../../context/CartContext";

// Cart Context
// interface CartItem {
//   id: number;
//   name: string;
//   description: string;
//   price: string;
//   priceValue: number;
//   quantity: number;
//   image: string;
// }

// interface CartContextType {
//   cartItems: CartItem[];
//   addToCart: (product: any) => void;
//   removeFromCart: (id: number) => void;
//   updateQuantity: (id: number, quantity: number) => void;
//   cartCount: number;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) throw new Error("useCart must be used within CartProvider");
//   return context;
// };

// const CartProvider = ({ children }: { children: React.ReactNode }) => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);

//   const addToCart = (product: any) => {
//     setCartItems((prev) => {
//       const existingItem = prev.find((item) => item.id === product.id);

//       if (existingItem) {
//         return prev.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }

//       const priceValue = parseFloat(product.price.replace(/[^\d]/g, ""));

//       return [
//         ...prev,
//         {
//           id: product.id,
//           name: product.name,
//           description: product.description,
//           price: product.price,
//           priceValue,
//           quantity: 1,
//           image: product.image,
//         },
//       ];
//     });
//   };

//   const removeFromCart = (id: number) => {
//     setCartItems((prev) => prev.filter((item) => item.id !== id));
//   };

//   const updateQuantity = (id: number, quantity: number) => {
//     if (quantity <= 0) {
//       removeFromCart(id);
//       return;
//     }
//     setCartItems((prev) =>
//       prev.map((item) => (item.id === id ? { ...item, quantity } : item))
//     );
//   };

//   const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         cartCount,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// Generate Mock Products

// Products Component
const Products = () => {
  const { addToCart } = useContext(CartContext);
  // const { addToCart } = useCart();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [likedProducts, setLikedProducts] = useState<Set<number>>(new Set());

  const PRODUCTS_PER_PAGE = 8;

  useEffect(() => {
    const initialProducts = generateMockProducts(1, PRODUCTS_PER_PAGE);
    setProducts(initialProducts);
    setInitialLoad(false);
  }, []);

  const loadMoreProducts = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const startId = currentPage * PRODUCTS_PER_PAGE + 1;
    const newProducts = generateMockProducts(startId, PRODUCTS_PER_PAGE);

    setProducts((prev) => [...prev, ...newProducts]);
    setCurrentPage((prev) => prev + 1);
    setLoading(false);

    if (currentPage >= 3) setHasMore(false);
  };

  const handleAddToCart = (product: any) => {
    addToCart(product);
    const toast = document.createElement("div");
    toast.textContent = "Product added to cart!";
    toast.className =
      "fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md text-sm font-medium z-50 animate-fadeIn";
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 1000);
  };

  const handleLike = (productId: number) => {
    setLikedProducts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) newSet.delete(productId);
      else newSet.add(productId);
      return newSet;
    });
  };

  const handleShare = (product: any) => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this ${product.description}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (initialLoad) {
    return (
      <div className="max-w-6xl mx-auto flex items-center justify-center min-h-[300px] text-gray-500">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 border-2 border-gray-300 border-t-[#B88E2F] rounded-full animate-spin"></div>
          Loading products...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 bg-white font-sans">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-9">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative bg-gray-100 max-w-[280px] mx-auto group"
          >
            <div className="relative w-full h-[200px] overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {(product.discount || product.isNew) && (
                <div
                  className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-medium text-white ${
                    product.isNew ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {product.isNew ? "New" : product.discount}
                </div>
              )}

              <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  className="bg-white text-[#B88E2F] px-6 py-2 text-sm font-semibold hover:bg-gray-50"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to cart
                </button>
                <div className="flex gap-4 text-white text-sm">
                  <button
                    className="flex items-center gap-1 hover:text-gray-300"
                    onClick={() => handleShare(product)}
                  >
                    <Share2 size={14} />
                    Share
                  </button>
                  <button className="flex items-center gap-1 hover:text-gray-300">
                    <RotateCcw size={14} />
                    Compare
                  </button>
                  <button
                    className={`flex items-center gap-1 ${
                      likedProducts.has(product.id)
                        ? "text-red-500"
                        : "text-white hover:text-gray-300"
                    }`}
                    onClick={() => handleLike(product.id)}
                  >
                    <Heart
                      size={14}
                      fill={
                        likedProducts.has(product.id) ? "currentColor" : "none"
                      }
                    />
                    Like
                  </button>
                </div>
              </div>
            </div>

            <div className="p-3 bg-gray-100">
              <h3 className="text-base font-semibold text-gray-700 mb-1">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                {product.description}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-base font-semibold text-gray-700">
                  {product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {product.originalPrice}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center items-center py-9 text-gray-500 gap-2">
          <div className="w-5 h-5 border-2 border-gray-300 border-t-[#B88E2F] rounded-full animate-spin"></div>
          <div>Loading more products...</div>
        </div>
      )}

      {hasMore && !loading && (
        <button
          onClick={loadMoreProducts}
          className="block mx-auto px-9 py-2 border-2 border-[#B88E2F] text-[#B88E2F] font-medium text-sm hover:bg-[#B88E2F] hover:text-white transition"
        >
          Show More
        </button>
      )}

      {!hasMore && !loading && products.length > PRODUCTS_PER_PAGE && (
        <div className="flex justify-center items-center py-9 text-gray-400">
          That's all our products for now!
        </div>
      )}
    </div>
  );
};

// // Cart Sidebar Component
// const CartSidebar = ({
//   open,
//   onClose,
// }: {
//   open: boolean;
//   onClose: () => void;
// }) => {
//   // const { cartItems, removeFromCart, updateQuantity } = useCart();

//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + item.priceValue * item.quantity,
//     0
//   );

//   const formatPrice = (price: number): string => {
//     return `Rp ${price.toLocaleString("id-ID")}`;
//   };

//   if (!open) return null;

//   return (
//     <>
//       <div className="fixed inset-0 bg-black/50 z-[999]" onClick={onClose} />

//       <div
//         className={`fixed top-0 right-0 h-screen w-[400px] bg-white shadow-2xl z-[1000] transform transition-transform duration-300 ${
//           open ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         <div className="flex flex-col h-full p-6 font-sans">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold text-black">Shopping Cart</h2>
//             <button
//               onClick={onClose}
//               className="p-2 rounded-full hover:bg-gray-100"
//             >
//               <X size={24} className="text-gray-600" />
//             </button>
//           </div>

//           <div className="h-px bg-gray-200 mb-6" />

//           <div className="flex-1 overflow-y-auto">
//             {cartItems.length > 0 ? (
//               cartItems.map((item, index) => (
//                 <div key={item.id}>
//                   <div className="flex items-start gap-3 pb-4">
//                     <div className="w-20 h-20 rounded-lg p-2 flex-shrink-0 bg-gray-50">
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className="w-full h-full object-cover rounded"
//                       />
//                     </div>

//                     <div className="flex flex-col flex-1 gap-2">
//                       <h3 className="text-base text-black font-medium">
//                         {item.name}
//                       </h3>
//                       <p className="text-xs text-gray-500">
//                         {item.description}
//                       </p>

//                       <div className="flex justify-between items-center">
//                         <div className="flex items-center gap-3">
//                           <div className="flex items-center border rounded">
//                             <button
//                               onClick={() =>
//                                 updateQuantity(item.id, item.quantity - 1)
//                               }
//                               className="px-2 py-1 hover:bg-gray-100 text-sm"
//                             >
//                               -
//                             </button>
//                             <span className="px-3 py-1 text-sm border-x">
//                               {item.quantity}
//                             </span>
//                             <button
//                               onClick={() =>
//                                 updateQuantity(item.id, item.quantity + 1)
//                               }
//                               className="px-2 py-1 hover:bg-gray-100 text-sm"
//                             >
//                               +
//                             </button>
//                           </div>
//                           <span className="text-[#B88E2F] font-medium text-sm">
//                             {formatPrice(item.priceValue * item.quantity)}
//                           </span>
//                         </div>

//                         <button
//                           onClick={() => removeFromCart(item.id)}
//                           className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
//                         >
//                           <X size={16} className="text-gray-600" />
//                         </button>
//                       </div>
//                     </div>
//                   </div>

//                   {index < cartItems.length - 1 && (
//                     <div className="h-px bg-gray-200 my-4" />
//                   )}
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500 text-center py-10">
//                 Your cart is empty.
//               </p>
//             )}
//           </div>

//           {cartItems.length > 0 && (
//             <div className="pt-6 border-t border-gray-200 mt-auto">
//               <div className="flex justify-between items-center mb-6">
//                 <span className="text-lg font-bold text-black">Subtotal</span>
//                 <span className="text-lg font-bold text-[#B88E2F]">
//                   {formatPrice(subtotal)}
//                 </span>
//               </div>

//               <div className="flex gap-3">
//                 <button className="flex-1 py-3 border border-black rounded-full text-sm text-black hover:bg-gray-100">
//                   Cart
//                 </button>
//                 <button className="flex-1 py-3 bg-[#B88E2F] text-white rounded-full text-sm hover:bg-[#9a7625]">
//                   Checkout
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// Main App Component
export default function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    // <CartProvider>
    <div className="min-h-screen bg-gray-50">
      <Header onCartClick={() => setCartOpen(true)} />
      <Products />
      {/* <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} /> */}
    </div>
    // </CartProvider>
  );
}

// Header Component
const Header = ({ onCartClick }: { onCartClick: () => void }) => {
  // const { cartCount } = useCart();

  return (
    <header className="">
      <div className="">
        <h1 className="text-2xl text-center py-4 font-bold text-[#Black]">Our Products</h1>
        {/* <button
          onClick={onCartClick}
          className="relative p-2 hover:bg-gray-100 rounded-full transition"
        >
          <ShoppingCart size={24} className="text-gray-700" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#B88E2F] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button> */}
      </div>
    </header>
  );
};
