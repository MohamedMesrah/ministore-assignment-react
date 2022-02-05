import { useRef, useState, useContext } from "react";
import { useQuery } from "@apollo/client";
import { GET_CURRENCIES } from "../../graphQL/queries";
import { useClickOutside } from "../../hooks/clickOutside";
import { AppContext } from "../../contexts/appContext";

import classes from "./currencies.module.css";

const Currencies = () => {
  const { data } = useQuery(GET_CURRENCIES);
  const [showDropdown, setShowDropdown] = useState(false);
  const { currency, dispatch } = useContext(AppContext);

  const ref = useRef(null);

  useClickOutside(ref, () => setShowDropdown(false));

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleCurrency = (currency) => {
    setShowDropdown(false);
    dispatch({ type: "CURRENCY_CHANGE", currency });
  };

  return (
    <div ref={ref} className={classes.currencies}>
      <div onClick={handleToggleDropdown}>
        {currency.symbol}{" "}
        {showDropdown ? <span>&#8963;</span> : <span>&#8964;</span>}
      </div>

      {showDropdown && (
        <div className={classes.dropdown}>
          {data.currencies.length &&
            data.currencies.map((c) => (
              <li key={c.label} onClick={() => handleCurrency(c)}>
                {c.symbol + " " + c.label}
              </li>
            ))}
        </div>
      )}
    </div>
  );
};

export default Currencies;
