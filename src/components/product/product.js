import { useState, useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Cart from "../cart/cart";
import OutOfStock from "../outOfStock/outOfStock";
import { AppContext } from "../../contexts/appContext";
import { useCurrencyChange } from "../../hooks/currencyChange";

import classes from "./product.module.css";

const Product = ({ product }) => {
  const [showCart, setShowCart] = useState(false);
  const { currency } = useContext(AppContext);
  const [price, setPrice] = useState({ amount: 0, currency });

  useCurrencyChange(currency, product, (newPrice) => setPrice(newPrice));

  let navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleMouseEnter = () => {
    setShowCart(true);
  };

  const handleMouseLeave = () => {
    setShowCart(false);
  };

  return (
    <div
      className={classes.product}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img className={classes.image} src={product.gallery[0]} alt="" />
      {!product.inStock && <OutOfStock />}
      <div className={classes.details}>
        <div>{product.brand + " " + product.name}</div>
        <div>
          <strong>{currency.symbol + " " + price.amount}</strong>
        </div>
      </div>
      <div className={classes["cart-container"]}>
        {showCart && product.inStock && <Cart greenCart product={product} />}
      </div>
    </div>
  );
};

export default Product;

Product.prototype = {
  product: PropTypes.object,
};
