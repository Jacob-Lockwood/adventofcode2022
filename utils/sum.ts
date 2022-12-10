export function sum(arr: readonly number[]) {
  return arr.reduce((sum, n) => sum + n);
}
