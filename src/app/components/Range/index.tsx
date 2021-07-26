import * as React from "react";
import styles from "./styles.module.scss";

interface Props {
  className?: any;
  value?: number;
  max?: number;
  min?: number;
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
      <label htmlFor={props.label}>
        {props.label}: {props.value}
      </label>
      <input
        type="range"
        id={props.label}
        value={props.value}
        name={props.label}
        min={props.min}
        max={props.max}
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
  label: "Label",
  hideLabel: false
} as Partial<Props>;

export default Range;
