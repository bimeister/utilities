import { resizeObservable } from './resize-observable.function';
import { VOID } from '@bimeister/utilities.constants';

const resizeObserverMock: ResizeObserver = {
  disconnect: () => VOID,
  observe: () => VOID,
  unobserve: () => VOID
};

Object.defineProperty(window, 'ResizeObserver', { value: resizeObserverMock });

describe('resize-observable.function.ts', () => {
  it('should call method observe of ResizeObserver', () => {
    const element: HTMLElement = document.createElement('div');
    const observeMock: unknown = jest.spyOn(resizeObserverMock, 'observe');

    resizeObservable(element).subscribe(() => {
      expect(observeMock).toBeCalled();
    });
  });
});
