const url = require('url');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browsersync-webpack-plugin');

const config = require('./config');
const target = process.env.APP_URL || 'localhost';

/**
 * We do this to enable injection over SSL.
 */
if (url.parse(target).protocol === 'https:') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

    config.proxyUrl = config.proxyUrl.replace('http:', 'https:');
}

module.exports = {
    output: {
        pathinfo: true,
        publicPath: '/',
    },
    devtool: '#cheap-module-source-map',
    stats: false,
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new BrowserSyncPlugin({
            target,
            open: config.open,
            proxyUrl: config.proxyUrl,
            watch: config.watch,
            delay: 500,
            proxy: 'http://localhost:9000',
        }),
    ],
    devServer: {
      port: 9000,
      open: false,
      contentBase: config.paths.dist,
      historyApiFallback: true,
      hot: true,
      overlay: true,
      inline: true,
      publicPath: config.publicPath,
    },
};

