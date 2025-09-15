// Retrieve initial state from localStorage if available (guarded for SSR/blocked storage)
const getInitialCart = () => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return [];
    const storedCart = window.localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (_) {
    return [];
  }
};

const handleCart = (state = getInitialCart(), action) => {
  const product = action.payload;
  if (!product || typeof product.id === 'undefined') return state;
  let updatedCart;

  switch (action.type) {
    case "ADDITEM":
      // Check if product already in cart
      const exist = state.find((x) => x.id === product.id);
      if (exist) {
        // Increase the quantity
        updatedCart = state.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty + 1 } : x
        );
      } else {
        updatedCart = [...state, { ...product, qty: 1 }];
      }
      return updatedCart;

    case "DELITEM":
      const exist2 = state.find((x) => x.id === product.id);
      if (!exist2) return state;
      if (exist2.qty === 1) {
        updatedCart = state.filter((x) => x.id !== exist2.id);
      } else {
        updatedCart = state.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty - 1 } : x
        );
      }
      return updatedCart;

    case "REMALLITEM":
      // Remove the product completely regardless of current quantity
      updatedCart = state.filter((x) => x.id !== product.id);
      return updatedCart;

    default:
      return state;
  }
};

export default handleCart;
