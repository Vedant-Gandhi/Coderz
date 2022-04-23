import { FC } from "react";
interface IconButtonProps {
  src: string;
  alt?: string;
  onClick?: Function;
  width?: string;
  height?: string;
}

const IconButton: FC<IconButtonProps> = (props) => {
  return (
    <button
      className={`p-3 flex items-center border-2 border-transparent rounded-full transition-colors hover:bg-slate-500 min-w-[24px] min-h-24px`}
      onClick={(e) => {
        if (props.onClick) props.onClick(e);
      }}
    >
      <img
        src={props.src}
        alt={props.alt}
        width={props.width || "20px"}
        height={props.height || "20px"}
      />
    </button>
  );
};
export default IconButton;
