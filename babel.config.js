module.exports = function (api) {
  var babelEnv = api.env();
  /** @type {import('react-native-unistyles/plugin').UnistylesPluginOptions} */

  var unistylesPluginOptions = {
    root: "packages/ui",
    debug: babelEnv !== "production",
    autoProcessImports: ["@example/theme", "@example/ui"],
  };

  var plugins = [["react-native-unistyles/plugin", unistylesPluginOptions]];

  if (babelEnv !== "development") {
    plugins.push(["transform-remove-console"]);
  }

  // most be last
  plugins.push("react-native-reanimated/plugin");

  api.cache(true);

  return {
    presets: [
      ["babel-preset-expo",  { unstable_transformImportMeta: true }],
    ],
    plugins: plugins,
  };
};
  