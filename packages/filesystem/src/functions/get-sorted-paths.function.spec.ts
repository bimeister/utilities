import { getSortedPaths, SortedPaths } from "@bimeister/utilities.filesystem";
const fs = require('fs');

jest.mock('fs');

describe("get-sorted-paths.function.ts", () => {
  const directoryPath: string = 'packages';
  const paths: string[] = ['common', 'build/src/interfaces/package-json.interface.ts', 'build/src/types', 'build'];

  beforeAll(() => {
    fs.lstat.mockClear();
    paths.map((path: string) => fs.lstat.mockReturnValue(`${directoryPath}/${path}`));
  });

  afterEach(() => jest.clearAllMocks());

  it("should return sorted paths", async () => {
    const results: SortedPaths = await getSortedPaths(paths, directoryPath);
    expect(results).toEqual({"directoryPaths": ["packages/common", "packages/build/src/types", "packages/build"], "filePaths": ["packages/build/src/interfaces/package-json.interface.ts"]});
  });
});
