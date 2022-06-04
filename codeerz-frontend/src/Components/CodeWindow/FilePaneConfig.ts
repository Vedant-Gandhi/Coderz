enum fileTypes {
  text,
  image,
}
interface FileHolderFormat {
  file: File;
  extension: string;
  id: string;
  type: fileTypes;
  icon?: any;
}

export { type FileHolderFormat, fileTypes };
