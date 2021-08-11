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
  radial: "radial",
  linear: "linear",
  unform: "unform"
};

const shapeItems = {
  circle: "circle",
  rect: "rectangle",
  romb: "romb",
  tri: "triangle"
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
  const [fold, setFold] = React.useState(false);
  // const [lightTheme, setLightTheme] = React.useState(false);
  const [activeGradientMenu, setActiveGradientMenu] = React.useState(
    gradientItems.radial
  );
  const [activeShapeMenu, setActiveShapeMenu] = React.useState(
    shapeItems.circle
  );

  //////////////////////////////////////////////
  ////////////////// HANDLERS //////////////////
  //////////////////////////////////////////////

  const handleFold = () => {
    setFold(!fold);

    parent.postMessage(
      {
        pluginMessage: {
          type: "fold",
          toggle: !fold
        }
      },
      "*"
    );
  };

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

  const handleGradientMenuItem = e => {
    setActiveGradientMenu(e.target.id);
  };

  const handleShapeMenuItem = e => {
    setActiveShapeMenu(e.target.id);
  };

  const sendSVGdata = () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: "SVG-data",
          name: activeGradientMenu,
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
  }, [config, activeGradientMenu, activeShapeMenu]);

  //////////////////////////////////////////////
  //////////// PRE-RENDER FUNCTIONS ////////////
  //////////////////////////////////////////////

  const addShape = (pos, i, j) => {
    if (activeShapeMenu === shapeItems.circle) {
      return <circle key={`${i}${j}`} cx={pos.x} cy={pos.y} r={pos.radius} />;
    }

    if (activeShapeMenu === shapeItems.rect) {
      return (
        <rect
          key={`${i}${j}`}
          x={pos.x - pos.radius}
          y={pos.y - pos.radius}
          width={pos.radius * 2}
          height={pos.radius * 2}
        />
      );
    }

    // if (activeShapeMenu === shapeItems.romb) {
    //   return (
    //     <rect
    //       key={`${i}${j}`}
    //       x={pos.x - pos.radius / 2}
    //       y={pos.y - pos.radius / 2}
    //       width={pos.radius}
    //       height={pos.radius}
    //       transform={`rotate(45 ${circleArea.radius} ${circleArea.radius})`}
    //     />
    //   );
    // }

    if (activeShapeMenu === shapeItems.tri) {
      return (
        <path
          key={`${i}${j}`}
          transform={`translate(${pos.x - pos.radius} ${pos.y - pos.radius})`}
          d={`M${pos.radius} 0L${pos.radius * 2} ${pos.radius * 2}H0Z`}
        />
      );
    }
  };

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
        )
          ? addShape(pos, i, j)
          : null;
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
          y:
            i % 2 == 0
              ? dotRadius * 2 * j + dotRadius * 1.5
              : dotRadius * 2 * j + dotRadius / 2
        };

        return addShape(pos, i, j);
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

        return addShape(pos, i, j);
      });
    });
  };

  const createSelectedGradient = () => {
    if (activeGradientMenu === gradientItems.radial) {
      return (
        <g style={{ transform: "rotate(45deg)", transformOrigin: "center" }}>
          {createRadialGradient(config.amount)}
        </g>
      );
    }
    if (activeGradientMenu === gradientItems.linear) {
      return (
        <g style={{ transform: "rotate(90deg)", transformOrigin: "center" }}>
          {createLinearGradient(config.amount)}
        </g>
      );
    }
    if (activeGradientMenu === gradientItems.unform) {
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
        xmlns="http://www.w3.org/2000/svg"
        fill={"var(--light-clr)"}
      >
        {createSelectedGradient()}
      </svg>
    );
  };

  //////////////////////////////////////////////
  /////////////////// RENDER ///////////////////
  //////////////////////////////////////////////

  return (
    <div className={`${styles.app} ${styles.darkTheme}`}>
      <section className={styles.topButtons}>
        {/* <Button
          icon={lightTheme ? "light-theme" : "dark-theme"}
          className={styles.topButton}
          onClick={() => setLightTheme(!lightTheme)}
        /> */}
        <Button
          icon={fold ? "fold" : "unfold"}
          className={styles.topButton}
          onClick={() => handleFold()}
        />
      </section>

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
              activeGradientMenu !== gradientItems.unform
                ? "Radius ratio"
                : "Seed"
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
            onClick={handleGradientMenuItem}
            id={gradientItems.radial}
            className={`${styles.menu_item} ${styles.menu_radialGrBtn} ${
              activeGradientMenu === gradientItems.radial
                ? ""
                : styles.menu_inactive
            }`}
          />
          <div
            onClick={handleGradientMenuItem}
            id={gradientItems.linear}
            className={`${styles.menu_item} ${styles.menu_linearGrBtn} ${
              activeGradientMenu === gradientItems.linear
                ? ""
                : styles.menu_inactive
            }`}
          />
          <div
            onClick={handleGradientMenuItem}
            id={gradientItems.unform}
            className={`${styles.menu_item} ${styles.menu_unformGrBtn} ${
              activeGradientMenu === gradientItems.unform
                ? ""
                : styles.menu_inactive
            }`}
          />
        </section>

        <section className={styles.menu}>
          <div
            onClick={handleShapeMenuItem}
            id={shapeItems.circle}
            className={`${styles.menu_item} ${
              activeShapeMenu === shapeItems.circle ? "" : styles.menu_inactive
            }`}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.menu_shape}
            >
              <circle cx="8" cy="8" r="8" />
            </svg>
          </div>

          <div
            onClick={handleShapeMenuItem}
            id={shapeItems.rect}
            className={`${styles.menu_item} ${
              activeShapeMenu === shapeItems.rect ? "" : styles.menu_inactive
            }`}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.menu_shape}
            >
              <rect width="14" height="14" />
            </svg>
          </div>

          {/* <div
            onClick={handleShapeMenuItem}
            id={shapeItems.romb}
            className={`${styles.menu_item} ${
              activeShapeMenu === shapeItems.romb ? "" : styles.menu_inactive
            }`}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: "rotate(45deg)" }}
              className={styles.menu_shape}
            >
              <rect width="14" height="14" />
            </svg>
          </div> */}

          <div
            onClick={handleShapeMenuItem}
            id={shapeItems.tri}
            className={`${styles.menu_item} ${
              activeShapeMenu === shapeItems.tri ? "" : styles.menu_inactive
            }`}
          >
            <svg
              width="17"
              height="14"
              viewBox="0 0 17 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.menu_shape}
            >
              <path d="M8.5 0L17 14H0L8.5 0Z" />
            </svg>
          </div>
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
