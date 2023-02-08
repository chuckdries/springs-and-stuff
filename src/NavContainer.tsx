import { useSpring, animated, useTransition } from "@react-spring/web";
import classNames from "classnames";
import { ReactNode, useState } from "react";

interface NavContainerProps {
  children: ReactNode;
}
export function NavContainer({ children }: NavContainerProps) {
  const [sidebarIsOpen, setSidebar] = useState(false);

  const sidebarTransition = useTransition(sidebarIsOpen, {
    from: {
      marginLeft: -300,
    },
    enter: {
      marginLeft: 0,
    },
    leave: {
      marginLeft: -300,
    },
  });

  const toggleSidebar = () => {
    setSidebar(!sidebarIsOpen);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="h-[50px] flex-shrink-0 bg-slate-500 flex items-center px-2">
        <button
          className={classNames(
            "p-1 border border-white rounded",
            sidebarIsOpen && "bg-slate-400"
          )}
          type="button"
          onClick={toggleSidebar}
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
        {sidebarTransition((style, isOpen) => 
          isOpen ? (
            <animated.div
              style={style}
              className="w-[300px] flex-shrink-0 h-full bg-slate-600 p-2"
            >
              sidebar
            </animated.div>
          ) : (
            <></>
          )
        )}
        <div data-id="NavChildrenContainer" className="flex-auto flex flex-col gap-10 items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
