export const blobToFile: (binary: Blob, fileName: string) => File = (binary: Blob, fileName: string): File => {
  return new File([binary], fileName, {
    type: binary.type
  });
};
