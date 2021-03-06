const babelPresetJest = require('babel-preset-jest');
const getBabelPreset = require('../scripts/get-babel-preset');

const mcAppBabelConfig = getBabelPreset();

const jestBabelConfig = {
  ...mcAppBabelConfig,
  plugins: [
    ...mcAppBabelConfig.plugins,
    ...babelPresetJest().plugins,
    ['module-rewrite', { replaceFunc: './test/replace-module-paths.js' }],
  ],
};

module.exports = require('babel-jest').createTransformer(jestBabelConfig);
