import {
  buildBundleTypings,
  buildFileDeclarations,
  buildPackageJson,
  Dependencies,
  getGroupedSourceFileDataByPackageName,
  PackageJson,
  PackageJsonExports,
  PackageJsonExportsItem,
  SourceFileData
} from '@bimeister/utilities.build';
import { getAllNestedFilePaths } from '@bimeister/utilities.filesystem';
import { build, BuildOptions, BuildResult } from 'esbuild';
import { readFile, rm } from 'fs/promises';

const distFolderPath: string = `${__dirname}/dist`;
const packagesFolderPath: string = `${__dirname}/packages`;
const tsConfigFilePath: string = './tsconfig.json';
const rootPackageJsonFilePath: string = `${__dirname}/package.json`;

const esBuildConfig: BuildOptions = {
  chunkNames: 'chunks/[name]-[hash]',
  bundle: true,
  splitting: true,
  external: ['rxjs', '@ngxs/store', 'typescript', 'dts-bundle-generator'],
  minify: true,
  platform: 'neutral',
  sourcemap: 'external',
  target: 'esnext',
  format: 'esm',
  treeShaking: true,
  tsconfig: tsConfigFilePath,
  mainFields: ['module', 'main', 'browser'],
  color: true,
  metafile: true,
  legalComments: 'none'
};
const browserOnlyPackages: Set<string> = new Set<string>(['ngxs', 'resize-observable']);
const nodeOnlyPackages: Set<string> = new Set<string>(['build', 'filesystem', 'performance']);
const typesOnlyPackages: Set<string> = new Set<string>(['traits', 'types', 'interfaces']);
const typeOnlyFileEndings: Set<string> = new Set<string>(
  ['type', 'interface', 'trait'].flatMap((prefix: string) => [`.${prefix}.ts`, `${prefix}s/index.ts`])
);

getAllNestedFilePaths(packagesFolderPath).then((sourceFilePaths: string[]) => {
  const tsSourceFilePaths: string[] = sourceFilePaths.filter(
    (filePath: string) => filePath.includes('/src/') && filePath.endsWith('.ts') && !filePath.endsWith('.spec.ts')
  );

  const sourceFilesDataByPackageName: Map<string, SourceFileData[]> =
    getGroupedSourceFileDataByPackageName(tsSourceFilePaths);

  return Promise.resolve()
    .then(() => rm(distFolderPath, { force: true, recursive: true }))
    .then(() => generateBundle(sourceFilesDataByPackageName))
    .then(() => generateTypings(sourceFilesDataByPackageName))
    .then(() => generatePackageJson(sourceFilePaths, sourceFilesDataByPackageName));
});

function generateBundle(
  sourceFilesDataByPackageName: Map<string, SourceFileData[]>
): Promise<(BuildResult | undefined)[]> {
  return Promise.all(
    Array.from(sourceFilesDataByPackageName)
      .map(([packageName, filesData]: [string, SourceFileData[]]) => {
        if (typesOnlyPackages.has(packageName) || packageName === 'internal') {
          return;
        }

        const entryPoints: string[] = filesData
          .map((fileData: SourceFileData) => fileData.filePath)
          .filter((filePath: string) => {
            const invalidEndings: string[] = Array.from(typeOnlyFileEndings);
            const isTypeOnlyFile: boolean = invalidEndings.some((ending: string) => filePath.endsWith(ending));
            return !isTypeOnlyFile;
          });
        const buildConfig: BuildOptions = {
          ...esBuildConfig,
          outdir: `${distFolderPath}/${packageName}/`,
          entryPoints
        };

        if (browserOnlyPackages.has(packageName)) {
          Object.assign(buildConfig, {
            platform: 'browser'
          });
        }

        if (nodeOnlyPackages.has(packageName)) {
          Object.assign(buildConfig, {
            platform: 'node'
          });
        }

        const commonJsConfig: BuildOptions = {
          ...buildConfig,
          splitting: false,
          format: 'cjs',
          // eslint-disable-next-line @typescript-eslint/naming-convention
          outExtension: { '.js': '.cjs' }
        };

        const esModuleConfig: BuildOptions = {
          ...buildConfig,
          splitting: true,
          format: 'esm',
          // eslint-disable-next-line @typescript-eslint/naming-convention
          outExtension: { '.js': '.mjs' }
        };

        return [build(commonJsConfig), build(esModuleConfig)];
      })
      .flat(1)
  );
}

async function generateTypings(sourceFilesDataByPackageName: Map<string, SourceFileData[]>): Promise<void> {
  sourceFilesDataByPackageName.forEach(async (filesData: SourceFileData[], packageName: string) => {
    if (packageName === 'internal') {
      return;
    }

    const isIndexPackage: boolean = packageName === 'index';
    const mainFilePath: string = isIndexPackage
      ? `${packagesFolderPath}/index/src/public-api.ts`
      : `${packagesFolderPath}/${packageName}/src/index.ts`;

    if (!isIndexPackage) {
      await buildFileDeclarations(
        filesData
          .map((fileData: SourceFileData) => fileData.filePath)
          .filter((filePath: string) => !filePath.endsWith(mainFilePath)),
        {
          outDir: `${distFolderPath}/${packageName}`
        }
      );
    }

    const bundleTypingsFilePath: string = isIndexPackage
      ? `${distFolderPath}/index/public-api.d.ts`
      : `${distFolderPath}/${packageName}/index.d.ts`;

    await buildBundleTypings({
      configPath: tsConfigFilePath,
      inputPath: mainFilePath,
      outputPath: bundleTypingsFilePath,
      librariesOptions: {
        inlinedLibraries: ['@npm/types', 'dts-bundle-generator', 'typescript']
      }
    });
  });
}

async function generatePackageJson(
  sourceFilePaths: string[],
  sourceFilesDataByPackageName: Map<string, SourceFileData[]>
): Promise<void> {
  const packageJsonFilePaths: string[] = sourceFilePaths.filter((filePath: string) =>
    filePath.endsWith('package.json')
  );

  const collectedDependencies: Dependencies = await packageJsonFilePaths
    .concat([rootPackageJsonFilePath])
    .reduce(async (accumulatedData: Promise<Dependencies>, packageJsonFilePath: string) => {
      const fileContent: string = await readFile(packageJsonFilePath, { encoding: 'utf8' });
      const parsedFileContent: PackageJson = JSON.parse(fileContent);
      const accumulatedDependencies: Dependencies = await accumulatedData;

      const dependencies: Dependencies | undefined = parsedFileContent.dependencies;
      if (dependencies !== undefined) {
        Object.assign(accumulatedDependencies, dependencies);
      }

      const optionalDependencies: Dependencies | undefined = parsedFileContent.optionalDependencies;
      if (optionalDependencies !== undefined) {
        Object.assign(accumulatedDependencies, optionalDependencies);
      }

      const peerDependencies: Dependencies | undefined = parsedFileContent.peerDependencies;
      if (peerDependencies !== undefined) {
        Object.assign(accumulatedDependencies, peerDependencies);
      }

      return accumulatedData;
    }, Promise.resolve({}));

  const exportsEntries: [string, PackageJsonExportsItem][] = Array.from(sourceFilesDataByPackageName.values())
    .flat(1)
    .filter(({ packageName, filePath }: SourceFileData) => {
      const ignoreExportsFor: Set<string> = new Set(['index', 'internal']);
      const packageShouldBeExported: boolean = !ignoreExportsFor.has(packageName);

      const isBarrelExportFile: boolean = filePath.endsWith('/index.ts');
      return packageShouldBeExported && isBarrelExportFile;
    })
    .map(({ packageName, filePathFromPackageSrc }: SourceFileData) => {
      const filePathWithoutExtension: string = `./${packageName}${filePathFromPackageSrc}`.replace('.ts', '');

      const exportsItem: PackageJsonExportsItem = typesOnlyPackages.has(packageName)
        ? {
            typings: `${filePathWithoutExtension}.d.ts`
          }
        : {
            import: `${filePathWithoutExtension}.mjs`,
            require: `${filePathWithoutExtension}.cjs`,
            fesm2020: `${filePathWithoutExtension}.mjs`,
            fesm2015: `${filePathWithoutExtension}.mjs`,
            esm2020: `${filePathWithoutExtension}.mjs`,
            module: `${filePathWithoutExtension}.mjs`,
            es2020: `${filePathWithoutExtension}.mjs`,
            main: `${filePathWithoutExtension}.cjs`,
            typings: `${filePathWithoutExtension}.d.ts`,
            default: `${filePathWithoutExtension}.cjs`
          };

      return [filePathWithoutExtension.replace('/index', ''), exportsItem];
    });

  const rootTypesFilePath: string = `./index/public-api.d.ts`;
  const rootEsmFilePath: string = `./index/public-api.mjs`;
  const rootCommonJsFilePath: string = `./index/public-api.cjs`;
  const topLevelExports: [string, PackageJsonExportsItem][] = [
    [
      './package.json',
      {
        default: './package.json'
      }
    ],
    [
      '.',
      {
        fesm2020: rootEsmFilePath,
        fesm2015: rootEsmFilePath,
        esm2020: rootEsmFilePath,
        typings: rootTypesFilePath,
        module: rootEsmFilePath,
        es2020: rootEsmFilePath,
        main: rootCommonJsFilePath,
        default: rootCommonJsFilePath
      }
    ]
  ];
  const exports: PackageJsonExports = Object.fromEntries(topLevelExports.concat(exportsEntries));

  await buildPackageJson({
    currentPackageJsonPath: rootPackageJsonFilePath,
    targetPackageJsonPath: `${distFolderPath}/package.json`,
    override: {
      optionalDependencies: collectedDependencies,
      exports,
      sideEffects: false,
      workspaces: [],
      fesm2020: rootEsmFilePath,
      fesm2015: rootEsmFilePath,
      esm2020: rootEsmFilePath,
      typings: rootTypesFilePath,
      module: rootEsmFilePath,
      es2020: rootEsmFilePath,
      main: rootCommonJsFilePath
    }
  });
}
