import * as React from "react";
import IconButton from "../IconButton/IconButton";

import NotesIcon from "../../assets/icons/notes.svg";
import alignIcon from "../../assets/icons/white-format-icon.png";
import logOutIcon from "../../assets/icons/sign-out.svg";
import menuIcon from "../../assets/icons/menu.svg";
import syncIcon from "../../assets/icons/sync.svg";

import { LanguageTab } from "./CodeWindowConfig";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getApp } from "firebase/app";

interface CodeWindowMenuBarProps {
  tabs: Array<LanguageTab>;
  onTabClick?: Function;
  onMenuClick?: Function;
  onCodeFormat?: Function;
  onLogOut?: Function;
  onSync?: Function;
  showLogoutIcon?: boolean;
  showSyncIcon?: boolean;
  showNotesIcon?: boolean;
  showFormatIcon?: boolean;
}

const CodeWindowMenuBar: React.FC<CodeWindowMenuBarProps> = ({
  tabs,
  onTabClick,
  onMenuClick,
  onCodeFormat,
  onLogOut,
  onSync,
  showSyncIcon,
  showNotesIcon,
  showLogoutIcon,
  showFormatIcon,
}) => {
  const [selectedTab, updateSelectedTab] = React.useState(
    null as unknown | string
  );
  const [isAuth, updateisAuth] = React.useState(false);
  React.useEffect(() => {
    if (tabs.length > 0) {
      updateSelectedTab(tabs[0].key);
    }
  }, [tabs]);
  React.useEffect(() => {
    const unsubscribeListener = onAuthStateChanged(
      getAuth(getApp()),
      (user) => {
        console.log(user);

        if (user) {
          console.log(user);
          //Update if user is signed in or not
          updateisAuth(true);
        } else {
          updateisAuth(false);
        }
      },
      (error) => {
        console.error(error);
      }
    );
    //Remove the listener when the component is unmounted
    return () => {
      unsubscribeListener();
    };
  }, []);
  React.useEffect(() => {
    console.log("Is auth : " + isAuth);
  }, [isAuth]);
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
        {false && (
          <>
            <IconButton
              src={NotesIcon}
              alt="Notes"
              width="24px"
              height="24px"
            ></IconButton>
            <div className="lg:w-2"></div>
          </>
        )}
        {showFormatIcon && (
          <IconButton
            src={alignIcon}
            alt="Format"
            width="24px"
            height="24px"
            onClick={(e: any) => {
              if (typeof onCodeFormat === "function") {
                onCodeFormat();
              }
            }}
          ></IconButton>
        )}

        <div className="lg:w-2"></div>
        {isAuth && showSyncIcon && (
          <IconButton
            src={syncIcon}
            onClick={(e: any) => {
              e.preventDefault();
              if (typeof onSync === "function") {
                onSync();
              }
            }}
            alt="Sync File"
          ></IconButton>
        )}
        <div className="lg:w-2"></div>
        {isAuth && showLogoutIcon && (
          <IconButton
            src={logOutIcon}
            onClick={(e: any) => {
              e.preventDefault();
              if (typeof onLogOut === "function") {
                onLogOut();
              }
            }}
            alt="Download File"
          ></IconButton>
        )}
      </div>
    </nav>
  );
};
export default CodeWindowMenuBar;
