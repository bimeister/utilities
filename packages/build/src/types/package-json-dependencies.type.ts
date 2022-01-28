import type { PackageJson as PartialPackageJson } from '@npm/types';

export type Dependencies = NonNullable<PartialPackageJson['peerDependencies']>;
