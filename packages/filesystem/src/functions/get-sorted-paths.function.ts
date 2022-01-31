import { combinePromises } from '@bimeister/utilities.common';
import type { Stats } from 'fs';
import { lstat } from 'fs/promises';
import type { SortedPaths } from './../interfaces/sorted-paths.interface';

export async function getSortedPaths(paths: string[], directoryPath: string): Promise<SortedPaths> {
  const stats: Promise<Stats>[] = paths.map((path: string) => lstat(`${directoryPath}/${path}`));
  const statsArray: Stats[] = await combinePromises(stats);

  return statsArray.reduce(
    (accumulatedValue: SortedPaths, currentStatsItem: Stats, currentStatsItemIndex: number) => {
      const { filePaths, directoryPaths }: SortedPaths = accumulatedValue;
      const currentStatsItemPath: string = `${directoryPath}/${paths[currentStatsItemIndex]}`;

      if (currentStatsItem.isDirectory()) {
        directoryPaths.push(currentStatsItemPath);
      }

      if (currentStatsItem.isFile()) {
        filePaths.push(currentStatsItemPath);
      }

      return accumulatedValue;
    },
    {
      filePaths: [],
      directoryPaths: []
    }
  );
}
