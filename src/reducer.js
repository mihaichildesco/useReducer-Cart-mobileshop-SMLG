import {
  INCREASE,
  DECREASE,
  CLEAR_CART,
  REMOVE,
  LOADING,
  DISPLAY_ITEMS,
} from "./actions.js";

const reducer = (state, action) => {
  if (action.type === CLEAR_CART) {
    return { ...state, cart: new Map() };
  }

  if (action.type === REMOVE) {
    const newState = {
      ...state,
      cart: new Map(
        [...state.cart.entries()].filter(([id]) => id !== action.payload)
      ),
    };
    return newState;
  }

  if (action.type === INCREASE) {
    const newCart = new Map(state.cart);
    const itemId = action.payload;
    const item = newCart.get(itemId);
    const newItem = { ...item, amount: item.amount + 1 };
    newCart.set(itemId, newItem);
    return { ...state, cart: newCart };
  }

  if (action.type === DECREASE) {
    const newCart = new Map(state.cart);
    const itemId = action.payload;
    const item = newCart.get(itemId);

    if (item.amount === 1) {
      newCart.delete(itemId);
      return { ...state, cart: newCart };
    }

    const newItem = { ...item, amount: item.amount - 1 };
    newCart.set(itemId, newItem);
    return { ...state, cart: newCart };
  }

  if (action.type === LOADING) {
    return { ...state, loading: true };
  }

  if (action.type === DISPLAY_ITEMS) {
    return {
      ...state,
      cart: new Map(action.payload.map((item) => [item.id, item])),
      loading: false,
    };
  }

  throw new Error(`Unhandled action type: ${action.type}`);
};

export default reducer;
