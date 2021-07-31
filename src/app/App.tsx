import * as React from "react";
import ReactDOMServer from "react-dom/server";
import Range from "./components/Range";
import Button from "./components/Button";
import Checkbox from "./components/Checkbox";

import styles from "./styles.module.scss";

import { lerp, reverseOrder, isInside } from "./utils";

///////////////////////////////////////////////
//////////////// INITIAL VARS /////////////////
///////////////////////////////////////////////
const frameSizeWidth = 220;

const circleArea = {
  radius: frameSizeWidth / 2,
  x: frameSizeWidth / 2,
  y: frameSizeWidth / 2
};

const gradientItems = {
  radial: "Radial",
  linear: "Linear",
  unform: "Unform"
};

///////////////////////////////////////////////
///////////////// APPLICATION /////////////////
///////////////////////////////////////////////

const App = ({}) => {
  ///////////////////////////////////////////////
  //////////////////// STATES ///////////////////
  ///////////////////////////////////////////////

  const [config, setConfig] = React.useState({
    growth: 9,
    ratio: 10,
    amount: 8,
    flatten: true
  });

  const [SVGData, setSVGData] = React.useState(null);
  const [lightTheme, setLightTheme] = React.useState(false);
  const [activeMenu, setActiveMenu] = React.useState(gradientItems.radial);

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

  const handleGrowthChange = value => {
    setConfig(p => {
      return { ...p, growth: value };
    });
  };

  const handleFlatten = value => {
    setConfig(p => {
      return { ...p, flatten: value };
    });
  };

  const handleMenuItem = e => {
    setActiveMenu(e.target.id);
  };

  const sendSVGdata = () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: "SVG-data",
          name: activeMenu,
          flatten: config.flatten,
          data: ReactDOMServer.renderToString(SVGData)
        }
      },
      "*"
    );
  };

  React.useEffect(() => {
    let SVGData = createSVG();
    setSVGData(SVGData);
  }, [config, activeMenu]);

  //////////////////////////////////////////////
  //////////// PRE-RENDER FUNCTIONS ////////////
  //////////////////////////////////////////////

  const createRadialGradient = amount => {
    let arr = new Array(amount).fill(0);
    let dotRadius = circleArea.radius / amount;

    return arr.map((_, i) => {
      return arr.map((_, j) => {
        let equab = (i + 1) * config.growth;
        let equabReverse = reverseOrder(i, arr) * config.growth;

        const calcRadius = () => {
          if (i < config.amount / 2) {
            let rad = lerp(dotRadius, i + 1 + equab);

            if (j < config.amount / 2) {
              return lerp(rad, j + 1);
            } else {
              return lerp(rad, reverseOrder(j, arr));
            }
          } else {
            let rad = lerp(dotRadius, reverseOrder(i, arr) + equabReverse);

            if (j < config.amount / 2) {
              return lerp(rad, j + 1);
            } else {
              return lerp(rad, reverseOrder(j, arr));
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
            fill={"var(--light-clr)"}
          />
        ) : null;
      });
    });
  };

  const createLinearGradient = amount => {
    let arr = new Array(amount).fill(0);
    let dotRadius = circleArea.radius / amount;

    return arr.map((_, i) => {
      return arr.map((_, j) => {
        let equab = (i + 1 * config.growth) / 3;

        const pos = {
          radius: Math.round(((i + equab * 2) / config.ratio) * 100) / 100,
          x: dotRadius * 2 * i + dotRadius,
          y: dotRadius * 2 * j + dotRadius
        };

        return (
          <circle
            key={`${i}${j}`}
            cx={pos.x}
            cy={pos.y}
            r={pos.radius}
            fill={"var(--light-clr)"}
          />
        );
      });
    });
  };

  const createUnformedGradient = amount => {
    let arr = new Array(amount).fill(0);
    let dotRadius = circleArea.radius / amount;

    return arr.map((_, i) => {
      return arr.map((_, j) => {
        const randomRad = Math.random() * config.growth + 1;

        const pos = {
          radius: Math.round(randomRad * 100) / 100,
          x: dotRadius * 2 * i + dotRadius,
          y: dotRadius * 2 * j + dotRadius
        };

        return (
          <circle
            key={`${i}${j}`}
            cx={pos.x}
            cy={pos.y}
            r={pos.radius}
            fill={"var(--light-clr)"}
          />
        );
      });
    });
  };

  const createSelectedGradient = () => {
    if (activeMenu === gradientItems.radial) {
      return (
        <g style={{ transform: "rotate(45deg)", transformOrigin: "center" }}>
          {createRadialGradient(config.amount)}
        </g>
      );
    }
    if (activeMenu === gradientItems.linear) {
      return (
        <g style={{ transform: "rotate(90deg)", transformOrigin: "center" }}>
          {createLinearGradient(config.amount)}
        </g>
      );
    }
    if (activeMenu === gradientItems.unform) {
      return <g>{createUnformedGradient(config.amount)}</g>;
    }
  };

  const createSVG = () => {
    return (
      <svg
        className={styles.svg}
        width={frameSizeWidth}
        height={frameSizeWidth}
        viewBox={`0 0 ${frameSizeWidth} ${frameSizeWidth}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {createSelectedGradient()}
      </svg>
    );
  };

  //////////////////////////////////////////////
  /////////////////// RENDER ///////////////////
  //////////////////////////////////////////////

  return (
    <div
      className={`${styles.app} ${
        lightTheme ? styles.lightTheme : styles.darkTheme
      }`}
    >
      <Button
        icon={lightTheme ? "light-theme" : "dark-theme"}
        className={styles.themeSwitcher}
        onClick={() => setLightTheme(!lightTheme)}
      />

      <section>{SVGData}</section>

      <section className={styles.controlsWrap}>
        <section className={styles.settings}>
          <Range
            min={0}
            max={20}
            value={config.growth}
            label={"Growth ratio"}
            onChange={handleGrowthChange}
          />
          <Range
            min={1}
            max={10}
            value={config.ratio}
            label={
              activeMenu !== gradientItems.unform ? "Radius ratio" : "Seed"
            }
            onChange={handleRatioChange}
          />
          <Range
            step={1}
            min={4}
            max={30}
            value={config.amount}
            label={"Density"}
            onChange={handleAmountChange}
          />
        </section>

        <section className={styles.menu}>
          <div
            onClick={handleMenuItem}
            id={gradientItems.radial}
            className={`${styles.menu_radialgrBtn} ${
              activeMenu === gradientItems.radial ? "" : styles.menu_inactive
            }`}
          />
          <div
            onClick={handleMenuItem}
            id={gradientItems.linear}
            className={`${styles.menu_linearGrBtn} ${
              activeMenu === gradientItems.linear ? "" : styles.menu_inactive
            }`}
          />
          <div
            onClick={handleMenuItem}
            id={gradientItems.unform}
            className={`${styles.menu_unformGrBtn} ${
              activeMenu === gradientItems.unform ? "" : styles.menu_inactive
            }`}
          />
        </section>

        <Checkbox
          label={"Flatten on export"}
          onChange={handleFlatten}
          checked={config.flatten}
        />

        <Button
          cursor="cell"
          className={styles.button}
          label={"Add gradient"}
          onClick={sendSVGdata}
        />
      </section>
    </div>
  );
};

export default App;
