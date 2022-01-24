import { buildPackageJson } from '@workspaces/build';
import { getAllNestedDirectoryPaths, getAllNestedFilePaths } from '@workspaces/filesystem';
import { mkdir, rename, rm } from 'fs/promises';

interface BuildArtifacts {
  filePaths: string[];
  packageName: string;
}

const removeDistFolder = (): Promise<unknown> => rm(`${__dirname}/dist`, { force: true, recursive: true });

const collectPackageBuildArtifacts = async (): Promise<void> => {
  const regExpPattern: RegExp = new RegExp(/\/packages\/[a-zA-Z]*\/dist$/gm);
  const artifactsPaths: string[] = await getAllNestedDirectoryPaths(`${__dirname}/packages`).then((paths: string[]) =>
    paths.filter((path: string) => regExpPattern.test(path))
  );

  artifactsPaths
    .map((path: string) => {
      const packageName: string = path.replace(__dirname, '').replace('/packages/', '').replace('/dist', '');
      return getAllNestedFilePaths(path).then((filePaths: string[]) => ({ filePaths, packageName }));
    })
    .forEach(async (buildArtifacts: Promise<BuildArtifacts>) => {
      const { filePaths, packageName }: BuildArtifacts = await buildArtifacts;

      filePaths.forEach(async (filePath: string) => {
        const targetFilePath: string = filePath.replace(`/packages/${packageName}/dist/`, `/dist/${packageName}/`);
        const fileName: string = filePath.slice(filePath.lastIndexOf('/') + 1);

        await mkdir(targetFilePath.replace(fileName, ''), { recursive: true });
        await rename(filePath, targetFilePath);
      });
    });
};

const generateDistPackageJson = (): Promise<unknown> =>
  buildPackageJson({
    currentPackageJsonPath: './package.json',
    targetPackageJsonPath: './dist/package.json',
    override: {
      type: 'commonjs',
      sideEffects: false,
      workspaces: [],
      types: './index/public-api.d.ts',
      exports: {
        '.': {
          import: './index/public-api.mjs',
          default: './index/public-api.js'
        },
        './build': {
          import: './build/index.mjs',
          types: './build/index.d.ts',
          default: './build/index.js'
        },
        // './build/*': {
        //   import: './build/index.mjs',
        //   types: './build/index.d.ts',
        //   default: './build/index.js'
        // },
        './common': {
          import: './common/index.mjs',
          types: './common/index.d.ts',
          default: './common/index.js'
        },
        // './common/*': {
        //   import: './common/index.mjs',
        //   types: './common/index.d.ts',
        //   default: './common/index.js'
        // },
        './constants': {
          import: './constants/index.mjs',
          types: './constants/index.d.ts',
          default: './constants/index.js'
        },
        // './constants/*': {
        //   import: './constants/index.mjs',
        //   types: './constants/index.d.ts',
        //   default: './constants/index.js'
        // },
        './filesystem': {
          import: './filesystem/index.mjs',
          types: './filesystem/index.d.ts',
          default: './filesystem/index.js'
        },
        // './filesystem/*': {
        //   import: './filesystem/index.mjs',
        //   types: './filesystem/index.d.ts',
        //   default: './filesystem/index.js'
        // },
        './index/*': {
          default: null
        },
        './interfaces': {
          import: './interfaces/index.mjs',
          types: './interfaces/index.d.ts',
          default: './interfaces/index.js'
        },
        // './interfaces/*': {
        //   import: './interfaces/index.mjs',
        //   types: './interfaces/index.d.ts',
        //   default: './interfaces/index.js'
        // },
        './internal/*': {
          default: null
        },
        './ngxs': {
          import: './ngxs/index.mjs',
          types: './ngxs/index.d.ts',
          default: './ngxs/index.js'
        },
        // './ngxs/*': {
        //   import: './ngxs/index.mjs',
        //   types: './ngxs/index.d.ts',
        //   default: './ngxs/index.js'
        // },
        './resize-observable': {
          import: './resize-observable/index.mjs',
          types: './resize-observable/index.d.ts',
          default: './resize-observable/index.js'
        },
        // './resize-observable/*': {
        //   import: './resize-observable/index.mjs',
        //   types: './resize-observable/index.d.ts',
        //   default: './resize-observable/index.js'
        // },
        './rxjs': {
          import: './rxjs/index.mjs',
          types: './rxjs/index.d.ts',
          default: './rxjs/index.js'
        },
        // './rxjs/*': {
        //   import: './rxjs/index.mjs',
        //   types: './rxjs/index.d.ts',
        //   default: './rxjs/index.js'
        // },
        './traits': {
          import: './traits/index.mjs',
          types: './traits/index.d.ts',
          default: './traits/index.js'
        },
        // './traits/*': {
        //   import: './traits/index.mjs',
        //   types: './traits/index.d.ts',
        //   default: './traits/index.js'
        // },
        './types': {
          import: './types/index.mjs',
          types: './types/index.d.ts',
          default: './types/index.js'
        }
        // './types/*': {
        //   import: './types/index.mjs',
        //   types: './types/index.d.ts',
        //   default: './types/index.js'
        // }
      }
    }
  });

Promise.resolve()
  .then(removeDistFolder)
  .then(collectPackageBuildArtifacts)
  .then(generateDistPackageJson)
  .catch((error: Error) => {
    throw error;
  })
  .finally(() => {
    // eslint-disable-next-line no-console
    console.log('Package build done.');
  });
