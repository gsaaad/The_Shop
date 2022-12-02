import React, { createContext, useContext } from "react";
import { useProductReducer } from "./reducers";

const storeContext = createContext();
const { Provider } = storeContext;

// storeProvider
const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useProductReducer({
    products: [],
    categories: [],
    currentCategory: "",
    // add cart
    cart: [],
    cartOpen: false,
  });
  // confirm
  console.log(state);
  return <Provider value={[state, dispatch]} {...props} />;
};

// useContext

const useStoreContext = () => {
  return useContext(storeContext);
};
export { StoreProvider, useStoreContext };
