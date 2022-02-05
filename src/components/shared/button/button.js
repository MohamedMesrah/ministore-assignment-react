import classes from "./button.module.css";

const Button = (props) => {
  let className = [classes["base-btn"]];

  props.green && className.push(classes["green-btn"]);
  props.small && className.push(classes["small-btn"]);
  props.delete && className.push(classes["delete-btn"]);
  props.selected && className.push(classes["selected-btn"]);

  return (
    <button className={className.join(" ")} {...props}>
      {props.children}
    </button>
  );
};

export default Button;
