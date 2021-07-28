import * as React from "react";
import Range from "./components/Range";
import styles from "./styles.module.scss";

///////////////////////////////////////////////
///////////////// APPLICATION /////////////////
///////////////////////////////////////////////
const App = ({}) => {
  const [config, setConfig] = React.useState({
    ratio: 1,
    amount: 12
  });

  const circleArea = {
    radius: 180,
    x: 180,
    y: 180
  };

  //////////////////////////////////////////////
  ////////////////// HANDLERS //////////////////
  //////////////////////////////////////////////

  const handleAmountChange = value => {
    setConfig(p => {
      return { ...p, amount: value };
    });
  };

  const handleRatioChange = value => {
    setConfig(p => {
      return { ...p, ratio: value };
    });
  };

  //////////////////////////////////////////////
  //////////////// FFUNCTIONS //////////////////
  //////////////////////////////////////////////

  const lerp = (x, y, a) => x * (1 - a) + y * a;
  const reverseOrder = (i, arr) => Math.abs((i % arr.length) - arr.length);

  function isInside(circle_x, circle_y, rad, x, y) {
    // Compare radius of circle with
    // distance of its center from
    // given point

    if (
      (x - circle_x) * (x - circle_x) + (y - circle_y) * (y - circle_y) <=
      rad * rad
    )
      return true;
    else return false;
  }

  const createLine = amount => {
    let arr = new Array(amount).fill(0);
    return arr.map((_, i) => {
      let dotRadius = circleArea.radius / config.amount;

      return arr.map((_, j) => {
        const calcRadius = () => {
          if (i < config.amount / 2) {
            let rad = lerp(2, dotRadius, (i + 1) / 10);

            if (j < config.amount / 2) {
              return lerp(2, rad, (j + 1) / 10);
            } else {
              return lerp(2, rad, reverseOrder(j, arr) / 10);
            }
          } else {
            let rad = lerp(2, dotRadius, reverseOrder(i, arr) / 10);

            if (j < config.amount / 2) {
              return lerp(2, rad, (j + 1) / 10);
            } else {
              return lerp(2, rad, reverseOrder(j, arr) / 10);
            }
          }
        };

        const pos = {
          radius: Math.round(((calcRadius() * 2) / config.ratio) * 100) / 100,
          x: dotRadius * 2 * i + dotRadius,
          y: dotRadius * 2 * j + dotRadius
        };

        return isInside(
          circleArea.x,
          circleArea.y,
          circleArea.radius,
          pos.x,
          pos.y
        ) ? (
          <circle
            key={`${i}${j}`}
            cx={pos.x}
            cy={pos.y}
            r={pos.radius}
            fill={"rgba(0,0,0,0.5)"}
          />
        ) : null;
      });
    });
  };

  console.log("---");

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
          <g>{createLine(config.amount)}</g>
          {/* <circle
            cx={circleArea.x}
            cy={circleArea.y}
            r={circleArea.radius}
            fill="rgba(0,0,0,0.2)"
          /> */}
        </svg>
      </section>

      <section>
        <Range
          min={1}
          max={10}
          value={config.ratio}
          label={"Ratio"}
          onChange={handleRatioChange}
        />
        <Range
          step={1}
          min={4}
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
