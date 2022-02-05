import PropTypes from "prop-types";
import ItemAttr from "../itemAttr/itemAttr";

import classes from "./itemAttrSet.module.css";

const ItemAttrSet = ({ productId, attributes = [], sizeLabel = false }) => {
  return (
    <div className={classes["item-attr-set"]}>
      {attributes.length &&
        attributes.map((item) => (
          <ItemAttr
            key={item.id}
            productId={productId}
            item={item}
            sizeLabel={sizeLabel}
          />
        ))}
    </div>
  );
};

export default ItemAttrSet;

ItemAttrSet.prototype = {
  attributes: PropTypes.array,
  sizeLabel: PropTypes.bool,
};
