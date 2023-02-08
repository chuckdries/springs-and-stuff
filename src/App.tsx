import classNames from "classnames";
import { useState } from "react";
import { NavContainer } from "./NavContainer";
import { Switch } from "./Switch";

function App() {
  const [funToggle, setFunToggle] = useState(false);

  return (
    <div
      className={classNames(
        "h-screen ",
        "bg-slate-700 text-white"
      )}
    >
      <NavContainer>
        <Switch isSelected={funToggle} onChange={setFunToggle}>
          Flip the switch!
        </Switch>
        <p>fun toggle is {funToggle.toString()}</p>
      </NavContainer>
    </div>
  );
}

export default App;
