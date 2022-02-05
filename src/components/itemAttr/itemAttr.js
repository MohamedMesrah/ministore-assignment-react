import PropTypes from "prop-types";
import { useContext, useState } from "react";
import Button from "../shared/button/button";
import Input from "../shared/input/input";
import { AppContext } from "../../contexts/appContext";

import classes from "./itemAttr.module.css";

const ItemAttr = ({ productId, item, sizeLabel }) => {
  const { cart, dispatch } = useContext(AppContext);
  const [buttons] = useState(["XS", "S", "M", "L"]);

  let content = null;

  const handleAttrChange = ({ currentTarget }, attrKey) => {
    dispatch({
      type: "SET_PRODUCT_ATTR",
      payload: { productId, attrKey, attrValue: currentTarget.value },
    });
  };

  if (item.name === "Size") {
    content = (
      <div className={classes.btns}>
        {sizeLabel && (
          <div>
            <strong>SIZE:</strong>
          </div>
        )}
        {buttons.map((b) => (
          <Button
            key={b}
            small="true"
            value={b}
            selected={
              cart.productAttrs[productId] &&
              cart.productAttrs[productId].size == b
            }
            onClick={(e) => handleAttrChange(e, "size")}
          >
            {b}
          </Button>
        ))}
      </div>
    );
  } else if (item.name === "Color") {
    content = (
      <>
        <span>
          <strong>Color: </strong>
        </span>
        <Input
          type="color"
          value={
            cart.productAttrs[productId] && cart.productAttrs[productId].color
              ? cart.productAttrs[productId].color
              : "#000000"
          }
          onChange={(e) => handleAttrChange(e, "color")}
        />
      </>
    );
  } else if (item.name === "Capacity") {
    content = (
      <span>
        <Input
          type="text"
          placeholder="Capacity"
          small="true"
          value={
            cart.productAttrs[productId] &&
            cart.productAttrs[productId].capacity
              ? cart.productAttrs[productId].capacity
              : ""
          }
          onChange={(e) => handleAttrChange(e, "capacity")}
        />
      </span>
    );
  } else {
    content = (
      <span>
        <Input type="checkbox" />
        <strong>{item.name}</strong>
      </span>
    );
  }

  return <div className={classes["item-attr"]}>{content}</div>;
};

export default ItemAttr;

ItemAttr.prototype = {
  item: PropTypes.object,
  sizeLabel: PropTypes.bool,
};
