import * as React from "react";

import refreshIcon from "../../assets/icons/refresh-icon.svg";
import IconButton from "../IconButton/IconButton";

import browserIcon from "../../assets/icons/white-browser-icon.svg";

interface BrowserMenuBarProps {
  fileName?:string,
  onRefresh?:Function,

}

const BrowserMenuBar: React.FC<BrowserMenuBarProps> = (props:BrowserMenuBarProps) => {
  return (
    <nav className="bg-gray-700 lg:px-4 lg:py-3 lg:flex lg:items-center border border-gray-900">
      <img src={browserIcon} alt={props.fileName || "Browser Window Icon"}></img>
      <p className="ml-4 text-lg text-gray-50">Live Reload</p>
      <div className="ml-auto">
        <IconButton
          src={refreshIcon}
          alt="Refresh Icon"
          onClick={props.onRefresh} 
          width="16px"
          height="16px"
        ></IconButton>
      </div>
    </nav>
  );
};
export default BrowserMenuBar;
