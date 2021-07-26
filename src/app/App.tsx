import * as React from "react";
import Canvas from "./components/Canvas";
import Range from "./components/Range";
// import styles from "./app.module.scss";

///////////////////////////////////////////////
///////////////// APPLICATION /////////////////
///////////////////////////////////////////////
const App = ({}) => {
  const [config, setConfig] = React.useState({
    amount: 10
  });

  //////////////////////////////////////////////
  ////////////////// HANDLERS //////////////////
  //////////////////////////////////////////////

  const getSVG = () => {};

  const handleChange = value => {
    setConfig({ amount: value });
  };

  //////////////////////////////////////////////
  /////////////////// RENDER ///////////////////
  //////////////////////////////////////////////

  return (
    <div>
      <h1>Hello Stats!</h1>

      <Canvas params={config} />

      <section>
        <Range max={50} value={config.amount} onChange={handleChange} />
      </section>

      <button onClick={getSVG}>Get Stats</button>
    </div>
  );
};

export default App;
