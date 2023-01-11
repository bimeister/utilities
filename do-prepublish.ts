import { env } from 'process';
import { copyFile, mkdir, readFile, writeFile } from 'fs/promises';
import { isEmpty, isNil } from '@bimeister/utilities.common';
import { existsSync } from 'fs';

const GIT_COMMIT_HASH: string | undefined = env.GIT_COMMIT_HASH;
const CURRENT_LOCATION: string = `${__dirname}`;

function createDistFolder(): Promise<string | undefined> {
  return mkdir('./dist', { recursive: true });
}

async function createPackageJson(): Promise<void> {
  const packageJsonPath: string = 'dist/package.json';
  const targetPackageJsonPath: string = `${CURRENT_LOCATION}/${packageJsonPath}`;

  if (!existsSync(targetPackageJsonPath)) {
    throw new Error(`Looks like you forgot run build first. Path ${targetPackageJsonPath} does not exist.`);
  }

  const currentContent: object = await readFile(targetPackageJsonPath, 'utf-8').then((content: string) =>
    Boolean(isEmpty(content)) ? {} : JSON.parse(content)
  );
  const currentContentEntries: [string, unknown][] = Object.entries(currentContent);

  const contentValueByKey: Map<string, unknown> = new Map<string, unknown>(
    currentContentEntries.map(([key, value]: [string, unknown]) => [key, value])
  );

  const currentProperVersion: unknown = contentValueByKey.get('version');

  if (typeof currentProperVersion !== 'string') {
    throw new Error('Package.json version is not a string');
  }

  const updatedProperVersion: string = isNil(GIT_COMMIT_HASH)
    ? currentProperVersion
    : `${currentProperVersion}-${GIT_COMMIT_HASH.slice(0, 8)}`;
  contentValueByKey.set('version', updatedProperVersion);

  const updatedContent: object = Object.fromEntries(contentValueByKey.entries());

  return writeFile(targetPackageJsonPath, JSON.stringify(updatedContent));
}

Promise.resolve()
  .then(() => createDistFolder())
  .then(() => copyFile('./.npmignore', './dist/.npmignore'))
  .then(() => copyFile('./README.md', './dist/README.md'))
  .then(() => copyFile('./LICENSE.md', './dist/LICENSE.md'))
  .then(() => createPackageJson())
  .catch((error: unknown) => console.warn(error));
