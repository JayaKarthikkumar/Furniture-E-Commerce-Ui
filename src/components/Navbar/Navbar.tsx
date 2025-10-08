import React, { useContext, useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import logoImg from "../../assets/logo.png";
import alertIcon from "../../assets/icon_aler.png";
import heartIcon from "../../assets/icons_heart.png";
import searchIcon from "../../assets/icons_search.png";
import shoppingIcon from "../../assets/icons_shopping.png";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { ShoppingCart, X } from "lucide-react";

const CartSidebar = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.priceValue * item.quantity,
    0
  );

  const formatPrice = (price: number): string => {
    return `Rp ${price.toLocaleString("id-ID")}`;
  };

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-[999]" onClick={onClose} />

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
                    <div className="w-20 h-20 rounded-lg p-2 flex-shrink-0 bg-gray-50">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>

                    <div className="flex flex-col flex-1 gap-2">
                      <h3 className="text-base text-black font-medium">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {item.description}
                      </p>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border rounded">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="px-2 py-1 hover:bg-gray-100 text-sm"
                            >
                              -
                            </button>
                            <span className="px-3 py-1 text-sm border-x">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="px-2 py-1 hover:bg-gray-100 text-sm"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-[#B88E2F] font-medium text-sm">
                            {formatPrice(item.priceValue * item.quantity)}
                          </span>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
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
                <span className="text-lg font-bold text-[#B88E2F]">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 py-3 border border-black rounded-full text-sm text-black hover:bg-gray-100">
                  Cart
                </button>
                <button className="flex-1 py-3 bg-[#B88E2F] text-white rounded-full text-sm hover:bg-[#9a7625]">
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { cartCount } = useContext(CartContext);
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: "center" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "1600px", // ✅ limits navbar width
            margin: "0 auto",
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <img
              src={logoImg}
              alt="Furniro Logo"
              style={{ height: "25px", marginRight: "8px" }}
            />
            <Typography variant="h5" fontWeight={700} sx={{ color: "#333" }}>
              Furniro
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: "32px" }}>
            {["Home", "Shop", "About", "Contact"].map((item) => (
              <button
                key={item}
                style={{
                  background: "none",
                  border: "none",
                  color: "inherit",
                  fontWeight: 600,
                  fontSize: "16px",
                  cursor: "pointer",
                  padding: "8px 16px",
                  outline: "none",
                  boxShadow: "none",
                  fontFamily: "inherit",
                }}
                onClick={() => navigate(`/${item.toLowerCase()}`)}
              >
                {item}
              </button>
            ))}
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <IconButton>
              <img
                src={alertIcon}
                alt="Alert"
                style={{ width: 22, height: 22 }}
              />
            </IconButton>

            <IconButton>
              <img
                src={searchIcon}
                alt="Search"
                style={{ width: 22, height: 22 }}
              />
            </IconButton>

            <IconButton>
              <img
                src={heartIcon}
                alt="Heart"
                style={{ width: 22, height: 22 }}
              />
            </IconButton>

            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 hover:bg-gray-100 rounded-full transition"
            >
              <ShoppingCart size={24} className="text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#B88E2F] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </Box>
        </Box>
      </Toolbar>
      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
    </AppBar>
  );
};

export default Navbar;
