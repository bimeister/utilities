import { generateDtsBundle } from 'dts-bundle-generator';
import { build, BuildOptions, BuildResult } from 'esbuild';
import { writeFile } from 'fs';

function buildTypings(options: { inputPath: string; outputPath: string }): Promise<void> {
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
  external: ['rxjs', 'uuid'],
  minify: true,
  platform: 'neutral',
  sourcemap: 'external',
  target: 'esnext',
  treeShaking: true,
  tsconfig: './tsconfig.json'
};

const buildNativeLibrary: Promise<BuildResult> = build({
  ...baseBuildConfig,
  entryPoints: ['./packages/native/index.ts'],
  outfile: './dist/index.js'
});

const buildRxJsLibrary: Promise<BuildResult> = build({
  ...baseBuildConfig,
  entryPoints: ['./packages/rxjs/index.ts'],
  outfile: './dist/rxjs/index.js'
});

const buildRxJsOperatorsLibrary: Promise<BuildResult> = build({
  ...baseBuildConfig,
  entryPoints: ['./packages/rxjs-operators/index.ts'],
  outfile: './dist/rxjs/operators/index.js'
});

Promise.resolve()
  .then(() => buildNativeLibrary)
  .then(() =>
    buildTypings({
      inputPath: './packages/native/index.ts',
      outputPath: './dist/index.d.ts'
    })
  )
  .then(() => buildRxJsLibrary)
  .then(() =>
    buildTypings({
      inputPath: './packages/rxjs/index.ts',
      outputPath: './dist/rxjs/index.d.ts'
    })
  )
  .then(() => buildRxJsOperatorsLibrary)
  .then(() =>
    buildTypings({
      inputPath: './packages/rxjs-operators/index.ts',
      outputPath: './dist/rxjs/operators/index.d.ts'
    })
  )
  .catch(() => process.exit(1));
