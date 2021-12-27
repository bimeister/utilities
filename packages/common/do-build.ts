import { buildBundleTypings, buildFileDeclarations, buildPackageJson } from '@workspaces/build';
import { getAllNestedFilePaths } from '@workspaces/filesystem';
import { build, BuildOptions } from 'esbuild';
import { rm } from 'fs/promises';

const nestedFilePaths: Promise<string[]> = getAllNestedFilePaths(`${__dirname}/src`).then((paths: string[]) =>
  paths.filter((path: string) => !path.endsWith('.spec.ts'))
);

const removeDistFolder = (): Promise<unknown> => rm(`${__dirname}/dist`, { force: true, recursive: true });

const generateTypings = (): Promise<unknown> =>
  buildBundleTypings({
    configPath: './../../tsconfig.json'
  }).then(() =>
    nestedFilePaths.then((filePaths: string[]) => {
      const sourceFilePaths: string[] = filePaths.filter((filePath: string) => !filePath.endsWith('/index.ts'));
      buildFileDeclarations(sourceFilePaths);
    })
  );

const generateBundle = (): Promise<unknown> => {
  const commonConfig: BuildOptions = {
    chunkNames: 'chunks/[name]-[hash]',
    bundle: true,
    splitting: true,
    external: [],
    minify: true,
    platform: 'neutral',
    sourcemap: 'external',
    target: 'esnext',
    format: 'esm',
    treeShaking: true,
    tsconfig: './../../tsconfig.json',
    mainFields: ['module', 'main', 'browser'],
    color: true,
    metafile: true,
    legalComments: 'none',
    outdir: './dist'
  };

  return nestedFilePaths.then((entryPoints: string[]) =>
    Promise.resolve()
      .then(() =>
        build({
          ...commonConfig,
          entryPoints,
          outExtension: { '.js': '.mjs' }
        })
      )
      .then(() =>
        build({ ...commonConfig, entryPoints, splitting: false, format: 'cjs', outExtension: { '.js': '.js' } })
      )
  );
};

const generateDistPackageJson = (): Promise<unknown> =>
  buildPackageJson({
    currentPackageJsonPath: './package.json',
    targetPackageJsonPath: './dist/package.json',
    override: {
      type: 'module',
      sideEffects: false,
      exports: {
        '.': {
          import: './index.mjs',
          types: './index.d.ts',
          default: './index.js'
        },
        './**/*': {
          import: './**/*.mjs',
          types: './index.d.ts',
          default: './**/*.js'
        }
      }
    }
  });

Promise.resolve()
  .then(removeDistFolder)
  .then(generateBundle)
  .then(generateTypings)
  .then(generateDistPackageJson)
  .catch((error: Error) => {
    throw error;
  })
  .finally(() => {
    // eslint-disable-next-line no-console
    console.log('Package "Common" is build.');
  });
