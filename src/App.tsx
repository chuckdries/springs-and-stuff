import classNames from "classnames";
import { useState } from "react";
import { Checkout } from "./Checkout";
import { NavContainer } from "./NavContainer";
import { Switch } from "./Switch";

function App() {
  const [funToggle, setFunToggle] = useState(false);

  return (
    <div className={classNames("h-screen ", "bg-slate-700 text-white")}>
      <NavContainer>
        <Switch isSelected={funToggle} onChange={setFunToggle}>
          Flip the switch!
        </Switch>
        <Checkout />
      </NavContainer>
    </div>
  );
}

export default App;
