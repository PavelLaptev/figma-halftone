import * as React from "react";
import styles from "./styles.module.scss";

import Icon from "../Icon";

interface Props {
  className?: any;
  label?: string;
  icon?: any;
  cursor?: string;
  onClick?: (e) => void;
}

const Button: React.FunctionComponent<Props> = props => {
  return (
    <button
      style={{ cursor: props.cursor }}
      onClick={props.onClick}
      className={`${styles.button} ${props.className}`}
    >
      {props.label ? <span className={styles.text}>{props.label}</span> : null}
      {props.icon ? <Icon className={styles.icon} name={props.icon} /> : null}
    </button>
  );
};

Button.defaultProps = {
  className: "",
  label: null,
  icon: null,
  cursor: "default"
} as Partial<Props>;

export default Button;
