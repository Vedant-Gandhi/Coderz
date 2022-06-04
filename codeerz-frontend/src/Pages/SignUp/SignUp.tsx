import "firebase/compat/auth";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getApp } from "firebase/app";
import { useState } from "react";
import { firebaseCodetoMessage } from "../../Firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import googleIcon from "../../assets/icons/google-logo.png";
import IconButton from "../../Components/IconButton/IconButton";
import { routes } from "../../routeconfig";

const SignUp = (): JSX.Element => {
  const nav = useNavigate();
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");
  const [error, updateError] = useState("");

  //To create a new user and navigate
  const onEmailPasswordSubmit = (e: any) => {
    e.preventDefault();
    if (!email || !password) {
      updateError(!email ? "Invalid Email" : "Invalid Password");
      return;
    }
    const auth = getAuth(getApp());
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        nav(
          routes.subrouter.AUTH.subrouter.SIGNUP.subrouter.REDIRECT_TO_SIGNUP
            .primary
        );
      })
      .catch((error) => {
        console.error(error);
        alert(firebaseCodetoMessage[error.code]);
      });
  };
  const onGoogleSubmit = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(getApp());
    auth.useDeviceLanguage();

    await signInWithPopup(auth, provider).catch((error) => {
      console.error(error);
    });
    nav(
      routes.subrouter.AUTH.subrouter.SIGNUP.subrouter.REDIRECT_TO_SIGNUP
        .primary
    );
  };
  return (
    <div className=" h-screen w-full bg-zinc-900">
      <h1 className="text-center pt-12 text-4xl text-white  font-medium">
        SignUp
      </h1>
      <div className="w-1/2 bg-red-200 m-auto mt-20 h-1/2 grid grid-cols-2 rounded-lg overflow-hidden">
        <section className="h-full bg-zinc-800 flex items-center flex-col justify-center border-r border-r-gray-700">
          <p className="mb-8 text-2xl font-medium text-white">
            Email + Password
          </p>
          <form
            className="w-3/4 flex items-center flex-col justify-center"
            onSubmit={onEmailPasswordSubmit}
          >
            <input
              type={"email"}
              placeholder="Email"
              className="mb-5 px-5 py-2 outline-none rounded bg-zinc-700 w-full text-gray-300 "
              value={email}
              onChange={(e) => {
                updateEmail(e.target.value);
              }}
            ></input>

            <input
              type={"password"}
              placeholder="Password"
              className="mb-5 px-5 py-2 outline-none rounded bg-zinc-700 w-full text-gray-300 "
              value={password}
              onChange={(e) => {
                updatePassword(e.target.value);
              }}
            ></input>

            <input
              type={"submit"}
              value="SignUp"
              className="px-8 bg-sky-500 hover:bg-sky-400 transition-all duration-150 py-2 rounded text-white text-sm font-semibold font-sans select-none ml-auto cursor-pointer"
            ></input>
          </form>
        </section>
        <section className="h-full bg-zinc-800 flex items-center flex-col justify-center border-r border-r-gray-700">
          <p className="mb-8 text-2xl font-medium text-white">
            Fast Authentication
          </p>
          <div className="bg-zinc-600 rounded-full">
            <IconButton
              src={googleIcon}
              alt="Login With Google"
              width="32px"
              onClick={onGoogleSubmit}
            ></IconButton>
          </div>
          <div></div>
        </section>
      </div>
    </div>
  );
};
export default SignUp;
