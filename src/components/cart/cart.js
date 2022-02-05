import PropTypes from "prop-types";
import { useRef, useContext } from "react";
import { useClickOutside } from "../../hooks/clickOutside";
import CartOverlay from "../cartOverlay/cartOverlay";
import { AppContext } from "../../contexts/appContext";

import classes from "./cart.module.css";

const Cart = ({ withCount, greenCart, product = null }) => {
  const { showCartoverlay, cart, dispatch } = useContext(AppContext);

  const ref = useRef(null);
  useClickOutside(ref, () => {
    dispatch({ type: "HIDE_CARTOVERLAY" });
    dispatch({ type: "HIDE_BACK_DROP" });
  });

  const handleClick = (e) => {
    if (!greenCart) {
      dispatch({ type: "TOGGLE_CARTOVERLAY" });
      dispatch({ type: "TOGGLE_BACK_DROP" });
    } else {
      e.stopPropagation();
      let inCart = cart.products.find((p) => p.id === product.id);
      if (inCart) alert(`"${product.name}" Already in Cart`);
      else {
        alert(`"${product.name}" Added Successfuly`);
        dispatch({ type: "ADD_PRODUCT", product });
      }
    }
  };

  return (
    <div className={classes.wrapper} ref={ref}>
      <div className={classes.cart} onClick={handleClick}>
        <img
          src={greenCart ? "./assets/green-cart.svg" : "./assets/cart.svg"}
          alt="shopping-cart-icon"
        />
        {withCount && (
          <span className={classes.count}>{cart.products.length}</span>
        )}
      </div>
      {showCartoverlay && <CartOverlay items={cart.products} />}
    </div>
  );
};

export default Cart;

Cart.prototype = {
  withCount: PropTypes.bool,
  greenCart: PropTypes.bool,
  product: PropTypes.object,
};
