import { ReactNode, useState } from "react";
import {NavLink} from 'react-router-dom';

const navLinkClass = ({ isActive }: { isActive: boolean }) => isActive ? 'underline font-bold' : ''

interface NavContainerProps {
  children: ReactNode;
}
export function NavContainer({ children }: NavContainerProps) {
  const [sidebar, setSidebar] = useState(false);
  return (
    <div className="h-full flex flex-col">
      <div className="h-[50px] flex-shrink-0 bg-slate-500 flex items-center px-4">
        <button type="button" onClick={() => setSidebar(!sidebar)}>
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
        {sidebar && (
          <div className="w-[300px] flex-shrink-0 h-[calc(100vh-50px)] bg-slate-600 p-2 flex flex-col">
            <NavLink to="/" className={navLinkClass}>Switch</NavLink>
            <NavLink to="/checkout" className={navLinkClass}>Checkout</NavLink>
            <NavLink to="/gallery" className={navLinkClass}>Gallery</NavLink>
            <NavLink to="/trophy" className={navLinkClass}>Trophy</NavLink>
          </div>
        )}
        <div data-id="NavChildrenContainer" className="flex-auto flex flex-col p-10 items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
