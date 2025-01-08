module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    "react-native-reanimated/plugin",
    [
      "module-resolver",
      {
        root: ["."],
        alias: {
          "@": "./src",  // Resolve `@` to `src` directory
        },
      },
    ],
  ],
};