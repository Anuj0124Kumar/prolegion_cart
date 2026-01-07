import Card from "../components/Card";
import products from "../components/products.json";
import type { Product } from "../components/types/product";
import Navbar from "./Navbar";


const AllProduct = () => {
    
  return (
    <>
       <Navbar/>
      <div className="bg-linear-to-br from-slate-100 via-gray-50 to-slate-200 p-6 rounded-xl min-h-screen ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: Product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AllProduct;
