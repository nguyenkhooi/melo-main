/**
 * @see https://stackoverflow.com/a/49286056
 */
export type ValueOf<T> = T[keyof T];
export type KeyOf<T> = keyof T;
