// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  root: true,
 extends: ['expo', 'prettier'],
  plugins: ['prettier'],
  ignorePatterns: ['/dist/*', '/.expo', 'node_modules'],
  rules: {
    "prettier/prettier": "warn",
    "array-type": "off",
    "@typescript-eslint/array-type": ["error", { default: "generic" }],
    "import/named": "off", // Disable the rule if false positives occur
    "import/no-unresolved": "off", // Disable the rule if false positives occur
  },
};


