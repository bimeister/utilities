import type { PackageJson } from '@npm/types';
import { isNil } from '@workspaces/common';
import { readFile, writeFile } from 'fs/promises';

interface PackageJsonBuilderOptions {
  currentPackageJsonPath: string;
  targetPackageJsonPath: string;
  override?: Partial<PackageJson> & Record<string, unknown>;
}

export async function buildPackageJson(options: PackageJsonBuilderOptions): Promise<void> {
  const { currentPackageJsonPath, targetPackageJsonPath, override }: PackageJsonBuilderOptions = options;

  const currentPackageJson: PackageJson = await readFile(currentPackageJsonPath, { encoding: 'utf8' }).then(
    (fileContent: string) => {
      const fileContentObject: PackageJson = JSON.parse(fileContent);
      return Promise.resolve(fileContentObject);
    }
  );

  const dataEntriesToKeep: Map<string, unknown> = new Map<string, unknown>();
  const fieldsBlacklist: Set<string> = new Set<string>(['devDependencies', 'scripts']);
  Object.entries(currentPackageJson).forEach(([key, value]: [string, unknown]) => {
    if (fieldsBlacklist.has(key)) {
      return;
    }

    dataEntriesToKeep.set(key, value);
  });

  const resultEntriesIterator: IterableIterator<[string, unknown]> = dataEntriesToKeep.entries();
  const targetPackageJsonContent: Partial<PackageJson> = Object.fromEntries(resultEntriesIterator);

  const overWrittenContent: Partial<PackageJson> =
    isNil(override) || typeof override !== 'object'
      ? targetPackageJsonContent
      : { ...targetPackageJsonContent, ...override };

  return writeFile(targetPackageJsonPath, JSON.stringify(overWrittenContent));
}
