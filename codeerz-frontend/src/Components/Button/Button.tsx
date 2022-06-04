interface ButtonProps {
  children?: any;
  text?: string;
  size?: ButtonSize;
  highcolorHoverChange?: boolean;
}
export enum ButtonSize {
  sm = "sm",
  md = "md",
}

function Button({
  children,
  text,
  size = ButtonSize.sm,
  highcolorHoverChange = false,
}: ButtonProps): JSX.Element {
  return (
    <button
      className={` bg-sky-500  rounded text-white text-sm font-semibold font-sans select-none bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-400 hover:to-blue-400 
      ${size === ButtonSize.sm && "lg:px-8 lg:py-2"}
      ${size === ButtonSize.md && "lg:px-11 lg:py-4 text-base"} 
      ${
        highcolorHoverChange &&
        " transition-all duration-500 hover:from-green-400 hover:to-green-500"
      }`}
    >
      {children || text}
    </button>
  );
}
export default Button;
