import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogInRedirect = (): JSX.Element => {
  const nav = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      getAuth(),
      () => {
        nav("/editor", { replace: true });
      },
      (error) => {
        console.error(error);
        nav("/auth/login", { replace: true });
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);
  return <></>;
};
export default LogInRedirect;
