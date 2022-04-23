interface languageConfig {
  name: string;
  mode: string;
}


const generateLanguageConfig = (mode: string, name: string): languageConfig => {
  return {
    mode: mode || "",
    name: name || "",
  };
};
enum LanguagesSupported {
  HTML="HTML",
  CSS="CSS",
  JS="JS"
}

const codeEditorLanguages = {
  HTML: generateLanguageConfig("text/html", "html"),
  JAVACRIPT: generateLanguageConfig("javascript", "javascript"),
  CSS: generateLanguageConfig("css", "css"),
};

interface LanguageTab {
  key: number | string;
  tabName: string;
  config: languageConfig;
}

export { codeEditorLanguages,LanguagesSupported, type languageConfig, type LanguageTab };
