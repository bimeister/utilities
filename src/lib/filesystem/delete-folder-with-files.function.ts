/**
 * @packageDocumentation
 * @module FileSystem
 */
import { existsSync, lstatSync, readdirSync, rmdirSync, unlinkSync } from 'fs';
import * as path from 'path';

import { Nullable } from './../../internal/types/nullable.type';
import { isEmpty } from './../common/is-empty.function';
import { isNil } from './../common/is-nil.function';

interface Options {
  fileMatchPattern?: Nullable<RegExp>;
  onDelete?: Nullable<(filePath: string) => void>;
}

export function deleteFolderWithFiles(targetPath: string, options: Nullable<Options> = null): void {
  const pathExists: boolean = existsSync(targetPath);
  if (!pathExists) {
    return;
  }

  const { fileMatchPattern, onDelete }: Options = isNil(options) ? { fileMatchPattern: null, onDelete: null } : options;

  const filesInDirectory: string[] = readdirSync(targetPath);

  filesInDirectory.forEach((filePath: string) => {
    const normalizedFilePath: string = path.join(targetPath, filePath);
    const fileIsAllowedToBeDeleted: boolean =
      isNil(fileMatchPattern) || (fileMatchPattern instanceof RegExp && fileMatchPattern.test(normalizedFilePath));

    if (!fileIsAllowedToBeDeleted) {
      return;
    }

    const fileIsDirectory: boolean = lstatSync(normalizedFilePath).isDirectory();
    if (fileIsDirectory) {
      deleteFolderWithFiles(normalizedFilePath, options);
      return;
    }

    unlinkSync(normalizedFilePath);
    if (!isNil(onDelete) && typeof onDelete === 'function') {
      onDelete(normalizedFilePath);
    }
  });

  const restFilesInDirectory: string[] = readdirSync(targetPath);
  const directoryIsEmpty: boolean = isEmpty(restFilesInDirectory);

  if (directoryIsEmpty) {
    rmdirSync(targetPath);
  }
}
