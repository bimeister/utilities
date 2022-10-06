import { getAllNestedDirectoryPaths } from '@bimeister/utilities.filesystem';

jest.mock('fs');

describe('get-all-nested-directory-paths.function.ts', () => {
  afterEach(() => jest.clearAllMocks());

  it('should return all nested directory paths', async () => {
    const result: string[] = await getAllNestedDirectoryPaths('packages/build');
    expect(result).toEqual([
      'packages/build/src',
      'packages/build/src/functions',
      'packages/build/src/interfaces',
      'packages/build/src/types'
    ]);
  });
});
