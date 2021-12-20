import type { ResizeObserverOptions } from 'packages/internal';

export interface ResizeObserver {
  disconnect(): void;
  observe(target: HTMLElement, options?: ResizeObserverOptions): void;
  unobserve(target: HTMLElement): void;
}
