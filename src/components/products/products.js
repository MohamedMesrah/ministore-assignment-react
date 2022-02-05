import PropTypes from "prop-types";
import Product from "../product/product";

import classes from "./products.module.css";

const Products = ({ products }) => {
  return (
    <div className={classes.products}>
      {products.map((p) => (
        <Product key={p.id} product={p} />
      ))}
    </div>
  );
};

export default Products;

Products.prototype = {
  products: PropTypes.array,
};
