import * as React from "react";
import styles from "./styles.module.scss";

interface Props {
  className?: any;
  label?: string;
  checked?: boolean;
  onChange?: (e) => void;
}

const Checkbox: React.FunctionComponent<Props> = props => {
  const [toggle, setToggle] = React.useState(props.checked);

  const handleOnChange = e => {
    setToggle(e.target.checked);
    props.onChange(e.target.checked);
  };

  return (
    <div className={styles.wrap}>
      <label className={styles.label} htmlFor={props.label}>
        {props.label}
      </label>
      <div className={`${styles.checbox} ${toggle ? styles.active : ""}`} />
      <input
        onChange={handleOnChange}
        type="checkbox"
        id={props.label}
        name={props.label}
        checked={toggle}
      />
    </div>
  );
};

Checkbox.defaultProps = {
  className: "",
  label: "Checkbox",
  checked: false
} as Partial<Props>;

export default Checkbox;
