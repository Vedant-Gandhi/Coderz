import * as React from "react";
import IconButton from "../IconButton/IconButton";

import NotesIcon from "../../assets/icons/notes.svg";
import alignIcon from "../../assets/icons/white-format-icon.png";
import downloadIcon from "../../assets/icons/download-icon.svg";
import menuIcon from "../../assets/icons/menu.svg";
import { LanguageTab } from "./CodeWindowConfig";
interface CodeWindowMenuBarProps {
  tabs: Array<LanguageTab>;
  onTabClick?: Function;
  onMenuClick?: Function;
}

const CodeWindowMenuBar: React.FC<CodeWindowMenuBarProps> = ({
  tabs,
  onTabClick,
  onMenuClick,
}) => {
  const [selectedTab, updateSelectedTab] = React.useState(
    null as unknown | string
  );
  React.useEffect(() => {
    if (tabs.length > 0) {
      updateSelectedTab(tabs[0].key);
    }
  }, [tabs]);
  return (
    <nav className="bg-gray-700 lg:px-4 lg:py-2 lg:flex lg:items-center border border-gray-700">
      <div
        className="w-9 cursor-pointer mr-8 p-2 rounded-3xl hover:bg-gray-500"
        onClick={(e) => {
          if (typeof onMenuClick === "function") {
            onMenuClick(e);
          }
        }}
      >
        <img src={menuIcon} alt="Open Menu"></img>
      </div>
      <div className="w-1/2 overflow-x-auto overflow-y-hidden  h-full flex items-center">
        {tabs.map((value) => (
          <section
            className={`px-4 border-2 border-gray-700 bg-gray-600 h-full flex items-center rounded text-gray-400 select-none cursor-pointer text-sm hover:border-b-blue-400 transition-all hover:text-white ${
              value.key === selectedTab && "border-b-blue-400 text-white"
            }`}
            key={value.key}
            onClick={(e) => {
              if (typeof onTabClick === "function") {
                updateSelectedTab(value.key);
                onTabClick(value as LanguageTab);
              }
            }}
          >
            <p>{value.tabName}</p>
          </section>
        ))}
      </div>
      <div className="ml-auto flex">
        <IconButton
          src={NotesIcon}
          alt="Notes"
          width="24px"
          height="24px"
        ></IconButton>
        <div className="lg:w-2"></div>
        <IconButton
          src={alignIcon}
          alt="Format"
          width="24px"
          height="24px"
        ></IconButton>

        <div className="lg:w-2"></div>
        <IconButton src={downloadIcon} alt="Download File"></IconButton>
      </div>
    </nav>
  );
};
export default CodeWindowMenuBar;
