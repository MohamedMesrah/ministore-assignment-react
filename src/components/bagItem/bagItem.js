import { useState, useContext } from "react";
import PropTypes from "prop-types";
import { useCurrencyChange } from "../../hooks/currencyChange";
import Counter from "../counter/counter";
import Gallery from "../gallery/gallery";
import ItemAttrSet from "../itemAttrSet/itemAttrSet";
import { AppContext } from "../../contexts/appContext";

import classes from "./bagItem.module.css";
import Button from "../shared/button/button";

const BagItem = ({ item, pageView }) => {
  const { currency, dispatch } = useContext(AppContext);
  const [price, setPrice] = useState({ amount: 0, currency });

  useCurrencyChange(currency, item, (newPrice) => setPrice(newPrice));

  const handleProductDelete = (product) => {
    dispatch({ type: "REMOVE_PRODUCT", product });
  };

  return (
    <div className={classes["bag-item"]}>
      <div className={classes.left}>
        <div>{item.brand}</div>
        <div>{item.name}</div>
        <div className="bold">{currency.symbol + " " + price.amount}</div>
        {(item.attributes.length && (
          <ItemAttrSet productId={item.id} attributes={item.attributes} />
        )) ||
          null}
        <Button
          delete="true"
          samll="true"
          onClick={() => handleProductDelete(item)}
        >
          Delete
        </Button>
      </div>
      <Counter product={item} />
      <div className={classes["img-container"]}>
        {pageView ? (
          <Gallery images={item.gallery} />
        ) : (
          <img src={item.gallery[0]} alt="img" />
        )}
      </div>
    </div>
  );
};

export default BagItem;

BagItem.prototype = {
  item: PropTypes.object,
  pageView: PropTypes.bool,
};
