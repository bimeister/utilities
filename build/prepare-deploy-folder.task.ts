import { readFileSync, writeFileSync } from 'fs';
import { TaskFunction } from 'gulp';
import { cwd } from 'process';

import { copyFolderWithFiles } from './../src/lib/filesystem/copy-folder-with-files.function';
import { deleteFolderWithFiles } from './../src/lib/filesystem/delete-folder-with-files.function';

export const prepareDeployFolder: TaskFunction = (done: Function): void => {
  const currentPath: string = cwd();
  const deployFolderPath: string = `${currentPath}/deploy`;
  const distFolderPath: string = `${currentPath}/dist`;

  deleteFolderWithFiles(deployFolderPath);
  copyFolderWithFiles(distFolderPath, deployFolderPath);
  copyFolderWithFiles(currentPath, deployFolderPath, {
    fileMatchPattern: new RegExp(/LICENSE$/, 'i')
  });
  addPackageJson();
  done();
};

function addPackageJson(): void {
  const packageJsonContent: string = JSON.stringify(getPackageJsonContent());
  writeFileSync('deploy/package.json', packageJsonContent);
}

function getPackageJsonContent(): object {
  const rawData: string = readFileSync('package.json', 'utf-8');
  const packageJsonContent: object = JSON.parse(rawData);

  const keysToExclude: Set<string> = new Set<string>(['scripts', 'devDependencies']);
  const contentEntries: [string, any][] = Object.entries(packageJsonContent);
  const filteredContentEntries: [string, any][] = contentEntries.filter(
    ([key, _value]: [string, any]) => !keysToExclude.has(key)
  );
  const modifiedContentEntries: [string, any][] = [...filteredContentEntries, ['main', 'index.js']];
  return Object.fromEntries(modifiedContentEntries);
}
