import { generateDtsBundle } from 'dts-bundle-generator';
import { build, BuildOptions, BuildResult } from 'esbuild';
import { writeFile } from 'fs';

interface TypingsConfig {
  inputPath: string;
  outputPath: string;
}

function buildTypings(options: TypingsConfig): Promise<void> {
  const typings: Promise<string[]> = new Promise(
    (resolve: (payload: string[]) => void, reject: (reason: unknown) => void) => {
      try {
        const result: string[] = generateDtsBundle(
          [
            {
              filePath: options.inputPath,
              output: {
                noBanner: true
              }
            }
          ],
          {
            preferredConfigPath: './tsconfig.json'
          }
        );

        resolve(result);
      } catch (error: unknown) {
        reject(error);
      }
    }
  );

  const fileWriteOperation: Promise<void> = typings.then(
    (result: string[]) =>
      new Promise<void>((resolve: (payload: void) => void, reject: (reason: unknown) => void) => {
        writeFile(options.outputPath, result.join(), (error: unknown | null) => {
          if (error === null) {
            resolve();
          }

          reject(error);
        });
      })
  );

  return fileWriteOperation;
}

const baseBuildConfig: Partial<BuildOptions> = {
  bundle: true,
  format: 'esm',
  external: ['rxjs', '@ngxs/store'],
  minify: true,
  platform: 'neutral',
  sourcemap: 'external',
  target: 'es6',
  treeShaking: true,
  tsconfig: './tsconfig.json',
  mainFields: ['module', 'main']
};

const packages: string[] = [
  'common',
  'interfaces',
  'index',
  'internal',
  'ngxs',
  'rxjs',
  'traits',
  'types',
  'resize-observable'
];
const packagesBuildChain: Promise<void>[] = packages.map((packageName: string) => {
  if (packageName === 'internal') {
    return Promise.resolve();
  }

  const buildConfig: BuildOptions = {
    ...baseBuildConfig,
    entryPoints: [`./packages/${packageName}/index.ts`],
    outfile: `./dist/${packageName}/index.js`
  };

  const typingsConfig: TypingsConfig = {
    inputPath: `./packages/${packageName}/index.ts`,
    outputPath: `./dist/${packageName}/index.d.ts`
  };

  if (packageName === 'resize-observable') {
    Object.assign(buildConfig, {
      platform: 'browser'
    });
  }

  if (packageName === 'index') {
    Object.assign(buildConfig, {
      outfile: `./dist/index.js`
    });

    Object.assign(typingsConfig, {
      outputPath: `./dist/index.d.ts`
    });
  }

  const generateBundle: Promise<BuildResult> = build(buildConfig);

  return generateBundle.then(() => buildTypings(typingsConfig));
});

packagesBuildChain
  .reduce(
    (accumulatedChain: Promise<void>, currentChainPart: Promise<void>) => accumulatedChain.then(() => currentChainPart),
    Promise.resolve()
  )
  .catch(() => process.exit(1));
