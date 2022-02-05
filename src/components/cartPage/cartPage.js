import { useContext } from "react";
import CartOverlay from "../cartOverlay/cartOverlay";
import { AppContext } from "../../contexts/appContext";

import classes from "./cartPage.module.css";

const CartPage = () => {
  const { cart } = useContext(AppContext);

  return (
    <div className={classes["cart-page"]}>
      <h1>CART</h1>
      {cart.products.length ? (
        <CartOverlay items={cart.products} pageView="true" />
      ) : (
        <h2 style={{ color: "rgb(0 199 0)" }}>Cart Is Empty</h2>
      )}
    </div>
  );
};

export default CartPage;
