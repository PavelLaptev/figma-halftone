import * as React from "react";
import styles from "./styles.module.scss";

interface Props {
  className?: any;
  value?: number;
  max?: number;
  min?: number;
  step?: number;
  label?: string;
  hideLabel?: boolean;
  onChange?: (value: number) => void;
}

const Range: React.FunctionComponent<Props> = props => {
  const handleChange = e => {
    props.onChange(Number(e.target.value));
  };

  return (
    <div className={styles.wrap}>
      <label className={styles.label} htmlFor={props.label}>
        {props.label} <span>{props.value}</span>
      </label>
      <input
        className={styles.range}
        type="range"
        id={props.label}
        value={props.value}
        name={props.label}
        min={props.min}
        max={props.max}
        step={props.step}
        onChange={handleChange}
      />
    </div>
  );
};

Range.defaultProps = {
  className: "",
  value: 50,
  max: 100,
  min: 0,
  step: 1,
  label: "Label",
  hideLabel: false
} as Partial<Props>;

export default Range;
