import classNames from "classnames";
import { useState } from "react";
import { Switch } from "./Switch";

function App() {
  const [funToggle, setFunToggle] = useState(false);

  return (
    <div
      className={classNames(
        "h-screen p-5 flex flex-col gap-5 items-center",
        "bg-slate-700 text-white"
      )}
    >
      <Switch isSelected={funToggle} onChange={setFunToggle}>
        Flip the switch!
      </Switch>
      <p>fun toggle is {funToggle.toString()}</p>
    </div>
  );
}

export default App;
