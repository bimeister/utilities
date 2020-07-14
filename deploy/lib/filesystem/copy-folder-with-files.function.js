import { copyFile, existsSync, mkdirSync, readdirSync, statSync } from 'fs';
import * as path from 'path';
import { isNullOrUndefined } from '../common/is-null-or-undefined.function';
import './../../internal/types/nullable.type';
export function copyFolderWithFiles(sourcePath, targetPath, options = null) {
    const { onCopy, fileMatchPattern } = isNullOrUndefined(options)
        ? { onCopy: null, fileMatchPattern: null }
        : options;
    const sourceIsDirectory = existsSync(sourcePath) && statSync(sourcePath).isDirectory();
    const targetDirectoryExists = existsSync(targetPath);
    if (sourceIsDirectory && !targetDirectoryExists) {
        mkdirSync(targetPath);
    }
    if (sourceIsDirectory) {
        readdirSync(sourcePath).forEach((filePath) => {
            const shouldCopy = isNullOrUndefined(fileMatchPattern) || (fileMatchPattern instanceof RegExp && fileMatchPattern.test(filePath));
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
