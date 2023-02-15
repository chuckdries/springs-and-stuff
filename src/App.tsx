import { useTransition, animated } from "@react-spring/web";
import { useState } from "react";
import { useLocation, Routes, Route } from "react-router-dom";

import { Checkout } from "./Checkout";
import { Gallery } from "./Gallery";
import { NavContainer } from "./NavContainer";
import { Switch } from "./Switch";
import { Trophy } from "./Trophy";

function App() {
  const [funToggle, setFunToggle] = useState(false);
  const [name, setName] = useState("Chuck");

  const location = useLocation();

  const transition = useTransition(location, {
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    leave: {
      opacity: 0,
    },
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
          </animated.div>
        ))}
      </NavContainer>
    </div>
  );
}

export default App;
