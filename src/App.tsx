import classNames from "classnames";
import { useState } from "react";
import { Switch } from "./Switch";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={classNames(
        "h-screen p-5 flex flex-col gap-5 items-center",
        darkMode ? "bg-slate-700 text-white" : "text-slate-700"
      )}
    >
      <Switch isSelected={darkMode} onChange={setDarkMode}>
        Dark Mode
      </Switch>
    </div>
  );
}

export default App;
