import { getElementAllNestedChildren } from './get-element-all-nested-children.function';

describe('get-element-all-nested-children.function.ts', () => {
  it('should return empty array if argument is null', () => {
    expect(getElementAllNestedChildren(null as any as Element)).toEqual([]);
  });

  it('should return array that contains element with its child', () => {
    const divElement: Element = document.createElement('div');
    const spanElement: Element = document.createElement('span');
    const childElement: Element = divElement.appendChild(spanElement);
    const expected: Element[] = [divElement, childElement];
    expect(getElementAllNestedChildren(divElement)).toEqual(expected);
  });
});
