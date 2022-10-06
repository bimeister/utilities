import { getAllNestedFilePaths } from "@bimeister/utilities.filesystem";
const fs = require('fs');

jest.mock('fs');

describe("get-all-nested-file-paths.function.ts", () => {
  beforeAll(() => {
    fs.readdir.mockClear();

    fs.readdir.mockReturnValue('packages/build/src/types')
  });

  afterEach(() => jest.clearAllMocks());

  it("should return all nested directory paths", async () => {
    const result: string[] = await getAllNestedFilePaths('packages/build/src/types');
    expect(result).toEqual( ["packages/build/src/types/index.ts", "packages/build/src/types/package-json-dependencies.type.ts"]);
  });
});
