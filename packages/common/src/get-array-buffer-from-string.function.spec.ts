import { getArrayBufferFromString } from './get-array-buffer-from-string.function';

describe('get-array-buffer-from-string.function.ts', () => {
  const uuid: string = '708e40fd-cd00-4f9b-96e6-c5a19808df5f';
  const buffer: Uint8Array = new Uint8Array([112, 142, 64, 253, 205, 0, 79, 155, 150, 230, 197, 161, 152, 8, 223, 95]);

  it('should return a buffer if input is uuid', () => {
    expect(getArrayBufferFromString(uuid)?.toString()).toEqual(buffer.toString());
  });

  it('should return a null if input is nil type', () => {
    expect(getArrayBufferFromString(null as any)).toBeNull();
    expect(getArrayBufferFromString(undefined as any)).toBeNull();
  });
});
