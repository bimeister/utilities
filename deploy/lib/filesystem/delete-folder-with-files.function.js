import { existsSync, lstatSync, readdirSync, rmdirSync, unlinkSync } from 'fs';
import * as path from 'path';
import '../../internal/types/nullable.type';
import { isEmpty } from '../common/is-empty.function';
import { isNullOrUndefined } from '../common/is-null-or-undefined.function';
export function deleteFolderWithFiles(targetPath, options = null) {
    const pathExists = existsSync(targetPath);
    if (!pathExists) {
        return;
    }
    const { fileMatchPattern, onDelete } = isNullOrUndefined(options)
        ? { fileMatchPattern: null, onDelete: null }
        : options;
    const filesInDirectory = readdirSync(targetPath);
    filesInDirectory.forEach((filePath) => {
        const normalizedFilePath = path.join(targetPath, filePath);
        const fileIsAllowedToBeDeleted = isNullOrUndefined(fileMatchPattern) ||
            (fileMatchPattern instanceof RegExp && fileMatchPattern.test(normalizedFilePath));
        if (!fileIsAllowedToBeDeleted) {
            return;
        }
        const fileIsDirectory = lstatSync(normalizedFilePath).isDirectory();
        if (fileIsDirectory) {
            deleteFolderWithFiles(normalizedFilePath, options);
            return;
        }
        unlinkSync(normalizedFilePath);
        if (!isNullOrUndefined(onDelete) && typeof onDelete === 'function') {
            onDelete(normalizedFilePath);
        }
    });
    const restFilesInDirectory = readdirSync(targetPath);
    const directoryIsEmpty = isEmpty(restFilesInDirectory);
    if (directoryIsEmpty) {
        rmdirSync(targetPath);
    }
}
