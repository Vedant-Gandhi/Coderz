import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routeconfig";
import { createorUpdateUser } from "../../Server/Server";

const SignUpRedirect = (): JSX.Element => {
  const nav = useNavigate();

  useEffect(() => {
    onAuthStateChanged(
      getAuth(),
      (user) => {
        if (user) {
          createorUpdateUser({ userId: user?.uid })
            .then(() => {
              console.log("Create Promise resolved");
              nav(routes.subrouter.EDITOR.primary, {
                replace: true,
              });
            })
            .catch((error) => {
              console.error(error);
            }).finally(()=>{
              console.log("on finally")
            });
        } else {
          console.log("No user present");
        }
      },
      (error) => {
        console.error(error);
        nav("/auth/signup", { replace: true });
      }
    );
  }, []);
  return <h1>Redirecting to editor.....</h1>;
};
export default SignUpRedirect;
