'use strict'; // eslint-disable-line
// Configure dotenv as early as possible
const dotenv = require('dotenv');
dotenv.config();
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssoWebpackPlugin = require('csso-webpack-plugin').default;
const StyleLintPlugin = require('stylelint-webpack-plugin');
var ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyPlugin = require('copy-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const desire = require('./util/desire');
const includeHtml = require('./util/includeHtml');
const config = require('./config');
const assetsFilenames = (config.enabled.cacheBusting) ? config.cacheBusting : '[name]';
let webpackConfig = {
  context: config.paths.assets,
  entry: config.entry,
  devtool: (config.enabled.sourceMaps ? '#source-map' : undefined),
  output: {
    path: config.paths.dist,
    publicPath: './',
    filename: `scripts/${assetsFilenames}[hash].js`,
  },
  stats: {
    hash: true,
    version: true,
    timings: true,
    children: true,
    errors: false,
    errorDetails: false,
    warnings: false,
    chunks: false,
    modules: false,
    reasons: false,
    source: true,
    publicPath: true,
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        include: config.paths.assets,
        use: 'eslint',
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
      },
      {
        enforce: 'pre',
        test: /\.(js|s?[ca]ss)$/,
        include: config.paths.assets,
        loader: 'import-glob',
      },
      {
        test: /\.js$/,
        exclude: [/node_modules(?![/|\\](bootstrap|foundation-sites|swiper|dom7))/],
        use: [
          { loader: 'cache' },
          { loader: 'buble',
            options: { objectAssign: 'Object.assign', transforms: { asyncAwait: false }},
          },
        ],
      },
      {
        test: /\.css$/,
        include: config.paths.assets,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.scss$/,
        include: config.paths.assets,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          { loader: 'cache' },
          { loader: 'css',
            options: { sourceMap: config.enabled.sourceMaps } },
          {
            loader: 'postcss',
            options: {
              config: { path: __dirname, ctx: config },
              sourceMap: config.enabled.sourceMaps,
            },
          },
          { loader: 'resolve-url', options: { sourceMap: config.enabled.sourceMaps } },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: config.enabled.sourceMaps,
              sourceComments: true,
              implementation: require('sass'),
            },
          },
        ],
      },
      {
        test: /\.(ttf|otf|eot|woff2?|png|jpe?g|gif|svg|ico)$/,
        include: config.paths.assets,
        loader: 'url',
        options: {
          publicPath: '../',
          limit: 4096,
          name: `[path]${assetsFilenames}.[ext]`,
        },
      },
      {
        test: /\.(ttf|otf|eot|woff2?|png|jpe?g|gif|svg|ico)$/,
        include: config.paths.views,
        loader: 'file',
        options: {
          name: `[path]${assetsFilenames}.[ext]`,
        },
      },
      {
        test: /\.(ttf|otf|eot|woff2?|png|jpe?g|gif|svg|ico)$/,
        include: /node_modules/,
        loader: 'url',
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        include: config.paths.views,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'public/images/',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: [
      config.paths.assets,
      'node_modules',
    ],
    enforceExtension: false,
  },
  resolveLoader: {
    moduleExtensions: ['-loader'],
  },
  externals: {
    // jquery: 'jQuery',
  },
  plugins: [
    /**
     * It would be nice to switch to copy-webpack-plugin, but
     * unfortunately it doesn't provide a reliable way of
     * tracking the before/after file names
     */
    new CopyPlugin([{
      from: config.copy,
      to: config.paths.dist,
    }]),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif)$/i,
      quality: 30,
      imageminOptipng: {
        optimizationLevel: 3,
        quality: 30,
      },
    }),

    /*new CopyGlobsPlugin({
      pattern: config.copy,
      output: `[path]${assetsFilenames}.[ext]`,
      manifest: config.manifest,
    }),*/
    new CssoWebpackPlugin({
      filename: 'styles/[name][hash].css',
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'styles/[name][hash].css',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      // Popper: 'popper.js/dist/umd/popper.js',
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: false, //config.enabled.optimize
      debug: config.enabled.watcher,
      stats: { colors: true },
      handlebarsLoader: {},
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.s?css$/,
      options: {
        output: { path: config.paths.dist },
        context: config.paths.assets,
      },
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.js$/,
      options: {
        eslint: { failOnWarning: false, failOnError: true },
      },
    }),
    new StyleLintPlugin({
      failOnError: !config.enabled.watcher,
      syntax: 'scss',
    }),
    new CleanPlugin([config.paths.dist], {
      root: config.paths.root,
      verbose: false,
    }),
    ...includeHtml(
      config.paths.views + '/pages/',
      config.paths.viewData,
    ),
    new FriendlyErrorsWebpackPlugin(),
  ],
};
/* eslint-disable global-require */ /** Let's only load dependencies as needed */
if (config.enabled.optimize) {
  webpackConfig = merge(webpackConfig, require('./webpack.config.optimize'));
}
if (config.env.production) {
  webpackConfig.plugins.push(new webpack.NoEmitOnErrorsPlugin());
}
if (config.enabled.cacheBusting) {
  const WebpackAssetsManifest = require('webpack-assets-manifest');
  webpackConfig.plugins.push(
    new WebpackAssetsManifest({
      output: 'assets.json',
      space: 2,
      writeToDisk: false,
      assets: config.manifest,
      replacer: require('./util/assetManifestsFormatter'),
    })
  );
}
if (config.enabled.watcher) {
  webpackConfig = merge(webpackConfig, require('./webpack.config.watch'));
}
/**
 * During installation via sage-installer (i.e. composer create-project) some
 * presets may generate a preset specific config (webpack.config.preset.js) to
 * override some of the default options set here. We use webpack-merge to merge
 * them in. If you need to modify Sage's default webpack config, we recommend
 * that you modify this file directly, instead of creating your own preset
 * file, as there are limitations to using webpack-merge which can hinder your
 * ability to change certain options.
 */
module.exports = merge.smartStrategy({
  'module.loaders': 'replace',
})(webpackConfig, desire(`${__dirname}/webpack.config.preset`));
