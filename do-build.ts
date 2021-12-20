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
  external: ['rxjs', 'snake-case'],
  minify: true,
  platform: 'neutral',
  sourcemap: 'external',
  target: 'esnext',
  treeShaking: true,
  tsconfig: './tsconfig.json'
};

const buildCommonLibrary: Promise<BuildResult> = build({
  ...baseBuildConfig,
  entryPoints: ['./packages/common/index.ts'],
  outfile: './dist/common/index.js',
  platform: 'browser'
});

const buildInterfacesLibrary: Promise<BuildResult> = build({
  ...baseBuildConfig,
  entryPoints: ['./packages/interfaces/index.ts'],
  outfile: './dist/interfaces/index.js'
});

const buildInternalLibrary: Promise<BuildResult> = build({
  ...baseBuildConfig,
  entryPoints: ['./packages/internal/index.ts'],
  outfile: './dist/internal/index.js'
});

const buildNgxsLibrary: Promise<BuildResult> = build({
  ...baseBuildConfig,
  entryPoints: ['./packages/ngxs/index.ts'],
  outfile: './dist/ngxs/index.js'
});

const buildRxjsLibrary: Promise<BuildResult> = build({
  ...baseBuildConfig,
  entryPoints: ['./packages/rxjs/index.ts'],
  outfile: './dist/rxjs/index.js'
});

const buildTypesLibrary: Promise<BuildResult> = build({
  ...baseBuildConfig,
  entryPoints: ['./packages/types/index.ts'],
  outfile: './dist/types/index.js'
});

Promise.resolve()
  .then(() => buildCommonLibrary)
  .then(() =>
    buildTypings({
      inputPath: './packages/common/index.ts',
      outputPath: './dist/common/index.d.ts'
    })
  )
  .then(() => buildInterfacesLibrary)
  .then(() =>
    buildTypings({
      inputPath: './packages/interfaces/index.ts',
      outputPath: './dist/interfaces/index.d.ts'
    })
  )
  .then(() => buildInternalLibrary)
  .then(() =>
    buildTypings({
      inputPath: './packages/internal/index.ts',
      outputPath: './dist/internal/index.d.ts'
    })
  )
  .then(() => buildNgxsLibrary)
  .then(() =>
    buildTypings({
      inputPath: './packages/ngxs/index.ts',
      outputPath: './dist/ngxs/index.d.ts'
    })
  )
  .then(() => buildRxjsLibrary)
  .then(() =>
    buildTypings({
      inputPath: './packages/rxjs/index.ts',
      outputPath: './dist/rxjs/index.d.ts'
    })
  )
  .then(() => buildTypesLibrary)
  .then(() =>
    buildTypings({
      inputPath: './packages/types/index.ts',
      outputPath: './dist/types/index.d.ts'
    })
  )
  .catch(() => process.exit(1));
