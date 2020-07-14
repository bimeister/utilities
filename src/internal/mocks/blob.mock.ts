const sampleData: string = JSON.stringify({ sample: 'value' }, null, 2);
export const blobMock: Blob = new Blob([sampleData], { type: 'application/json' });
