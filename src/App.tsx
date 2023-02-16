import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useTransition, animated } from "@react-spring/web";

import { Checkout } from "./Checkout";
import { Gallery } from "./Gallery";
import { NavContainer } from "./NavContainer";
import { Switch } from "./Switch";
import { Trophy } from "./Trophy";

import { Globals } from "@react-spring/shared";

Globals.assign({
  frameLoop: "always",
});

function App() {
  const [funToggle, setFunToggle] = useState(false);

  const location = useLocation();

  const transition = useTransition(location, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    exitBeforeEnter: true,
  });

  return (
    <div
      data-id="AppContainer"
      className="min-h-screen bg-slate-700 text-white"
    >
      <NavContainer>
        {transition((style, value) => (
          <animated.div style={style}>
            <Routes location={value}>
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
          </animated.div>
        ))}
      </NavContainer>
    </div>
  );
}

export default App;
