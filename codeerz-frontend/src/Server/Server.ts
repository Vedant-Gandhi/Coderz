import axios from "axios";
import { getAuth } from "firebase/auth";
import { doc, setDoc, getFirestore, getDoc, updateDoc } from "firebase/firestore";

interface createUserParams {
  userId: string;
  jsCode?: string;
  htmlCode?: string;
  cssCode?: string;
}
const createorUpdateUser = async (params: createUserParams) => {
  const codeRef = doc(getFirestore(), "codes", params.userId);
  console.log("Inside create or update user");
  console.log(params);
  return setDoc(codeRef, {
    jsCode: params.jsCode || "",
    htmlCode: params.htmlCode || "",
    cssCode: params.cssCode || "",
  });
};
const updateCode = (params: createUserParams) => {
  const codeRef = doc(getFirestore(), "codes", params.userId);
  let sendData: any = {};
  if (params.cssCode) sendData.cssCode = params.cssCode;
  if (params.htmlCode) sendData.htmlCode = params.htmlCode;
  if (params.jsCode) sendData.jsCode = params.jsCode;
  return updateDoc(codeRef, sendData);
};

const getCodes = async (userId: string) => {
  const codeRef = doc(getFirestore(), "codes", userId);

  const data = await getDoc(codeRef);
  if (data.exists()) {
    return data.data();
  }
  return {
    jsCode: "",
    cssCode: "",
    htmlCode: "",
  };
};
export { createorUpdateUser, getCodes, updateCode };
