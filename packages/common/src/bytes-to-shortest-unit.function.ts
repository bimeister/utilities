import { isNil } from './is-nil.function';

export const bytesToShortestUnit: (bytesCount: number) => string = (bytesCount: number): string => {
  if (Number.isNaN(bytesCount) || isNil(bytesCount) || Object.is(bytesCount, 0) || bytesCount < 0) {
    return '0 Б';
  }

  const unitNames: string[] = ['Б', 'КБ', 'МБ', 'ГБ', 'ТБ'];

  const divisionStep: number = 1024;
  const bytesInTB: number = Math.pow(divisionStep, 4);

  if (bytesCount < divisionStep) {
    return `${bytesCount} Б`;
  }

  const valueInEachUnit: number[] = unitNames.map((_: string, index: number) => {
    const divider: number = Math.pow(divisionStep, index);
    return Math.trunc(bytesCount / divider);
  });
  const targetValueIndex: number = valueInEachUnit.findIndex((size: number) => Object.is(size, 0)) - 1;

  if (targetValueIndex < 0) {
    return `${Math.trunc(bytesCount / bytesInTB)} ТБ`;
  }
  return `${valueInEachUnit[targetValueIndex]} ${unitNames[targetValueIndex]}`;
};
