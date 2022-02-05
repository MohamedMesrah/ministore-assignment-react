import PropTypes from "prop-types";
import classes from "./logo.module.css";

const Logo = ({ onClick }) => {
  return (
    <img
      src="./assets/logo.svg"
      alt="logo"
      className={classes.logo}
      onClick={onClick}
    />
  );
};

export default Logo;

Logo.prototype = {
  onClick: PropTypes.func,
};
