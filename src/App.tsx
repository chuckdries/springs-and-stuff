import { useState } from "react";
import {
  useLocation,
  Link,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";

import { AsyncButton } from "./AsyncButton";
import { Checkout } from "./Checkout";
import { Gallery } from "./Gallery";
import { NameTag } from "./NameTag";
import { NavContainer } from "./NavContainer";
import { Switch } from "./Switch";
import { Trophy } from "./Trophy";

function App() {
  const [funToggle, setFunToggle] = useState(false);
  const [name, setName] = useState("Chuck");

  const location = useLocation();

  return (
    <div
      data-id="AppContainer"
      className="min-h-screen bg-slate-700 text-white"
    >
      <NavContainer>
        <Routes>
          <Route
            index
            element={
              <Switch isSelected={funToggle} onChange={setFunToggle}>
                Flip the switch!
              </Switch>
            }
          />
          <Route path="checkout" element={<Checkout />} />
          <Route path="gallery" element={<Gallery />} />
          <Route
            path="trophy"
            element={
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
                <Trophy name={name} />
              </div>
            }
          />
        </Routes>

      </NavContainer>
    </div>
  );
}

export default App;
