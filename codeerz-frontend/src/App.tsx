import "./App.css";

import EditorPage from "./Pages/EditorPage/EditorPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import SignUp from "./Pages/SignUp/SignUp";
import SignUpRedirect from "./Pages/AuthRedirect/SignUpRedirect";
import LogIn from "./Pages/Login/Login";
import LogInRedirect from "./Pages/AuthRedirect/LogInRedirect";
import { routes } from "./routeconfig";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path={routes.primary} caseSensitive element={<LandingPage></LandingPage>}></Route>
          <Route
            path={`${routes.subrouter.AUTH.subrouter.SIGNUP.primary}`}
            caseSensitive
            element={<SignUp></SignUp>}></Route>
          <Route
            path={`${routes.subrouter.AUTH.subrouter.SIGNUP.subrouter.REDIRECT_TO_SIGNUP.primary}`}
            caseSensitive
            element={<SignUpRedirect />}></Route>
          <Route
            path={`${routes.subrouter.AUTH.subrouter.LOGIN.primary}`}
            caseSensitive
            element={<LogIn></LogIn>}></Route>
          <Route
            path={`${routes.subrouter.AUTH.subrouter.LOGIN.subrouter.REDIRECT_TO_LOGIN.primary}`}
            caseSensitive
            element={<LogInRedirect />}></Route>
          <Route path={`${routes.subrouter.EDITOR.primary}`} caseSensitive element={<EditorPage></EditorPage>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
