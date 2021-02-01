import type { TaskFunction } from 'gulp';
import { cwd } from 'process';
import { deleteFolderWithFiles } from './../../src/lib/filesystem/delete-folder-with-files.function';

export const cleanUpDistFolder: TaskFunction = (done: Function): void => {
  const currentPath: string = cwd();
  const distFolderPath: string = `${currentPath}/dist`;

  deleteFolderWithFiles(distFolderPath);
  done();
};
