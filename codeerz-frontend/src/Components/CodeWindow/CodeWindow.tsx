import * as React from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/addon/hint/show-hint.css";
import CodeWindowMenuBar from "./CodeWindowMenuBar";
import { codeEditorLanguages, LanguageTab } from "./CodeWindowConfig";

import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag";

import html5icon from "../../assets/icons/html5.png";
import css3icon from "../../assets/icons/css3.png";
import jsIcon from "../../assets/icons/js.png";
import FilePane from "./FilePane";

require("codemirror/mode/htmlmixed/htmlmixed");
require("codemirror/mode/javascript/javascript");
require("codemirror/mode/xml/xml");

//Hint
require("codemirror/addon/hint/show-hint");
require("codemirror/addon/hint/html-hint");
require("codemirror/addon/hint/javascript-hint");

//Linting and closed brackets

require("codemirror/addon/fold/xml-fold");
require("codemirror/addon/lint/lint");

interface CodeWindowProps {
  onChange?: Function;
  disableMenuBar?: boolean;
}
var tabData: any = {};
const CodeWindow: React.FC<CodeWindowProps> = ({
  onChange,
  disableMenuBar = false,
}) => {
  //Stores the state of file Pane
  const [isPaneOpen, updatePaneOpen] = React.useState(false);

  //Store the codemirror editor once it mounts
  const [codeMirrorEditor, updatecodeMirrorEditor] = React.useState(
    null as any
  );

  //Stores if currently opened are directory files or plain editors
  const [isDirectory, updateisDirectory] = React.useState(false);

  //Store the total open tabs
  const [tabs, updateTabs] = React.useState([] as Array<LanguageTab>);

  //Stores the currently open tab
  const [selectedTab, updateselectedTab] = React.useState(
    null as unknown as null | LanguageTab
  );

  //When the selected tab changes it updates the current code value in our tab code storage
  React.useEffect(() => {
    if (selectedTab && codeMirrorEditor) {
      codeMirrorEditor.setValue(tabData[selectedTab.key] || "");
    }
  }, [codeMirrorEditor, selectedTab]);

  //Determines what are the tabs to be set based on the decision if a directory is open or not
  React.useEffect(() => {
    if (!isDirectory) {
      updateTabs((() => Object.values(defaultTabs).map((value) => value))());
    }
  }, [isDirectory]);

  React.useEffect(() => {
    if (tabs.length > 0) {
      updateselectedTab(tabs[0]);
    }
  }, [tabs]);

  const openFilePane = () => {
    updatePaneOpen(true);
  };
  const closeFilePane = () => {
    updatePaneOpen(false);
  };

  return (
    <>
      <FilePane show={isPaneOpen} onClose={closeFilePane}></FilePane>
      <section
        className={`h-screen ${
          !disableMenuBar && " grid grid-rows-[auto_1fr]"
        }`}
      >
        {!disableMenuBar && (
          <CodeWindowMenuBar
            tabs={tabs}
            onTabClick={(tab_: LanguageTab) => {
              if (selectedTab) {
                tabData[selectedTab.key] = codeMirrorEditor?.getValue() || "";
              }
              updateselectedTab(tab_ || null);
            }}
            onMenuClick={openFilePane}
          ></CodeWindowMenuBar>
        )}
        <div className="bg-gray-800 border-0 w-full h-full overflow-x-auto box-border grid ">
          <CodeMirror
            editorDidMount={(codeEditor) => {
              updatecodeMirrorEditor(codeEditor);
            }}
            className="w-full h-full font-medium "
            value={tabData?.[selectedTab?.key || ""] || ""}
            options={{
              mode: selectedTab?.config.mode,
              name: selectedTab?.config.name,
              theme: "material",
              lineWrapping: true,
              smartIndent: true,
              lineNumbers: true,
              foldGutter: true,
              autoCloseTags: true,
              autoCloseBrackets: true,
              autoRefresh: true,
              extraKeys: { "Ctrl-Space": "autocomplete" },
            }}
            onChange={(editor, data, value) => {
              if (typeof onChange == "function") {
                onChange(value, selectedTab?.config);
              }
            }}
          ></CodeMirror>
        </div>
      </section>
    </>
  );
};
export default CodeWindow;
const defaultTabs = {
  PRIMARY_HTML: {
    key: "primary_html_index",
    tabName: "index.html",
    config: codeEditorLanguages.HTML,
  },
  PRIMARY_CSS: {
    key: "primary_css_index",
    tabName: "index.css",
    config: codeEditorLanguages.CSS,
  },
  PRIMARY_JS: {
    key: "primary_script_index",
    tabName: "script.js",
    config: codeEditorLanguages.JAVACRIPT,
  },
};
