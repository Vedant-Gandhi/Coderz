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
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const onIframeLoad = () => {
    if (iframeRef.current !== null) {
      let newDom = generateNewDOM(
        htmlCode || "",
        cssCode || " ",
        jsCode || " "
      );

      iframeRef!.current!.contentDocument!.documentElement!.innerHTML =
        newDom.documentElement.innerHTML;
    }
  };
  React.useEffect(() => {
    onIframeLoad();
  }, [iframeRef]);

  React.useEffect(() => {
    let newDom = generateNewDOM(htmlCode, cssCode || " ", jsCode || " ");
    if (iframeRef.current !== null) {
      iframeRef!.current!.contentDocument!.documentElement!.innerHTML =
        newDom.documentElement.innerHTML;
    }
  }, [htmlCode]);

  React.useEffect(() => {
    if (iframeRef !== null) {
      iframeRef!.current!.contentDocument!.getElementById(
        "customcss"
      )!.innerHTML = cssCode || "";
    }
  }, [cssCode]);

  React.useEffect(() => {
    if (iframeRef.current !== null) {
      let newScript =
        iframeRef!.current!.contentDocument!.createElement("script");
      newScript.text = jsCode || "";
      newScript.id="customjs"

      let currentScript =
        iframeRef!.current!.contentDocument!.getElementById("customjs");

      if (currentScript != null) {
        iframeRef!.current!.contentDocument!.body!.removeChild(currentScript);
      } 
       iframeRef!.current!.contentDocument!.body!.appendChild(newScript);
    }
  }, [jsCode]);
  return (
    <section className="h-screen grid grid-rows-[auto_1fr] ">
      <BrowserMenuBar
        onRefresh={() => {
          if (iframeRef.current !== null) {
            iframeRef.current.contentWindow?.location.reload();
          }
        }}
      ></BrowserMenuBar>
      <iframe
        ref={iframeRef}
        title="Reload Window"
        className="border-0 w-full h-full overflow-auto box-border"
        onLoad={onIframeLoad}
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
    parser.body.appendChild(scriptNode);
  }
  return parser;
};
