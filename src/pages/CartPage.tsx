import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "../redux/cartSlice";
import { calculateOffersPerProduct } from "../redux/offerUtils";
import CartEmpty from "../components/CartEmpty";
import { Tag } from "lucide-react";

const CartPage: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { items, subtotal, totalSaving, totalFinal } =
    calculateOffersPerProduct(cartItems);

  if (cartItems.length === 0) {
    return (
      <h2 className="text-center mt-10 text-xl font-semibold">
        <CartEmpty />
      </h2>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4 sm:p-6">
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {/* Left: Back + Title */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="px-2 py-1 rounded-md border text-sm font-medium hover:bg-gray-100 transition cursor-pointer flex-shrink-0"
          >
            ← Back
          </button>

          {/* Page Title */}
          <h2 className="text-xl sm:text-2xl font-bold truncate">Your Cart</h2>
        </div>

        {/* Right: Offers Button */}
        <button
          onClick={() => navigate("/offers")}
          className="flex items-center cursor-pointer gap-1 px-3 py-1 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition flex-shrink-0"
        >
          <Tag className="w-4 h-4" />
          <span className="truncate">View Offers</span>
        </button>
      </div>

      {/* Cart Items */}
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row md:items-center md:justify-between p-4 border rounded-xl gap-4"
          >
            {/* Product Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
              <img
                src={item.image}
                alt={item.name}
                className="w-full sm:w-24 h-24 object-cover rounded-lg"
              />

              <div className="flex flex-col gap-1">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-green-600 font-bold">
                  £{item.price.toFixed(2)}
                </p>

                {item.saving > 0 && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded w-fit">
                    Offer Applied
                  </span>
                )}
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => dispatch(decreaseQuantity(item.id))}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
              >
                −
              </button>
              <span className="w-6 text-center">{item.quantity}</span>
              <button
                onClick={() => dispatch(increaseQuantity(item.id))}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
              >
                +
              </button>
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="ml-3 text-red-600 font-semibold hover:text-red-700 cursor-pointer"
              >
                Remove
              </button>
            </div>

            {/* Price Breakdown */}
            <div className="flex flex-col text-right gap-1 min-w-40">
              <p className="text-gray-600">
                Item price £{item.price.toFixed(2)} * {item.quantity} = £
                {item.subtotal.toFixed(2)}
              </p>

              {item.saving > 0 && (
                <p className="text-green-600">
                  Savings: −£{item.saving.toFixed(2)}
                </p>
              )}

              <p className="font-bold text-lg">
                Item cost: £{item.finalTotal.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-8 border-t pt-6 flex flex-col sm:flex-row sm:justify-between gap-4">
        {/* Price Details */}
        <div className="order-1 sm:order-2 flex flex-col gap-1 text-right">
          <p className="text-xl font-semibold">
            Subtotal: £{subtotal.toFixed(2)}
          </p>
          <p className="text-green-600 font-semibold">
            Total Savings: −£{totalSaving.toFixed(2)}
          </p>
          <p className="text-2xl font-bold">
            Grand Total: £{totalFinal.toFixed(2)}
          </p>
        </div>

        {/* Clear Cart Button */}
        <button
          onClick={() => dispatch(clearCart())}
          className="order-2 sm:order-1 w-full sm:w-auto px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 cursor-pointer sm:self-center"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default CartPage;
