import * as React from "react";

import BrowserMenuBar from "./BrowserMenuBar";

interface BrowserWindowProps {
  htmlCode?: string;
  cssCode?: string;
  jsCode?: string;
}

const BrowserWindow: React.FC<BrowserWindowProps> = ({
  htmlCode,
  cssCode,
  jsCode,
}) => {
  const [refreshCounter, updaterefreshCounter] = React.useState(0);
  const [iframeRef, updateIframeRef] = React.useState(
    null as unknown as HTMLIFrameElement | null
  );
  React.useEffect(() => {
    if(!htmlCode)
    {
      let newDom = generateNewDOM(htmlCode, cssCode || " ", jsCode || " ");
      if (iframeRef) {
        iframeRef!.contentDocument!.documentElement!.innerHTML =
          newDom.documentElement.innerHTML;
      }
    }
  }, [iframeRef]);
  React.useEffect(() => {
    let newDom = generateNewDOM(htmlCode, cssCode || " ", jsCode || " ");
    if (iframeRef) {
      iframeRef!.contentDocument!.documentElement!.innerHTML =
        newDom.documentElement.innerHTML;
    }
  }, [htmlCode]);

  React.useEffect(() => {

    if (iframeRef) {
      iframeRef!.contentDocument!.getElementById("customcss")!.innerHTML =
        cssCode || "";
    }
  }, [cssCode]);

  React.useEffect(() => {
    if (iframeRef) {
      iframeRef!.contentDocument!.getElementById("customjs")!.innerHTML =
        jsCode || "";
    }
  }, [jsCode]);

  return (
    <section className="h-screen grid grid-rows-[auto_1fr] ">
      <BrowserMenuBar
        onRefresh={() => {
          updaterefreshCounter(refreshCounter + 1);
        }}
      ></BrowserMenuBar>
      <iframe
        ref={(data) => {
          updateIframeRef(data);
        }}
        key={refreshCounter}
        title="Reload Window"
        className="border-0 w-full h-full overflow-auto box-border"
      ></iframe>
    </section>
  );
};
export default BrowserWindow;
const generateNewDOM = (
  htmlCode?: string,
  cssCode?: string,
  jsCode?: string
) => {
  const parser = new DOMParser().parseFromString(htmlCode || "", "text/html");

  if (cssCode) {
    let styleNode = parser.createElement("style");
    styleNode.innerHTML = cssCode;
    styleNode.id = "customcss";
    parser.head.appendChild(styleNode);
  }
  if (jsCode) {
    let scriptNode = parser.createElement("script");
    scriptNode.innerHTML = jsCode;
    scriptNode.id = "customjs";
    parser.head.appendChild(scriptNode);
  }
  return parser;
};
