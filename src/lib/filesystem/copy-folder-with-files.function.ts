/**
 * @packageDocumentation
 * @module FileSystem
 */
import { copyFile, existsSync, mkdirSync, readdirSync, statSync } from 'fs';
import * as path from 'path';

import { isNullOrUndefined } from '../common/is-null-or-undefined.function';
import { Nullable } from './../../internal/types/nullable.type';

interface Options {
  fileMatchPattern?: Nullable<RegExp>;
  onCopy?: Nullable<(sourcePath?: string, targetPath?: string) => void>;
}

export function copyFolderWithFiles(sourcePath: string, targetPath: string, options: Nullable<Options> = null): void {
  const { onCopy, fileMatchPattern }: Options = isNullOrUndefined(options)
    ? { onCopy: null, fileMatchPattern: null }
    : options;

  const sourceIsDirectory: boolean = existsSync(sourcePath) && statSync(sourcePath).isDirectory();
  const targetDirectoryExists: boolean = existsSync(targetPath);

  if (sourceIsDirectory && !targetDirectoryExists) {
    mkdirSync(targetPath);
  }

  if (sourceIsDirectory) {
    readdirSync(sourcePath).forEach((filePath: string) => {
      const shouldCopy: boolean =
        isNullOrUndefined(fileMatchPattern) || (fileMatchPattern instanceof RegExp && fileMatchPattern.test(filePath));
      if (!shouldCopy) {
        return;
      }

      copyFolderWithFiles(path.join(sourcePath, filePath), path.join(targetPath, filePath), options);
    });
    return;
  }

  copyFile(sourcePath, targetPath, () => {
    if (!isNullOrUndefined(onCopy) && typeof onCopy === 'function') {
      onCopy(sourcePath, targetPath);
    }
  });
}
