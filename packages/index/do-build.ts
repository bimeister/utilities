import { buildBundleTypings, buildPackageJson } from '@workspaces/build';
import { build, BuildOptions } from 'esbuild';
import { rm } from 'fs/promises';

const removeDistFolder = (): Promise<unknown> => rm(`${__dirname}/dist`, { force: true, recursive: true });

const generateTypings = (): Promise<unknown> =>
  buildBundleTypings({
    configPath: './../../tsconfig.json',
    inputPath: './src/public-api.ts',
    outputPath: './dist/public-api.d.ts'
  });

const generateBundle = (): Promise<unknown> => {
  const commonConfig: BuildOptions = {
    chunkNames: 'chunks/[name]-[hash]',
    bundle: true,
    splitting: true,
    external: ['rxjs', '@ngxs/store'],
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

  return Promise.resolve()
    .then(() =>
      build({
        ...commonConfig,
        entryPoints: ['./src/public-api.ts']
      })
    )
    .then(() =>
      build({
        ...commonConfig,
        entryPoints: ['./src/public-api.ts'],
        format: 'cjs',
        splitting: false,
        outExtension: { '.js': '.js' }
      })
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
          import: './public-api.mjs',
          types: './public-api.d.ts',
          default: './public-api.js'
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
    console.log('Package "Index" is build.');
  });
