import Loader from "./Loader";
import type { Product } from "./types/product";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import type { AppDispatch } from "../redux/store";
import { toast } from "react-hot-toast";

interface CardProps {
  product: Product;
}

const Card = ({ product }: CardProps) => {
  const [isLoader, setIsLoader] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = () => {
    setIsLoader(true);
    setTimeout(() => {
      dispatch(addToCart(product));
      setIsLoader(false);
      toast.success("Item added in the cart");
    }, 300); // simulate loader
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105 duration-300">
      {/* Product Image */}
      <div className="overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col gap-2">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-green-600 font-bold text-lg">£{product.price}</p>

        <button
          onClick={handleAddToCart}
          className="mt-3 w-full bg-black text-white py-2 cursor-pointer rounded-xl hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center h-12"
        >
          {isLoader ? <Loader /> : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default Card;
