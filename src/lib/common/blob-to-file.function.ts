export const blobToFile: (binary: Blob, fileName: string) => File = (binary: Blob, fileName: string): File => {
  const resultFile: any = binary;
  resultFile.name = fileName;
  resultFile.lastModifiedDate = new Date();
  return resultFile as File;
};
