import { readFileSync, writeFileSync } from 'fs';
import { TaskFunction } from 'gulp';
import { cwd } from 'process';

import { copyFolderWithFiles } from './../src/lib/filesystem/copy-folder-with-files.function';
import { deleteFolderWithFiles } from './../src/lib/filesystem/delete-folder-with-files.function';

const currentPath: string = cwd();
const deployFolderPath: string = `${currentPath}/deploy`;
const distFolderPath: string = `${currentPath}/dist`;

export const prepareDeployFolder: TaskFunction = (done: Function): void => {
  deleteFolderWithFiles(deployFolderPath);

  copyFolderWithFiles(distFolderPath, deployFolderPath);
  copyFolderWithFiles(currentPath, deployFolderPath, {
    fileMatchPattern: new RegExp(/LICENSE$/, 'i')
  });

  const packageJsonContent: object = getPackageJsonContent();
  const serializedPackageJsonContent: string = JSON.stringify(packageJsonContent);
  writeFileSync('deploy/package.json', serializedPackageJsonContent);

  done();
};

function getPackageJsonContent(): object {
  const rawData: string = readFileSync('package.json', 'utf-8');
  const packageJsonContent: object = JSON.parse(rawData);

  const keysToExclude: Set<string> = new Set<string>(['scripts']);
  const contentEntries: [string, any][] = Object.entries(packageJsonContent);
  const filteredContentEntries: [string, any][] = contentEntries.filter(
    ([key, _value]: [string, any]) => !keysToExclude.has(key)
  );
  const modifiedContentEntries: [string, any][] = [...filteredContentEntries, ['main', 'index.js']];
  return Object.fromEntries(modifiedContentEntries);
}
