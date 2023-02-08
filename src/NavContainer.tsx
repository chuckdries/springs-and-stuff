import { useSpring, animated } from "@react-spring/web";
import { ReactNode, useState } from "react";

interface NavContainerProps {
  children: ReactNode;
}
export function NavContainer({ children }: NavContainerProps) {
  const [sidebar, setSidebar] = useState(false);

  const sidebarSpring = useSpring({
    marginLeft: sidebar ? "-300px" : "0px",
  });

  return (
    <div className="h-full flex flex-col">
      <div className="h-[50px] bg-slate-500 flex items-center px-2">
        <button
          className="p-1 border border-white rounded"
          type="button"
          onClick={() => setSidebar(!sidebar)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <h1 className="flex-auto text-center">Springs demo app!</h1>
      </div>
      <div className="flex-auto flex">
        <animated.div
          style={sidebarSpring}
          className="w-[300px] h-full bg-slate-600 p-2"
        >
          sidebar
        </animated.div>
        <div className="flex-auto flex flex-col gap-5 items-center">
          {children}
        </div>
      </div>
    </div>
  );
}