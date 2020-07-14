import { Nullable } from '../../internal/types/nullable.type';
interface Options {
    fileMatchPattern?: Nullable<RegExp>;
    onDelete?: Nullable<(filePath: string) => void>;
}
export declare function deleteFolderWithFiles(targetPath: string, options?: Nullable<Options>): void;
export {};
