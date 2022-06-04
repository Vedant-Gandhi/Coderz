import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, inMemoryPersistence, setPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCczFJIM93Eeqvyrd0_YPk_Jq3TRCnjUWk",
  authDomain: "codeerz.firebaseapp.com",
  projectId: "codeerz",
  storageBucket: "codeerz.appspot.com",
  messagingSenderId: "118195291253",
  appId: "1:118195291253:web:c50673780f8f6c6cc7243c"
};
if (getApps().length === 0) {
  initializeApp(firebaseConfig);
  console.log("Initialized app")
}
setPersistence(getAuth(getApp()), inMemoryPersistence)
  .then(() => {
    console.log("Local persistence enabled.");
  })
  .catch((error) => {
    console.error(error);
  });

const firebaseCodetoMessage: any = {
  "auth/user-not-found": "User not found.",
  "auth/wrong-password": "Invalid Password",
};
export { firebaseConfig, firebaseCodetoMessage };
