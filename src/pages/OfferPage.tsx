import React from "react";

const offers = [
  {
    title: "Cheese Offer",
    description: "Buy 1 Cheese and get the second Cheese absolutely free.",
    example: "2 Cheese → Pay for 1",
    badge: "BOGO",
  },
  {
    title: "Soup & Bread Combo",
    description: "Buy 1 Soup and get 1 Bread at half price.",
    example: "Soup + Bread → Bread 50% OFF",
    badge: "50% OFF",
  },
  {
    title: "Butter Discount",
    description: "Buy 1 Butter and get one-third off the price.",
    example: "Butter → 33% OFF",
    badge: "SAVE 33%",
  },
];

const OfferPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-3">
          🏷️ Special Offers
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Add products to your cart and enjoy instant savings
        </p>

        {/* Offers Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border hover:shadow-md transition p-6 flex flex-col justify-between"
            >
              <div>
                <span className="inline-block mb-3 px-3 py-1 text-xs font-semibold text-white bg-green-500 rounded-full">
                  {offer.badge}
                </span>

                <h2 className="text-xl font-semibold mb-2">
                  {offer.title}
                </h2>

                <p className="text-gray-600 mb-4">
                  {offer.description}
                </p>
              </div>

              <div className="mt-auto bg-gray-100 text-sm rounded-lg px-4 py-2 font-medium text-gray-700">
                Example: {offer.example}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-10 text-center text-sm text-gray-500">
          Discounts are applied automatically at checkout based on cart items.
        </div>
      </div>
    </div>
  );
};

export default OfferPage;
