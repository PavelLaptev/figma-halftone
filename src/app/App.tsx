import * as React from "react";
import Range from "./components/Range";
import styles from "./styles.module.scss";

///////////////////////////////////////////////
///////////////// APPLICATION /////////////////
///////////////////////////////////////////////
const App = ({}) => {
  const [config, setConfig] = React.useState({
    amount: 10,
    radius: 4,
    space: 4
  });

  //////////////////////////////////////////////
  ////////////////// HANDLERS //////////////////
  //////////////////////////////////////////////

  const handleAmountChange = value => {
    setConfig(p => {
      return { ...p, amount: value };
    });
  };

  const handleRadiusChange = value => {
    setConfig(p => {
      return { ...p, radius: value };
    });
  };

  const handleSpaceChange = value => {
    setConfig(p => {
      return { ...p, space: value };
    });
  };

  //////////////////////////////////////////////
  //////////////// FFUNCTIONS //////////////////
  //////////////////////////////////////////////
  let initialDot = 1;

  const cloneCircle = amount => {
    return new Array(amount).fill(0).map((_, i) => {
      return new Array(amount).fill(0).map((_, j) => {
        // if (initialDot < config.radius) {
        initialDot = (initialDot * (i + 1.1)) % config.radius;
        return (
          <circle
            key={`${i}-${j}`}
            cx={config.radius + config.space * 4 * i}
            cy={config.radius + config.space * 4 * j}
            r={initialDot}
            fill="#000"
          />
        );
        // }
      });
    });
  };

  //////////////////////////////////////////////
  /////////////////// RENDER ///////////////////
  //////////////////////////////////////////////

  return (
    <div className={styles.app}>
      <h1>Hello Stats!</h1>

      <section>
        <svg
          className={styles.svg}
          width="360"
          height="360"
          viewBox="0 0 360 360"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {cloneCircle(config.amount)}
        </svg>
      </section>

      <section>
        <Range
          max={10}
          value={config.radius}
          label={"Radius"}
          onChange={handleRadiusChange}
        />
        <Range
          max={20}
          value={config.space}
          label={"Space"}
          onChange={handleSpaceChange}
        />
        <Range
          max={20}
          value={config.amount}
          label={"Amount"}
          onChange={handleAmountChange}
        />
      </section>

      <button>Get Stats</button>
    </div>
  );
};

export default App;
