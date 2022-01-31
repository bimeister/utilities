import { getSubstringBetween } from '@bimeister/utilities.common';
import type { SourceFileData } from '../interfaces';

export function getGroupedSourceFileDataByPackageName(sourceFilePaths: string[]): Map<string, SourceFileData[]> {
  const sourceFilesDataByPackageName: Map<string, SourceFileData[]> = new Map<string, SourceFileData[]>();

  sourceFilePaths
    .map((filePath: string) => {
      const packageName: string | undefined = getSubstringBetween(filePath, {
        dropLeftPattern: new RegExp(/\/packages\//gm),
        dropRightPattern: new RegExp(/\/src\/.*\.ts$/gm)
      });
      if (packageName === undefined) {
        return null;
      }

      const filePathFromPackageSrc: string | undefined = getSubstringBetween(filePath, {
        dropLeftPattern: new RegExp(/^.*\/packages\/[\w-]*\/src/gm)
      });
      if (filePathFromPackageSrc === undefined) {
        return null;
      }

      const fileName: string | undefined = getSubstringBetween(filePathFromPackageSrc, {
        dropLeftPattern: new RegExp(/^.*\//),
        dropRightPattern: new RegExp(/\.[\w-]*$/)
      });
      if (fileName === undefined) {
        return null;
      }

      const lastDotPosition: number = filePathFromPackageSrc.lastIndexOf('.');
      const fileExtension: string | undefined = filePathFromPackageSrc.substring(lastDotPosition);
      if (fileExtension === undefined) {
        return null;
      }

      return { filePath, packageName, fileName, filePathFromPackageSrc, fileExtension };
    })
    .filter((mapEntry: SourceFileData | null): mapEntry is SourceFileData => mapEntry !== null)
    .forEach((incomingData: SourceFileData) => {
      const { packageName }: SourceFileData = incomingData;
      const packedIncomingFilesData: SourceFileData[] = [incomingData];
      const existingFilesData: SourceFileData[] | undefined = sourceFilesDataByPackageName.get(packageName);
      const updatedFilesData: SourceFileData[] = Array.isArray(existingFilesData)
        ? existingFilesData.concat(packedIncomingFilesData)
        : packedIncomingFilesData;
      sourceFilesDataByPackageName.set(packageName, updatedFilesData);
    });

  return sourceFilesDataByPackageName;
}
