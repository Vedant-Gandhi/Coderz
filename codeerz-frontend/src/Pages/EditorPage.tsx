import * as React from "react";
import BrowserWindow from "../Components/BrowserWindow/BrowserWindow";
import CodeWindow from "../Components/CodeWindow/CodeWindow";
import {
  codeEditorLanguages,
  languageConfig,
} from "../Components/CodeWindow/CodeWindowConfig";

import debounce from "lodash.debounce";

const EditorPage: React.FC<any> = () => {
  const [htmlCode, updateHTMLCode] = React.useState("");
  const [cssCode, updatecssCode] = React.useState("");
  const [jsCode, updatejsCode] = React.useState("");

  const cssDebounced = React.useCallback(
    debounce((value) => updatecssCode(value), 500),
    []
  );

  const htmlDebounced = React.useCallback(
    debounce((value) => updateHTMLCode(value), 500),
    []
  );

  const jsDebounced = React.useCallback(
    debounce((value) => updatejsCode(value), 1000),
    []
  );
  const onCodeChange = (code: string, value?: languageConfig) => {
    if (value?.name === codeEditorLanguages.HTML.name) {
      htmlDebounced(code);
      return;
    }
    if (value?.name === codeEditorLanguages.CSS.name) {
      cssDebounced(code);
      return;
    }
    if (value?.name === codeEditorLanguages.JAVACRIPT.name) {
      jsDebounced(code);
      return;
    }
  };
  return (
    <section className="grid grid-cols-[68%_32%]">
      <div>
        <CodeWindow onChange={onCodeChange}></CodeWindow>
      </div>
      <div>
        <BrowserWindow
          htmlCode={htmlCode}
          cssCode={cssCode}
          jsCode={jsCode}
        ></BrowserWindow>
      </div>
    </section>
  );
};
export default EditorPage;
