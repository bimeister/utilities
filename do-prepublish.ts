import { env } from 'process';
import { copyFile, mkdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { isEmpty } from '@bimeister/utilities.common';
import { existsSync } from 'fs';

const NODE_AUTH_TOKEN: string = `${env.NODE_AUTH_TOKEN}`;
const GIT_COMMIT_HASH: string = `${env.GIT_COMMIT_HASH}`;
const CURRENT_LOCATION: string = `${__dirname}`;

function createDistFolder(): Promise<string | undefined> {
  return mkdir('./dist', { recursive: true });
}

async function createNpmRc(): Promise<void> {
  const npmrcPath: string = './.npmrc';
  const orgEmail: string = 'info@bimeister.com';
  const registry: string = `//registry.npmjs.org/:_authToken=${NODE_AUTH_TOKEN}`;

  const npmRcPath: string = join(CURRENT_LOCATION, npmrcPath);
  const npmRcContentLines: string[] = await readFile(npmRcPath, 'utf-8').then((content: string) =>
    content.split(/\r?\n/)
  );

  const currentContentEntries: [string, string][] = npmRcContentLines.map((line: string): [string, string] => {
    const dividedLine: string[] = line.split('=');

    const invalidKeyValuePair: boolean = dividedLine.length !== 2;
    if (invalidKeyValuePair) {
      return ['', ''];
    }

    const [rawKey, rawValue]: string[] = dividedLine;
    const key: string = String(rawKey).trim();
    const value: string = String(rawValue).trim();

    return [key, value];
  });

  const currentContentValueByKey: Map<string, string> = new Map<string, string>(currentContentEntries);

  currentContentValueByKey.set('_auth', NODE_AUTH_TOKEN);
  currentContentValueByKey.set('email', orgEmail);

  const sourceRegistryWithTrailingSlash: string = registry.endsWith('/') ? registry : `${registry}/`;
  currentContentValueByKey.set('registry', sourceRegistryWithTrailingSlash);
  const processedSourceRegistry: string = sourceRegistryWithTrailingSlash
    .replace('http://', '')
    .replace('https://', '');
  currentContentValueByKey.set(`//${processedSourceRegistry}:_authToken`, NODE_AUTH_TOKEN);

  currentContentValueByKey.forEach((_: string, key: string) => {
    const isScopedRegistry: boolean = key.startsWith('@');
    if (!isScopedRegistry) {
      return;
    }
    currentContentValueByKey.delete(key);
  });

  const updatedContent: string = Array.from(currentContentValueByKey.entries())
    .map(([key, value]: [string, string]) => `${key} = ${value}`)
    .join('\n');

  return writeFile(`${CURRENT_LOCATION}/dist/${npmrcPath}`, updatedContent);
}

async function createPackageJson(): Promise<void> {
  const commitHash: string = `${GIT_COMMIT_HASH}`;
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
  const updatedProperVersion: string = `${currentProperVersion}-${commitHash}`;
  contentValueByKey.set('version', updatedProperVersion);

  const updatedContent: object = Object.fromEntries(contentValueByKey.entries());

  return writeFile(targetPackageJsonPath, JSON.stringify(updatedContent));
}

Promise.resolve()
  .then(() => createDistFolder())
  .then(() => copyFile('./.npmrc', './dist/.npmrc'))
  .then(() => copyFile('./.npmignore', './dist/.npmignore'))
  .then(() => copyFile('./LICENSE.md', './dist/LICENSE.md'))
  .then(() => createNpmRc())
  .then(() => createPackageJson())
  .catch((error: unknown) => console.warn(error));
