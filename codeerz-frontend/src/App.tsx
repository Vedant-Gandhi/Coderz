import React from "react";
import html5Icon from "./assets/icons/html5.png";
import "./App.css";
import IconButton from "./Components/IconButton/IconButton";
import BrowserWindow from "./Components/BrowserWindow/BrowserWindow";
import CodeWindow from "./Components/CodeWindow/CodeWindow";
import EditorPage from "./Pages/EditorPage";

function App() {
  return (
    <div className="App">
     <EditorPage></EditorPage>
    </div>
  );
}

export default App;
