import { generateDtsBundle } from 'dts-bundle-generator';
import { writeFile } from 'fs/promises';

interface TypingsBuildConfig {
  inputPath: string;
  outputPath: string;
  configPath: string;
}

const defaultConfig: TypingsBuildConfig = {
  inputPath: './src/index.ts',
  outputPath: './dist/index.d.ts',
  configPath: './tsconfig.json'
};

export function buildBundleTypings(options: Partial<TypingsBuildConfig> = defaultConfig): Promise<void> {
  const config: TypingsBuildConfig = {
    ...defaultConfig,
    ...options
  };

  const buildTypings: Promise<string[]> = new Promise(
    (resolve: (payload: string[]) => void, reject: (reason: unknown) => void) => {
      try {
        const result: string[] = generateDtsBundle(
          [
            {
              filePath: config.inputPath,
              output: {
                noBanner: true
              }
            }
          ],
          {
            preferredConfigPath: config.configPath
          }
        );

        resolve(result);
      } catch (error: unknown) {
        reject(error);
      }
    }
  );

  return buildTypings.then((contentItems: string[]) => writeFile(config.outputPath, contentItems.join()));
}
