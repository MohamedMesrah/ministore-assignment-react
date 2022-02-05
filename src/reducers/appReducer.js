export function appReducer(state, action) {
  let price = null;
  let total = 0;
  let productCount = 0;
  let attrObj = null;

  switch (action.type) {
    // active link (category)
    case "SET_ACTIVE_LINKE":
      return { ...state, activeLink: action.activeLink };

    // backdrop
    case "TOGGLE_BACK_DROP":
      return { ...state, showBackDrop: !state.showBackDrop };
    case "HIDE_BACK_DROP":
      return { ...state, showBackDrop: false };

    // cart overlay
    case "TOGGLE_CARTOVERLAY":
      return { ...state, showCartoverlay: !state.showCartoverlay };
    case "HIDE_CARTOVERLAY":
      return { ...state, showCartoverlay: false };

    // currency
    case "CURRENCY_CHANGE":
      state.cart.products.map((prod) => {
        price = prod.prices.find(
          (p) => action.currency.symbol === p.currency.symbol
        );

        state.cart.productAttrs[prod.id].count &&
          (total += Number(
            (
              parseFloat(price.amount) * state.cart.productAttrs[prod.id].count
            ).toFixed(2)
          ));
      });
      return {
        ...state,
        currency: action.currency,
        cart: {
          ...state.cart,
          totalPrice: total,
        },
      };

    // product
    case "ADD_PRODUCT":
      price = action.product.prices.find(
        (p) => state.currency.symbol === p.currency.symbol
      );

      return {
        ...state,
        cart: {
          products: [...state.cart.products, action.product],
          productAttrs: {
            ...state.cart.productAttrs,
            [action.product.id]: {
              ...state.cart.productAttrs[action.product.id],
              count: 1,
            },
          },
          totalPrice: Number(
            (
              parseFloat(state.cart.totalPrice) + parseFloat(price.amount)
            ).toFixed(2)
          ),
        },
      };
    case "REMOVE_PRODUCT":
      // get current product price
      price = action.product.prices.find(
        (p) => state.currency.symbol === p.currency.symbol
      );

      // get current product count
      productCount = state.cart.productAttrs[action.product.id].count;

      // calculate total price
      total = Number(
        (
          parseFloat(state.cart.totalPrice) -
          parseFloat(price.amount * productCount)
        ).toFixed(2)
      );

      return {
        ...state,
        cart: {
          ...state.cart,
          products: state.cart.products.filter(
            (p) => p.id !== action.product.id
          ),
          productAttrs: {
            ...state.cart.productAttrs,
            [action.product.id]: {},
          },
          totalPrice: total,
        },
      };

    // products count
    case "INCREMENT_PRODUCT_COUNT":
      price = action.product.prices.find(
        (p) => state.currency.symbol === p.currency.symbol
      );

      return {
        ...state,
        cart: {
          ...state.cart,
          productAttrs: {
            ...state.cart.productAttrs,
            [action.product.id]: {
              ...state.cart.productAttrs[action.product.id],
              count:
                Number(state.cart.productAttrs[action.product.id].count) + 1,
            },
          },
          totalPrice: Number(
            (
              parseFloat(state.cart.totalPrice) + parseFloat(price.amount)
            ).toFixed(2)
          ),
        },
      };
    case "DECREMENT_PRODUCT_COUNT":
      price = action.product.prices.find(
        (p) => state.currency.symbol === p.currency.symbol
      );

      return {
        ...state,
        cart: {
          ...state.cart,
          productAttrs: {
            ...state.cart.productAttrs,
            [action.product.id]: {
              ...state.cart.productAttrs[action.product.id],
              count:
                Number(state.cart.productAttrs[action.product.id].count) - 1,
            },
          },
          totalPrice: Number(
            (
              parseFloat(state.cart.totalPrice) - parseFloat(price.amount)
            ).toFixed(2)
          ),
        },
      };

    // attributes
    case "SET_PRODUCT_ATTR":
      attrObj = { [action.payload.attrKey]: action.payload.attrValue };

      return {
        ...state,
        cart: {
          ...state.cart,
          productAttrs: {
            ...state.cart.productAttrs,
            [action.payload.productId]: {
              ...state.cart.productAttrs[action.payload.productId],
              ...attrObj,
            },
          },
        },
      };

    // default return
    default:
      return state;
  }
}
