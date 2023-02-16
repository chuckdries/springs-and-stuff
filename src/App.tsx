import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { Checkout } from "./Checkout";
import { Gallery } from "./Gallery";
import { NavContainer } from "./NavContainer";
import { Switch } from "./Switch";
import { Trophy } from "./Trophy";

function App() {
  const [funToggle, setFunToggle] = useState(false);

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
          <Route path="trophy" element={<Trophy />} />
        </Routes>
      </NavContainer>
    </div>
  );
}

export default App;
