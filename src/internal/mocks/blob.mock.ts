import { jsonMock } from './json.mock';

export const blobMock: Blob = new Blob([jsonMock], { type: 'application/json' });
