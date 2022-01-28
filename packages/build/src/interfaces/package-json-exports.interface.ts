import type { PackageJsonExportsItem } from './package-json-exports-item.interface';

export interface PackageJsonExports {
  [key: string]: PackageJsonExportsItem;
}
