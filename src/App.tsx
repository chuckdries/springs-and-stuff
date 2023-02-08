import { useState } from "react";
import { Switch } from "./Switch";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="flex flex-col gap-5 items-center">
      <Switch isSelected={darkMode} onChange={setDarkMode}>Dark Mode</Switch>
    </div>
  );
}

export default App;
