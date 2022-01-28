import type { PackageJson as PartialPackageJson } from '@npm/types';
import type { Dependencies } from '../types/package-json-dependencies.type';
import type { PackageJsonExports } from './package-json-exports.interface';

export interface PackageJson extends PartialPackageJson {
  optionalDependencies?: Dependencies;
  dependencies?: Dependencies;
  exports?: PackageJsonExports;
}
