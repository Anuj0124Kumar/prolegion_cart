import { useNavigate } from "react-router-dom";

const CartEmpty = () => {
    const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      {/* Empty Cart Icon */}
      <div className="text-6xl mb-4">🛒</div>

      {/* Title */}
      <h2 className="text-2xl font-bold mb-2">
        Your cart is empty
      </h2>
      <p className="text-gray-500 mb-6">
        Looks like you haven’t added anything to your cart yet.
      </p>

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="bg-black text-white cursor-pointer px-6 py-3 rounded-lg
                   hover:bg-gray-800 transition duration-200"
      >
        ← Back to Shop
      </button>
    </div>
  );
}

export default CartEmpty