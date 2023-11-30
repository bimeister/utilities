import { Observable, of } from 'rxjs';
import { concatBoolean } from './concat-boolean.operator';

describe('concat-boolean.operator.ts', () => {
  it('should concatenate boolean values using "and" logic and return true', () => {
    const input$: Observable<boolean[]> = of([true, true, true]);

    input$.pipe(concatBoolean('and')).subscribe((result: boolean) => {
      expect(result).toEqual(true);
    });
  });

  it('should concatenate boolean values using "and" logic and return false', () => {
    const input$: Observable<boolean[]> = of([true, false, true]);

    input$.pipe(concatBoolean('and')).subscribe((result: boolean) => {
      expect(result).toEqual(false);
    });
  });

  it('should concatenate boolean values using "or" logic and return true', () => {
    const input$: Observable<boolean[]> = of([false, false, true]);

    input$.pipe(concatBoolean('or')).subscribe((result: boolean) => {
      expect(result).toEqual(true);
    });
  });

  it('should concatenate boolean values using "or" logic and return false', () => {
    const input$: Observable<boolean[]> = of([false, false, false]);

    input$.pipe(concatBoolean('or')).subscribe((result: boolean) => {
      expect(result).toEqual(false);
    });
  });

  it('should default to "and" logic if mergeType is not provided and return true', () => {
    const input$: Observable<boolean[]> = of([true, true, true]);

    input$.pipe(concatBoolean()).subscribe((result: boolean) => {
      expect(result).toEqual(true);
    });
  });

  it('should default to "and" logic if mergeType is not provided and return false', () => {
    const input$: Observable<boolean[]> = of([true, false, true]);

    input$.pipe(concatBoolean()).subscribe((result: boolean) => {
      expect(result).toEqual(false);
    });
  });
});
