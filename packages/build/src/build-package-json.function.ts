import type { PackageJson } from '@npm/types';
import { isNil } from '@workspaces/common';
import { readFile, writeFile } from 'fs/promises';

interface PackageJsonBuilderOptions {
  currentPackageJsonPath: string;
  targetPackageJsonPath: string;
  override?: Partial<PackageJson> & Record<string, unknown>;
}

export function buildPackageJson(options: PackageJsonBuilderOptions): Promise<void> {
  const { currentPackageJsonPath, targetPackageJsonPath, override }: PackageJsonBuilderOptions = options;

  const currentPackageJson: Promise<PackageJson> = readFile(currentPackageJsonPath, { encoding: 'utf8' }).then(
    (fileContent: string) => {
      const fileContentObject: PackageJson = JSON.parse(fileContent);
      return Promise.resolve(fileContentObject);
    }
  );

  const targetPackageJsonContent: Promise<Partial<PackageJson>> = currentPackageJson.then(
    (packageJsonData: PackageJson) => {
      const dataEntriesToKeep: Map<string, unknown> = new Map<string, unknown>();

      const fieldsBlacklist: Set<string> = new Set<string>(['devDependencies', 'scripts']);
      Object.entries(packageJsonData).forEach(([key, value]: [string, unknown]) => {
        if (fieldsBlacklist.has(key)) {
          return;
        }

        dataEntriesToKeep.set(key, value);
      });

      const resultEntriesIterator: IterableIterator<[string, unknown]> = dataEntriesToKeep.entries();
      return Object.fromEntries(resultEntriesIterator);
    }
  );

  return targetPackageJsonContent
    .then((resultObject: Partial<PackageJson>) => {
      if (isNil(override) || typeof override !== 'object') {
        return JSON.stringify(resultObject);
      }

      return JSON.stringify({ ...resultObject, ...override });
    })
    .then((content: string) => writeFile(targetPackageJsonPath, content));
}
