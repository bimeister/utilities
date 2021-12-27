import type { Nullable } from '@workspaces/types';
import { isNil } from './is-nil.function';

export const fileListToArray: (fileList: FileList) => File[] = (fileList: FileList): File[] => {
  if (Object.is(fileList.length, 0)) {
    return [];
  }

  return new Array(fileList.length)
    .fill(null)
    .map((_, index: number) => fileList.item(index))
    .filter((file: Nullable<File>): file is NonNullable<File> => !isNil(file));
};
