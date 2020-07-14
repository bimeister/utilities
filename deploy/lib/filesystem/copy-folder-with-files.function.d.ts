import { Nullable } from './../../internal/types/nullable.type';
interface Options {
    fileMatchPattern?: Nullable<RegExp>;
    onCopy?: Nullable<(sourcePath?: string, targetPath?: string) => void>;
}
export declare function copyFolderWithFiles(sourcePath: string, targetPath: string, options?: Nullable<Options>): void;
export {};
