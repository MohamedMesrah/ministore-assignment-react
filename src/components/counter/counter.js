import { useContext } from "react";
import PropTypes from "prop-types";
import Button from "../shared/button/button";
import { AppContext } from "../../contexts/appContext";

import classes from "./counter.module.css";

const Counter = ({ product }) => {
  const { cart, dispatch } = useContext(AppContext);

  const handlePlus = () => {
    dispatch({ type: "INCREMENT_PRODUCT_COUNT", product });
  };
  const handleMinus = () => {
    dispatch({ type: "DECREMENT_PRODUCT_COUNT", product });
  };

  return (
    <div className={classes.counter}>
      <Button onClick={handlePlus} small="true">
        +
      </Button>
      <div>{cart.productAttrs[product.id].count}</div>
      <Button
        onClick={handleMinus}
        small="true"
        disabled={cart.productAttrs[product.id].count < 1}
      >
        -
      </Button>
    </div>
  );
};

export default Counter;

Counter.prototype = {
  product: PropTypes.object,
};
