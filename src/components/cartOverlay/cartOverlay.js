/* eslint-disable react/display-name */
import React, { useContext } from "react";
import PropTypes from "prop-types";
import Button from "../shared/button/button";
import BagItem from "../bagItem/bagItem";
import classes from "./cartOverlay.module.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../contexts/appContext";

const CartOverlay = React.forwardRef(
  ({ items = [], pageView = false }, ref) => {
    const { currency, cart, dispatch } = useContext(AppContext);

    let navigate = useNavigate();

    const handleViewBagClick = () => {
      navigate("/cart");
      dispatch({ type: "HIDE_CARTOVERLAY" });
      dispatch({ type: "HIDE_BACK_DROP" });
    };

    return (
      <div ref={ref} className={!pageView ? classes["cart-overlay"] : ""}>
        {!pageView && (
          <div className={classes["bag-count"]}>
            <strong>My Bag, </strong>
            {items.length + " "}
            {items.length && items.length > 1 ? "items" : "item"}
          </div>
        )}
        <div className={classes["bag-items"]}>
          {(items.length &&
            items.map((item) => (
              <BagItem key={item.id} item={item} pageView={pageView} />
            ))) ||
            null}
        </div>
        {!pageView && (
          <>
            <div className={classes.total}>
              <span className="bold">Total</span>
              <span className="bold">{currency.symbol + cart.totalPrice}</span>
            </div>
            <div className={classes.btns}>
              <Button onClick={handleViewBagClick}>VIEW BAG</Button>
              <Button green="true">CHECK OUT</Button>
            </div>
          </>
        )}
      </div>
    );
  }
);

export default CartOverlay;

CartOverlay.prototype = {
  items: PropTypes.array,
  pageView: PropTypes.bool,
};
