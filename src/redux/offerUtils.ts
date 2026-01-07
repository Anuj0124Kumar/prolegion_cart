import type { CartItem } from "./cartSlice";

export interface ProductOffer {
  subtotal: number;
  saving: number;
  finalTotal: number;
}

export interface CartWithOffers {
  items: (CartItem & ProductOffer)[];
  subtotal: number;
  totalSaving: number;
  totalFinal: number;
}

export const calculateOffersPerProduct = (
  items: CartItem[]
): CartWithOffers => {
  // Step 1: prepare base structure
  const cartItems: (CartItem & ProductOffer)[] = items.map((item) => ({
    ...item,
    subtotal: item.price * item.quantity,
    saving: 0,
    finalTotal: item.price * item.quantity,
  }));

  // Step 2: count quantities by product name
  const count: Record<string, number> = {};
  cartItems.forEach((item) => {
    count[item.name] = item.quantity;
  });

  // Step 3: apply offers PER PRODUCT
  cartItems.forEach((item) => {
    let saving = 0;

    /* Buy 1 Cheese  get 1 free */
    if (item.name === "Cheese") {
      const freeCheese = Math.floor(item.quantity / 2);
      saving = freeCheese * item.price;
    }

    /*  Buy 1 Soup  get half-price Bread */
    if (item.name === "Bread" && count["Soup"]) {
      const eligibleBreads = Math.min(item.quantity, count["Soup"]);
      saving = eligibleBreads * (item.price / 2);
    }

    /*  Buy 1 Butter  get a third off */
    if (item.name === "Butter") {
      saving = item.quantity * (item.price / 3);
    }

    item.saving = saving;
    item.finalTotal = item.subtotal - saving;
  });

  // Step 4: cart totals
  const subtotal = cartItems.reduce((acc, item) => acc + item.subtotal, 0);
  const totalSaving = cartItems.reduce((acc, item) => acc + item.saving, 0);
  const totalFinal = subtotal - totalSaving;

  return {
    items: cartItems,
    subtotal,
    totalSaving,
    totalFinal,
  };
};
