import { Observable, of } from 'rxjs';
import { invertBoolean } from './invert-boolean.operator';

describe('invert-boolean.operator.ts', () => {
  it('should invert true to false', () => {
    const input$: Observable<boolean> = of(true);

    input$.pipe(invertBoolean()).subscribe((result: boolean) => {
      expect(result).toEqual(false);
    });
  });

  it('should invert false to true', () => {
    const input$: Observable<boolean> = of(false);

    input$.pipe(invertBoolean()).subscribe((result: boolean) => {
      expect(result).toEqual(true);
    });
  });

  it('should invert multiple true values to false', () => {
    const input$: Observable<boolean> = of(true, true, true);

    input$.pipe(invertBoolean()).subscribe((result: boolean) => {
      expect(result).toEqual(false);
    });
  });

  it('should invert multiple false values to true', () => {
    const input$: Observable<boolean> = of(false, false, false);

    const resultBooleans: boolean[] = [];

    input$
      .pipe(invertBoolean())
      .subscribe((result: boolean) => {
        resultBooleans.push(result);
      })
      .unsubscribe();

    expect(resultBooleans).toEqual([true, true, true]);
  });

  it('should invert a mix of true and false values', () => {
    const input$: Observable<boolean> = of(true, false, true, false);

    const resultBooleans: boolean[] = [];

    input$
      .pipe(invertBoolean())
      .subscribe((result: boolean) => {
        resultBooleans.push(result);
      })
      .unsubscribe();

    expect(resultBooleans).toEqual([false, true, false, true]);
  });
});
