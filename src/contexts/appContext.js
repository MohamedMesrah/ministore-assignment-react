import { createContext, useReducer } from "react";
import { appReducer } from "../reducers/appReducer";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, {
    activeLink: "all",
    showBackDrop: false,
    showCartoverlay: false,
    currency: {
      symbol: "$",
      label: "USD",
    },
    cart: {
      products: [],
      productAttrs: {},
      totalPrice: 0,
    },
  });

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
