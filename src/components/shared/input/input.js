import classes from "./input.module.css";

const Input = (props) => {
  let className = [classes.input];

  props.small && className.push(classes.small);
  props.type === "color" && className.push(classes.color);

  return <input className={className.join(" ")} {...props} />;
};

export default Input;
