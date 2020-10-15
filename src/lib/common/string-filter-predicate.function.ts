export function stringFilterPredicate(targetValue: string, filterValue: string): boolean {
  targetValue = targetValue.trim().toLowerCase();
  filterValue = filterValue.trim().toLowerCase();
  return targetValue.includes(filterValue);
}
