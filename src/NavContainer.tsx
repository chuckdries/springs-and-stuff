import { useSpring, animated } from "@react-spring/web";
import classNames from "classnames";
import { ReactNode, useState } from "react";
import { useDrag } from "@use-gesture/react";

interface NavContainerProps {
  children: ReactNode;
}
export function NavContainer({ children }: NavContainerProps) {
  const [sidebarIsOpen, setSidebar] = useState(false);

  const sidebarSpring = useSpring({
    marginLeft: sidebarIsOpen ? 0 : -300
  });

  const toggleSidebar = () => {
    setSidebar(!sidebarIsOpen);
  };

  const bind = useDrag(({ down, movement: [mx, my], delta: [dx] }) => {
    if ((sidebarIsOpen && mx > 0) || (!sidebarIsOpen && mx < 0)) {
      return;
    }
    if (down) {
      const offset = sidebarSpring.marginLeft.get();
      sidebarSpring.marginLeft.set(Math.max(-301, Math.min(0, dx + offset)))
    } else {
      if (Math.abs(mx) > 100) {
        toggleSidebar();
      } else {
        sidebarSpring.marginLeft.start(sidebarIsOpen ? 0 : -300);
      }
    }
  });

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
        <h1 className="flex-auto text-center">
          Springs demo app!
        </h1>
      </div>
      <div className="flex-auto flex">
        <animated.div
          style={sidebarSpring}
          className="w-[300px] h-full bg-slate-600 p-2"
        >
          sidebar
        </animated.div>
        <div style={{ touchAction: 'none' }} {...bind()} className="flex-auto flex flex-col gap-5 items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
