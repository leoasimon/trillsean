import * as R from "ramda";

export const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

export const findDuplicates = <T>(arr: T[], property?: string): T[] =>
  arr.filter((item, index) => {
    const findIndexFn = property
      ? R.findIndex(R.propEq(property, (item as any)[property]))
      : R.indexOf(item);
    return findIndexFn(arr) !== index;
  });

export const findAllDuplicates = <T>(arr: T[], property?: string): T[] =>
  arr.filter((item, index) => {
    const findIndexFn = property
      ? R.findIndex(R.propEq(property, (item as any)[property]))
      : R.indexOf(item);
    const findLastIndexFn = property
      ? R.findLastIndex(R.propEq(property, (item as any)[property]))
      : R.lastIndexOf(item);
    return findIndexFn(arr) !== index || findLastIndexFn(arr) !== index;
  });

export const withKeys = <T>(arr: T[]) =>
  arr.map((value, index) => ({ ...value, key: index }));
