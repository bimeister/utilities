import { combinePromises } from '@workspaces/common';
import { readdir } from 'fs/promises';
import type { SortedPaths } from './../interfaces/sorted-paths.interface';
import { getSortedPaths } from './get-sorted-paths.function';

export async function getAllNestedFilePaths(directoryPath: string): Promise<string[]> {
  const nestedPaths: string[] = await readdir(directoryPath);
  const sortedPaths: SortedPaths = await getSortedPaths(nestedPaths, directoryPath);

  const { filePaths, directoryPaths }: SortedPaths = sortedPaths;

  const nextLevelFilePaths: Promise<string[]>[] = directoryPaths.map(
    async (path: string) => await getAllNestedFilePaths(path)
  );

  const nestedLevelsFilePaths: Promise<string[][]> = combinePromises(await nextLevelFilePaths.flat(1));

  return nestedLevelsFilePaths.then((paths: string[][]) => {
    const flattenedNestedPaths: string[] = paths.flat(1);
    return filePaths.concat(flattenedNestedPaths);
  });
}
