module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
        alias: {
          actions: "./src/actions",
          components: "./src/components",
          constants: "./src/constants",
          navigation: "./src/navigation",
          reducers: "./src/reducers",
          screens: "./src/screens",
          services: "./src/services",
          store: "./src/store",
          themes: "./src/themes",
          utils: "./src/utils",
          assets: "./assets",
          // "utils/typings": "./src/utils/typings",
          engines: "./src/engines",
          "engines/providers": "./src/engines/providers",
        },
      },
    ],
  ],
};
