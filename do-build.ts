import { generateDtsBundle } from 'dts-bundle-generator';
import { build, BuildOptions, BuildResult, transformSync } from 'esbuild';
import { writeFile } from 'fs';

type TypingsConfig = {
  inputPath: string;
  outputPath: string;
};

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

  const fileWriteOperation: Promise<void> = typings.then((result: string[]) => {
    return new Promise<void>((resolve: (payload: void) => void, reject: (reason: unknown) => void) => {
      writeFile(options.outputPath, result.join(), (error: unknown | null) => {
        if (error === null) {
          resolve();
        }

        reject(error);
      });
    });
  });

  return fileWriteOperation;
}

const baseBuildConfig: Partial<BuildOptions> = {
  bundle: true,
  format: 'esm',
  external: ['rxjs', '@ngxs/store'],
  minify: true,
  platform: 'neutral',
  sourcemap: 'external',
  target: 'esnext',
  treeShaking: true,
  tsconfig: './tsconfig.json',
  mainFields: ['module', 'main']
};

const packages: string[] = ['common', 'interfaces', 'index', 'internal', 'ngxs', 'rxjs', 'types', 'resize-observable'];
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

const buildRootIndex = new Promise((resolve: (value: string) => void, reject: (reason: any) => void) => {
  const barrelExportCode: string = packages
    .map((packageName: string) => `export * from './${packageName}/index.js';`)
    .reduce((accumulatedCode: string, currentExportString: string) => {
      return `
${accumulatedCode}
${currentExportString}`;
    }, '');

  const barrelExportCodeMinified: string = transformSync(barrelExportCode).code;

  writeFile('./dist/index.js', barrelExportCodeMinified, (error: Error | null) => {
    if (error !== null) {
      reject(error);
      return;
    }
    resolve(barrelExportCodeMinified);
  });
});

packagesBuildChain
  .reduce((accumulatedChain: Promise<void>, currentChainPart: Promise<void>) => {
    return accumulatedChain.then(() => currentChainPart);
  }, Promise.resolve())
  .then(() => buildRootIndex)
  .catch(() => process.exit(1));
