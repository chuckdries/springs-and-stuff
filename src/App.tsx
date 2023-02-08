import { useState } from "react";
import { AsyncButton } from "./AsyncButton";
import { Checkout } from "./Checkout";
import { NavContainer } from "./NavContainer";
import { Switch } from "./Switch";

function App() {
  const [funToggle, setFunToggle] = useState(false);

  return (
    <div className="h-screen bg-slate-700 text-white">
      <NavContainer>
        <Switch isSelected={funToggle} onChange={setFunToggle}>
          Flip the switch!
        </Switch>
        <Checkout />
        <AsyncButton>Submit</AsyncButton>
      </NavContainer>
    </div>
  );
}

export default App;
