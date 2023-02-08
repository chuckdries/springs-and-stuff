import { useSpring, animated } from "@react-spring/web";
import classNames from "classnames";
import { ReactNode, useState } from "react";
import { useDrag } from "@use-gesture/react";

interface NavContainerProps {
  children: ReactNode;
}
export function NavContainer({ children }: NavContainerProps) {
  const [sidebarIsOpen, setSidebar] = useState(false);

  const [sidebarSpring, sidebarSpringApi] = useSpring(() => ({
    from: {
      marginLeft: "-300px",
    },
  }));

  const toggleSidebar = () => {
    sidebarSpringApi.start({
      to: {
        marginLeft: sidebarIsOpen ? "-300px" : "0px",
      },
    });
    setSidebar(!sidebarIsOpen);
  };

  const bind = useDrag(({ down, movement: [mx, my] }) => {
    if ((sidebarIsOpen && mx > 0) || (!sidebarIsOpen && mx < 0)) {
      return;
    }
    if (down) {
      const offset = sidebarIsOpen ? 0 : 300;
      sidebarSpringApi.set({
        marginLeft: `${Math.max(-301, Math.min(0, mx - offset))}px`
      })
    } else {
      if (Math.abs(mx) > 100) {
        toggleSidebar();
      } else {
        sidebarSpringApi.start({
          to: {
            marginLeft: sidebarIsOpen ? '0px' : '-300px'
          }
        })
      }
    }
  });

  return (
    <div className="h-full flex flex-col">
      <div className="h-[50px] bg-slate-500 flex items-center px-2">
        <button
          className={classNames(
            "p-1 border border-white rounded",
            sidebarIsOpen && "bg-green-500"
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
          Springs demo app! {sidebarIsOpen.toString()}
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
