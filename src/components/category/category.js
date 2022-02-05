import PropTypes from "prop-types";
import Products from "../products/products";

import classes from "./category.module.css";

const Category = ({ category }) => {
  return (
    <div className={classes.category}>
      <h1>{category.name}</h1>
      <Products products={category.products} />
    </div>
  );
};

export default Category;

Category.prototype = {
  category: PropTypes.object,
};
