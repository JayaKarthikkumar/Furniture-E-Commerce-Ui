import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import theme from "./theme/theme";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import About from "./pages/About/About";
import ContactPage from "./pages/Contact/Contact";
import Blog from "./pages/Blog/Blog";
import Checkout from "./pages/Checkout/Checkout";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Cart from "./pages/Cart/Cart";
import SingleProduct from "./pages/Singleproduct/Singleproduct";
import ProductComparision from "./pages/ProductComparision/ProductComparision";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import { CartProvider } from "./context/CartContext";
  import { PowerSyncProvider } from '../../E-Commerce/src/components/PowerSyncProvider';

const App: React.FC = () => {
  return (
    // <PowerSyncProvider>
         <CartProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/singleproduct" element={<SingleProduct />} />
            <Route
              path="/ProductComparision"
              element={<ProductComparision />}
            />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </CartProvider>
      //  </PowerSyncProvider>
    
  );
};

export default App;
