/** @ts-check */
export * from "./FlatListLayout";
export * from "./ErrorReporter";
export * from "./FileSystem";
export * from "./MediaCleaner";
export * from "./Permissions";

export * from "./helpers";
export * from "./styles";
export * from "./typings";

export * from "./workers/useCombinedRefs";

export function getRandomNumber(min, max) {
  let random = Math.round(Math.random() * (max - min) + min);
  // to make sure max is not inclusive
  return random >= max ? random - 1 : random;
}
