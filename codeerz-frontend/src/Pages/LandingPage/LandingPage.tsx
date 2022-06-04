import { Link } from "react-router-dom";
import Button, { ButtonSize } from "../../Components/Button/Button";

import CodeWindow from "../../Components/CodeWindow/CodeWindow";

const LandingPage = (): JSX.Element => {
  return (
    <div className="h-screen w-full overflow-auto bg-zinc-900 ">
      <nav className=" pz-2 py-4 bg-zinc-900 flex w-full items-center shadow-none border-b border-b-slate-700 ">
        <div className="flex ml-auto">
          <Link to="/auth/login" className="mx-4">
            <button className="px-5  py-2 rounded text-slate-200 text-sm  font-sans select-none hover:text-white">
              Log In
            </button>
          </Link>
          <Link to="/auth/signup" className="mx-4">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </nav>
      <section className="flex p-8">
        <div className="lg:w-1/2 flex items-center justify-center flex-col">
          <h1 className="text-5xl font-serif w-3/4  text-white font-medium ">
            The future of development right in your browser
          </h1>
          <Link to="/auth/signup" className="mx-4 my-8">
            <Button size={ButtonSize.md} highcolorHoverChange>
              Get Started
            </Button>
          </Link>
        </div>
        <div className="px-10 py-10 h-[80vh] overflow-hidden bg-slate-800 lg:w-1/2 rounded-lg">
          <CodeWindow staticHTMLCode="<h1>A cool developer has arrived...........</h1> "></CodeWindow>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
