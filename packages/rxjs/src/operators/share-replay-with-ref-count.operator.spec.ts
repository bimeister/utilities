import { Observable, of } from 'rxjs';
import { shareReplayWithRefCount } from '@bimeister/utilities.rxjs';

describe('share-replay-with-ref-count.operator.ts', () => {
  it('should call shareReplayWithRefCount', () => {
    const source$: Observable<string> = of('123');
    source$.pipe(shareReplayWithRefCount());
  });
});
