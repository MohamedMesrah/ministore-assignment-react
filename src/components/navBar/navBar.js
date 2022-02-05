import { useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Cart from "../cart/cart";
import Logo from "../logo/logo";
import Currencies from "../currencies/currencies";
import { AppContext } from "../../contexts/appContext";

import classes from "./navBar.module.css";

const NavBar = ({ links }) => {
  const { activeLink, dispatch } = useContext(AppContext);

  let navigate = useNavigate();

  const handleActive = ({ currentTarget }) => {
    navigate("/");
    dispatch({
      type: "SET_ACTIVE_LINKE",
      activeLink: currentTarget.innerText.toLowerCase(),
    });
  };

  return (
    <div className={classes["nav-bar"]}>
      <nav>
        {links.map((link) => (
          <span
            key={link}
            className={classes.link}
            style={{
              color: activeLink === link ? "#00ff00" : "black",
              borderBottom: `2px solid ${
                activeLink === link ? "#00ff00" : "transparent"
              }`,
            }}
            onClick={handleActive}
          >
            {link.toUpperCase()}
          </span>
        ))}
      </nav>
      <Logo onClick={() => navigate("/")} />
      <div className={classes["right"]}>
        <Currencies />
        <Cart withCount="true" />
      </div>
    </div>
  );
};

export default NavBar;

NavBar.prototype = {
  links: PropTypes.array,
};
