import * as React from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/addon/hint/show-hint.css";
import CodeWindowMenuBar from "./CodeWindowMenuBar";
import { codeEditorLanguages, LanguageTab } from "./CodeWindowConfig";

import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag";

import prettier from "prettier/standalone";
import parserHtml from "prettier/parser-html";
import parserCss from "prettier/parser-postcss";
import parserJavascript from "prettier/parser-typescript";
import FilePane from "./FilePane";
import { FileHolderFormat } from "./FilePaneConfig";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getCodes, updateCode } from "../../Server/Server";

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

require("prettier/parser-babel");
require("prettier/parser-html");

interface CodeWindowProps {
  onChange?: Function;
  disableMenuBar?: boolean;
  filepane?: boolean;
  staticHTMLCode?: string;
}
var tabData: any = {};
const CodeWindow: React.FC<CodeWindowProps> = ({
  onChange,
  disableMenuBar = false,
  filepane = false,
  staticHTMLCode,
}) => {
  //Stores the state of file Pane
  const [isPaneOpen, updatePaneOpen] = React.useState(false);

  //Store the codemirror editor once it mounts
  const [codeMirrorEditor, updatecodeMirrorEditor] = React.useState(null as any);

  //Stores if currently opened are directory files or plain editors
  const [isDirectory, updateisDirectory] = React.useState(false);

  const [curDirHandler, updatecurDirHandler] = React.useState(null as null | FileSystemDirectoryHandle);

  //Store the total open tabs
  const [tabs, updateTabs] = React.useState([] as Array<LanguageTab>);

  //Tab Data
  const [tabData, updateTabData] = React.useState({} as any);

  //Stores the currently open tab
  const [selectedTab, updateselectedTab] = React.useState(null as unknown as null | LanguageTab);

  //When the selected tab changes it updates the current code value in our tab code storage
  React.useEffect(() => {
    if (selectedTab && codeMirrorEditor) {
      codeMirrorEditor.setValue(tabData[selectedTab.key] || "");
    }
  }, [codeMirrorEditor, selectedTab]);

  //Determines what are the tabs to be set based on the decision if a directory is open or not
  React.useEffect(() => {
    console.log(isDirectory);

    if (!isDirectory) {
      updateTabs((() => Object.values(defaultTabs).map((value) => value))());
    } else {
      console.log("Dir false");

      updateTabs([]);
      updateselectedTab(null);
    }
  }, [isDirectory]);

  //Set default tab as the first tab
  React.useEffect(() => {
    if (tabs.length > 0) {
      updateselectedTab(tabs[0]);
    }
  }, [tabs]);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      getAuth(),
      async (res) => {
        unsubscribe();
        if (res) {
          let result = await getCodes(res.uid);

          tabData[defaultTabs.PRIMARY_HTML.key] = result.data.html;
          tabData[defaultTabs.PRIMARY_CSS.key] = result.data.css;
          tabData[defaultTabs.PRIMARY_JS.key] = result.data.js;
          updateTabData({ ...tabData });

          updateTabs((() => Object.values(defaultTabs).map((value) => value))());
        } else {
          unsubscribe();
        }
      },
      (error) => {
        console.error(error);
        unsubscribe();
      }
    );
  }, []);

  /**
   * @description Function called when a file is selected for opening in the file pane.
   * @param {FileHolderFormat} data
   */
  const onFilePaneFileOpen = async (data: FileHolderFormat) => {
    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i].key === data.id) {
        updateselectedTab(tabs[i]);
        return;
      }
    }
    const text = await data.file.text();
    const config = (() => {
      switch (data.extension) {
        case "html":
          return codeEditorLanguages.HTML;

        case "css":
          return codeEditorLanguages.CSS;

        case "js":
          return codeEditorLanguages.JAVACRIPT;
        default:
          return null;
      }
    })();
    if (config !== null) {
      let obj: LanguageTab = {
        key: data.id,
        tabName: data.file.name,
        config: config,
      };
      updateTabs([...tabs, obj]);
      tabData[data.id] = text;
      updateTabData({ ...tabData });
      updateselectedTab(obj);
    }
  };

  const openFilePane = () => {
    updatePaneOpen(true);
  };

  const closeFilePane = () => {
    updatePaneOpen(false);
  };

  const onDirStateChange = (result: boolean, dir: FileSystemDirectoryHandle) => {
    updateisDirectory(result);
    updatecurDirHandler(dir);
  };

  const onCodeFormat = () => {
    if (selectedTab) {
      let currentCode = tabData[selectedTab?.key];


      let newCode = prettier.format(currentCode, {
        parser: selectedTab.config.name === "javascript" ? "typescript" : selectedTab.config.name,
        plugins: [parserHtml, parserCss, parserJavascript],
      });
      console.log("New Code");

      codeMirrorEditor?.setValue(newCode);
    }
  };

  const onFileDelete = async (fileName: string) => {
    try {
      if (curDirHandler instanceof FileSystemDirectoryHandle) {
        await curDirHandler.removeEntry(fileName, {
          recursive: true,
        });
        return Promise.resolve(true);
      }
      return Promise.resolve(false);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const onLogOut = async () => {
    try {
      await signOut(getAuth());
    } catch (error) {
      alert(error);
    }
  };
  const onSync = async () => {
    if (!isDirectory && selectedTab) {
      try {
        const user = getAuth().currentUser;
        if (user) {
          let data: any = {};
          tabs.forEach((value) => {
            switch (value.config.name) {
              case codeEditorLanguages.HTML.name:
                data.htmlCode = tabData[value.key];
                break;
              case codeEditorLanguages.CSS.name:
                data.cssCode = tabData[value.key];
                break;
              case codeEditorLanguages.JAVACRIPT.name:
                data.jsCode = tabData[value.key];
                break;
            }
          });
          await updateCode({ userId: user.uid, ...data });
          alert("Code updated sucessfully");
        }
      } catch (error) {
        console.error(error);
        alert("An error occured while file synchronization with server.");
      }
    }
  };
  return (
    <>
      {filepane && (
        <FilePane
          show={isPaneOpen}
          onClose={closeFilePane}
          onDirStateChange={onDirStateChange}
          onFileOpen={onFilePaneFileOpen}
          onFileDelete={onFileDelete}></FilePane>
      )}
      <section className={`h-screen ${!disableMenuBar && " grid grid-rows-[auto_1fr]"}`}>
        {!disableMenuBar && (
          <CodeWindowMenuBar
            showFormatIcon
            showSyncIcon={!isDirectory}
            showLogoutIcon={!isDirectory}
            tabs={tabs}
            onTabClick={(tab_: LanguageTab) => {
              if (selectedTab) {
                tabData[selectedTab.key] = codeMirrorEditor?.getValue() || "";
              }
              updateselectedTab(tab_ || null);
            }}
            onMenuClick={openFilePane}
            onCodeFormat={onCodeFormat}
            onLogOut={onLogOut}
            onSync={onSync}></CodeWindowMenuBar>
        )}
        <div className='bg-gray-800 border-0 w-full h-full overflow-x-auto box-border grid '>
          <CodeMirror
            editorDidMount={(codeEditor) => {
              console.log("remounted");
              updatecodeMirrorEditor(codeEditor);
            }}
            className='w-full h-full font-medium '
            value={tabData?.[selectedTab?.key || ""] || ""}
            options={{
              mode: selectedTab?.config.mode,
              name: selectedTab?.config.name,
              theme: "material",
              lineWrapping: true,
              lineNumbers: true,
              foldGutter: true,
              autoCloseTags: true,
              autoCloseBrackets: true,
              autoRefresh: false,
              extraKeys: { "Ctrl-Space": "autocomplete" },
            }}
            onChange={(editor, data, value) => {
              console.log("Value changed");

              if (typeof onChange == "function") {
                if (selectedTab) {
                  tabData[selectedTab.key] = value;
                }
                onChange(value, selectedTab?.config);
              }
            }}></CodeMirror>
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
