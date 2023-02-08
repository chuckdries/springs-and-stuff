import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col gap-5 items-center">
      <button
        className="border border-white hover:bg-slate-600 rounded-lg p-2"
        type="button"
        onClick={() => setCount(count + 1)}
      >
        {count} + 1
      </button>
      <div className="w-[600px] border-2 border-green-400 rounded-xl p-[20px]">
        <div
          className="relative h-[100px] w-[200px] flex items-center justify-center bg-red-500 rounded-lg"
          style={{
            left: count % 2 == 0 ? 0 : '360px'
          }}
        >
          count is {count % 2 === 0 ? "even" : "odd"}
        </div>
      </div>
    </div>
  );
}

export default App;
