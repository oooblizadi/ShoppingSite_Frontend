import { createContext, ReactNode, useReducer } from "react";
import { CartItem } from "../data/Cart";

type CartState = {
  items: CartItem[];
};
type CartAction = {
  type: "ADD" | "REMOVE";
  payload: CartItem;
};

type CartContextType = {
  state: CartState;
  dispatch: null | React.Dispatch<CartAction>;
};

const initialCartState: CartState = { items: [] };

export const CartContext = createContext<CartContextType>({
  dispatch: null,
  state: {
    items: [],
  },
});

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD":
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        return {
          items: state.items.map((item, index) =>
            index === itemIndex ? { ...item, quantity: item.num + 1 } : item
          ),
        };
      } else {
        return { items: [...state.items, { ...action.payload, num: 1 }] };
      }
    case "REMOVE":
      return {
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    default:
      throw new Error();
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};