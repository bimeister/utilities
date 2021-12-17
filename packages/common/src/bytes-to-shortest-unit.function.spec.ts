import { bytesToShortestUnit } from './bytes-to-shortest-unit.function';

const bytesInKB: number = 1024;
const bytesInMB: number = Math.pow(bytesInKB, 2);
const bytesInGB: number = Math.pow(bytesInKB, 3);
const bytesInTB: number = Math.pow(bytesInKB, 4);
const bytesInPB: number = Math.pow(bytesInKB, 5);

describe('bytes-to-shortest-unit.function.ts', () => {
  it('should convert NaN B to 0 B', () => {
    expect(bytesToShortestUnit(NaN)).toBe('0 Б');
  });

  it('should convert -1 B to 0 B', () => {
    expect(bytesToShortestUnit(-1)).toBe('0 Б');
  });

  it('should convert 10 B to 10 B', () => {
    expect(bytesToShortestUnit(10)).toBe('10 Б');
  });

  it('should convert 1024 B to 1 KB', () => {
    expect(bytesToShortestUnit(bytesInKB)).toBe('1 КБ');
  });

  it('should convert 1048576 B to 1 MB', () => {
    expect(bytesToShortestUnit(bytesInMB)).toBe('1 МБ');
  });

  it('should convert 1073741824 B to 1 GB', () => {
    expect(bytesToShortestUnit(bytesInGB)).toBe('1 ГБ');
  });

  it('should convert 1099511627776 B to 1 TB', () => {
    expect(bytesToShortestUnit(bytesInTB)).toBe('1 ТБ');
  });

  it('should convert 1125899906842624 B to 1024 TB', () => {
    expect(bytesToShortestUnit(bytesInPB)).toBe('1024 ТБ');
  });
});
