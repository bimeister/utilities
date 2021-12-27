import { combinePromises } from '@workspaces/common';
import { readdir } from 'fs/promises';
import type { SortedPaths } from './../interfaces/sorted-paths.interface';
import { getSortedPaths } from './get-sorted-paths.function';

export async function getAllNestedDirectoryPaths(directoryPath: string): Promise<string[]> {
  const nestedPaths: string[] = await readdir(directoryPath);
  const sortedPaths: SortedPaths = await getSortedPaths(nestedPaths, directoryPath);

  const { directoryPaths }: SortedPaths = sortedPaths;

  const nextLevelDirectoryPaths: Promise<string[]>[] = directoryPaths.map(
    async (path: string) => await getAllNestedDirectoryPaths(path)
  );

  const nestedLevelsDirectoryPaths: Promise<string[][]> = combinePromises(await nextLevelDirectoryPaths.flat(1));

  return nestedLevelsDirectoryPaths.then((paths: string[][]) => {
    const flattenedNestedPaths: string[] = paths.flat(1);
    return directoryPaths.concat(flattenedNestedPaths);
  });
}
