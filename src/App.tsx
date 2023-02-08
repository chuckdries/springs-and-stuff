import { useState } from "react";
import { AsyncButton } from "./AsyncButton";
import { Checkout } from "./Checkout";
import { NameTag } from "./NameTag";
import { NavContainer } from "./NavContainer";
import { Switch } from "./Switch";

function App() {
  const [funToggle, setFunToggle] = useState(false);
  const [name, setName] = useState("World");

  return (
    <div className="h-screen bg-slate-700 text-white">
      <NavContainer>
        <Switch isSelected={funToggle} onChange={setFunToggle}>
          Flip the switch!
        </Switch>
        <Checkout />
        <AsyncButton>Submit</AsyncButton>
        <div className="flex flex-col items-center">
          <label>
            <span className="mr-2">name:</span>
            <input
              maxLength={8}
              className="p-2 rounded text-black"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <NameTag name={name} />
        </div>
      </NavContainer>
    </div>
  );
}

export default App;
