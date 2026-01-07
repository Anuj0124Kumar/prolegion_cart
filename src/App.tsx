import "./App.css";
import { Routes, Route } from "react-router-dom";
import AllProduct from "./pages/AllProduct";
import CartPage from "./pages/CartPage";
import { Toaster } from "react-hot-toast";
import OfferPage from "./pages/OfferPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AllProduct />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/offers" element={<OfferPage />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
      <Toaster  />
    </>
  );
}

export default App;
