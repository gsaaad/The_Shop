import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from "../utils/actions";

export const reducer = (state, action) => {
  switch (action.type) {
    // action if update products
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
      };

    // if none, do not update
    default:
      return state;
  }
};
