import PropTypes from "prop-types";
import { useContext } from "react";
import { AppContext } from "../../contexts/appContext";
import Category from "../category/category";

import classes from "./categories.module.css";

const Categories = ({ categories = [] }) => {
  const { activeLink } = useContext(AppContext);

  if (categories && activeLink)
    categories = categories.filter((c) => c.name === activeLink);

  return (
    <div className={classes.categories}>
      {categories &&
        categories.map((c) => <Category key={c.name} category={c} />)}
    </div>
  );
};

export default Categories;

Categories.prototype = {
  categories: PropTypes.array,
};
