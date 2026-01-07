import { ShoppingCart, Tag } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-white shadow-lg px-6 py-4 flex items-center justify-between font-poppins">
      {/* Store Name */}
      <h1
        className="text-2xl font-bold text-green-600 hover:text-blue-700 cursor-pointer transition-colors duration-200"
        onClick={() => navigate("/")}
      >
        BACKJOY
      </h1>

      {/* Center Buttons */}
      <div className="flex items-center gap-6">
        {/* Offer Button */}
        <button
          onClick={() => navigate("/offers")}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition cursor-pointer"
        >
          <Tag className="w-4 h-4" />
          Offers
        </button>

        {/* Cart */}
        <div className="relative group">
          <ShoppingCart
            className="w-7 h-7 text-gray-700 hover:text-gray-900 transition-colors duration-200 cursor-pointer"
            onClick={() => navigate("/cart")}
          />

          {cartCount > 0 && (
            <span
              className="absolute -top-2 -right-4 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full cursor-pointer"
              onClick={() => navigate("/cart")}
            >
              {cartCount > 10 ? "10+" : cartCount}
            </span>
          )}

          <div className="absolute right-0 mt-2 hidden group-hover:block bg-black text-white text-xs px-3 py-1 rounded shadow-lg whitespace-nowrap">
            {cartCount} item{cartCount !== 1 ? "s" : ""} in cart
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
