import React, { useEffect, useState } from "react";

import html5icon from "../../assets/icons/html5.png";
import css3icon from "../../assets/icons/css3.png";
import jsIcon from "../../assets/icons/js.png";
import deleteIcon from "../../assets/icons/delete.svg";
import imageIcon from "../../assets/icons/image-icon.png";
import addFileIcon from "../../assets/icons/add-file.svg"

import { v4 as uuid } from "uuid";

const fileFormats = new Set(["html", "css", "js", "png", "jpg"]);
enum fileTypes {
  text,
  image,
}
const mimeToType: any = {
  "text/html": {
    type: fileTypes.text as fileTypes,
    icon: html5icon,
    extension: "html",
  },
  "text/css": {
    type: fileTypes.text as fileTypes,
    icon: css3icon,
    extension: "css",
  },
  "text/javascript": {
    type: fileTypes.text as fileTypes,
    icon: jsIcon,
    extension: "js",
  },
  "image/png": {
    type: fileTypes.image as fileTypes,
    icon: imageIcon,
    extension: "html",
  },
};

interface FileHolderFormat {
  file: File;
  extension: string;
  id: string;
  type: fileTypes;
  icon?: any;
}

interface FilePaneProps {
  show: boolean;
  children?: any;
  onDirOpen?: Function;
  onFileOpen?: Function;
  onClose?: Function;
}
function FilePane({ show, onClose }: FilePaneProps): JSX.Element {
  const [allFiles, updateallFiles] = useState([] as Array<FileHolderFormat>);
  const [isOpen, updateisOpen] = useState(false);

  const onSelectDirClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    const directoryHandler = await (window as any).showDirectoryPicker();
    let fileArr: Array<FileHolderFormat> = [];

    for await (const [key, value] of directoryHandler.entries()) {
      if (value instanceof FileSystemFileHandle) {
        let extension: string = key.split(".").pop();

        if (fileFormats.has(extension)) {
          const file = await value.getFile();

          let fileData: FileHolderFormat = {
            file: file,
            id: uuid(),
            ...mimeToType[file.type],
          };
          fileArr.push(fileData);
        }
      }
    }
    updateallFiles(fileArr);
    updateisOpen(true);
  };


  return (
    <section
      className={`fixed top-0 left-0 lg:w-[340px] z-[999] bg-gray-600  h-screen transition-all duration-300 overflow-hidden ${
        !show && "lg:w-0"
      }`}
    >
      <div
        className={`p-5 flex flex-col ${
          !isOpen && "justify-center"
        } h-full overflow-x-auto overflow-y-hidden`}
      >
        {isOpen ? (
          <>
            <div className="lg:h-14 text-white font-extrabold flex justify-end lg:px-2">
              <p
                className="hover:bg-gray-500 w-fit h-fit rounded-full lg:w-8 lg:h-8  flex items-center justify-center cursor-pointer select-none"
                onClick={(e) => {
                  if (typeof onClose === "function") {
                    onClose();
                  }
                }}
              >
                X
              </p>
            </div>
            <ul>
              {allFiles.map((value) => (
                <FilePaneEntry
                  id={value.id}
                  key={value.id}
                  name={value.file.name}
                  icon={value.icon}
                  onDelete={() => {}}
                ></FilePaneEntry>
              ))}
            </ul>
          </>
        ) : (
          <>
            <button
              className=" p-2 rounded-full text-sm text-gray-400 bg-blue-500 w-fit mx-auto mb-4"
              onClick={onSelectDirClick}
            >
              <img src={addFileIcon} className='w-14 p-2' alt="Click to Open a Directory"></img>
            </button>
            <p className=" p-2 rounded text-sm text-gray-400 text-center">
              Open a directory and store files directly on your device.
            </p>
          </>
        )}
      </div>
    </section>
  );
}

interface FilePaneEntryProps {
  children?: any;
  name: string;
  icon?: any;
  id: string | number;
  onDelete: Function;
}
function FilePaneEntry({ name, id, icon }: FilePaneEntryProps): JSX.Element {
  return (
    <li className="w-full px-2 py-1 my-2 rounded-sm list-none text-sm text-gray-300 flex items-center hover:bg-gray-500 transition-all duration-150">
      {icon && <img src={icon} alt="File Icon" className="w-4 mr-2" />}
      <p className="select-none">{name}</p>
      <div className="flex items-center ml-auto ">
        <img
          src={deleteIcon}
          alt="Delete File"
          className=" w-6 h-6 p-1 cursor-pointer "
        />
      </div>
    </li>
  );
}
export default FilePane;
