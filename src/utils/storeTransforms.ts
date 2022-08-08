export const select = (val: string, arr: string[]) => arr.includes(val) ? val : arr[0];
export const inputNumber = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);