

Melo is a light-weight and minimalist music player for Android and IOS. Inspired by [SoundSpice](https://github.com/farshed/SoundSpice-mobile)

[Play Store](https://play.google.com/store/apps/details?id=com.Melo)

## Powered by

-  React Native
-  Redux
-  React Navigation v5
-  Styled Components

## Screenshots


## Todo


## Bug fixes

### `react-native-get-music-files` node_modules' error 

On IOS, when `pod install` it shows error:

    ```
    The `RNReactNativeGetMusicFiles` pod failed to validate due to 1 error:
    - ERROR | attributes: Missing required attribute `homepage`.
    - WARN  | source: The version should be included in the Git tag.
    - WARN  | description: The description is equal to the summary.
    ```
--> Go to `\node_modules\react-native-get-music-files\ios\....podspec` and replace `s.homepage` with:
    `s.homepage = "https://github.com/cinder92/react-native-get-music-files"`

### Disable `Require Cycle: ...` warning

In `node_modules/metro/src/lib/polyfills/require.js (Line 114)`, mask out:

```
console.warn(
    "Require cycle: ".concat(cycle.join(" -> "), "\n\n") +
      "Require cycles are allowed, but can result in uninitialized values. " +
      "Consider refactoring to remove the need for a cycle."
  );
```
