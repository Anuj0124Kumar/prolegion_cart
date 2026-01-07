import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        
       
        <h1 className="text-7xl font-extrabold text-gray-800 mb-4">
          404
        </h1>

        <h2 className="text-2xl font-semibold mb-2">
          Page Not Found
        </h2>

        <p className="text-gray-600 mb-6">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>

       
        <Link
          to="/"
          className="bg-black text-white cursor-pointer px-6 py-3 rounded-lg
                   hover:bg-gray-800 transition duration-200"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
