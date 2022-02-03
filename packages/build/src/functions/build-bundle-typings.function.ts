import { EntryPointConfig, generateDtsBundle, LibrariesOptions } from 'dts-bundle-generator';
import { writeFile } from 'fs/promises';

interface TypingsBuildConfig {
  inputPath: string;
  outputPath: string;
  configPath: string;
  librariesOptions?: LibrariesOptions;
}

const defaultConfig: TypingsBuildConfig = {
  inputPath: './src/index.ts',
  outputPath: './dist/index.d.ts',
  configPath: './tsconfig.json'
};

export function buildBundleTypings(options: Partial<TypingsBuildConfig> = defaultConfig): Promise<void> {
  const config: TypingsBuildConfig = {
    librariesOptions: {},
    ...defaultConfig,
    ...options
  };

  const bundleGeneratorConfig: EntryPointConfig = {
    filePath: config.inputPath,
    libraries: config.librariesOptions,
    output: {
      noBanner: true
    }
  };

  const buildTypings: Promise<string[]> = new Promise(
    (resolve: (payload: string[]) => void, reject: (reason: unknown) => void) => {
      try {
        const result: string[] = generateDtsBundle([bundleGeneratorConfig], {
          preferredConfigPath: config.configPath
        });

        resolve(result);
      } catch (error: unknown) {
        reject(error);
      }
    }
  );

  return buildTypings.then((contentItems: string[]) => writeFile(config.outputPath, contentItems.join()));
}
