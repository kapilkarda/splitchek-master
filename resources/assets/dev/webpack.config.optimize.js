'use strict'; // eslint-disable-line

// Image minification is disabled due to slowness and additional dependencies on server
// you may re-enable by uncommenting them
// const { default: ImageminPlugin } = require('imagemin-webpack-plugin');
// const imageminMozjpeg = require('imagemin-mozjpeg');
const CssoWebpackPlugin = require('csso-webpack-plugin').default;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BabelMinifyPlugin = require('babel-minify-webpack-plugin');

module.exports = {
  plugins: [
    // new ImageminPlugin({
    //   optipng: { optimizationLevel: 2 },
    //   gifsicle: { optimizationLevel: 3 },
    //   pngquant: { quality: '65-90', speed: 4 },
    //   svgo: {
    //     plugins: [
    //       { removeUnknownsAndDefaults: false },
    //       { cleanupIDs: false },
    //       { removeViewBox: false },
    //     ],
    //   },
    //   plugins: [imageminMozjpeg({ quality: 75 })],
    //   disable: (config.enabled.watcher),
    // }),
    // Do NOT use this due to big performance impact
    // on asset bundling time
    new UglifyJsPlugin({
      uglifyOptions: {
        ecma: 5,
        compress: {
          warnings: true,
          drop_console: true,
        },
      },
    }),
    new CssoWebpackPlugin({
      filename: 'styles/[name][hash].css',
    }),
    new BabelMinifyPlugin({
    }),
  ],
};
