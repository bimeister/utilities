export const fileListToArray: (fileList: FileList) => File[] = (fileList: FileList): File[] => {
  if (Object.is(fileList.length, 0)) {
    return [];
  }
  return new Array(fileList.length).fill(null).map((_, index: number) => fileList.item(index));
};
