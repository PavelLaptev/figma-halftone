import * as React from "react";
// import styles from "./app.module.scss";

///////////////////////////////////////////////
///////////////// APPLICATION /////////////////
///////////////////////////////////////////////
const App = ({}) => {
  //////////////////////////////////////////////
  ////////////////// HANDLERS //////////////////
  //////////////////////////////////////////////
  const handleGetStat = () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: "request-stats"
        }
      },
      "*"
    );
  };

  React.useEffect(() => {
    onmessage = event => {
      console.log(event.data.pluginMessage);
    };
  });

  //////////////////////////////////////////////
  /////////////////// RENDER ///////////////////
  //////////////////////////////////////////////

  return (
    <div>
      <h1>Hello Stats!</h1>
      <button onClick={handleGetStat}>Get Stats</button>
    </div>
  );
};

export default App;
