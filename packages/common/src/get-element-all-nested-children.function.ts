import { isNil } from './is-nil.function';

export function getElementAllNestedChildren(element: Element): Element[] {
  if (isNil(element) || !(element instanceof Element)) {
    return [];
  }
  const childElements: Element[] = Array.from(element.children)
    .map((child: Element) => getElementAllNestedChildren(child))
    .flat();
  return [element, ...childElements];
}
