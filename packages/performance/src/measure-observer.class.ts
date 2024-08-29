import { VOID } from '@bimeister/utilities.constants';
import {
  EntryType,
  PerformanceEntry,
  PerformanceObserver,
  PerformanceObserverCallback,
  PerformanceObserverEntryList,
} from 'perf_hooks';

type MeasureObserverCallback = (observer: PerformanceObserver, targetEntry: PerformanceEntry) => void;
enum PerformanceMark {
  Start = 'Start',
  End = 'End',
}

export class MeasureObserver {
  private readonly performanceObserver: PerformanceObserver;

  public static readonly defaultMarks: typeof PerformanceMark = PerformanceMark;
  private static readonly entryType: EntryType = 'measure';

  constructor(measureName: string) {
    const entryType: EntryType = 'measure';

    const observerCallback: PerformanceObserverCallback = (
      list: PerformanceObserverEntryList,
      observer: PerformanceObserver
    ) => {
      const performanceEntries: PerformanceEntry[] = list.getEntriesByType(entryType);
      const targetEntry: PerformanceEntry | undefined = performanceEntries.find(
        (entry: PerformanceEntry) => entry.name === measureName
      );

      if (targetEntry === undefined) {
        throw new Error(`Target PerformanceEntry for measureName ("${measureName}") not found.`);
      }

      this.measureObserverCallback(observer, targetEntry);
    };
    this.performanceObserver = new PerformanceObserver(observerCallback);
  }

  public observe(callback: MeasureObserverCallback): void {
    this.measureObserverCallback = callback;
    this.performanceObserver.observe({ entryTypes: [MeasureObserver.entryType] });
  }

  public disconnect(): void {
    this.performanceObserver.disconnect();
  }

  private measureObserverCallback: MeasureObserverCallback = () => VOID;
}
