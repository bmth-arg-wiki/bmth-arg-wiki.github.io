const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    entry: {
        app: [
            './assets/js/hamburger.js',
            './assets/js/tabs.js',
            './assets/js/toc.js',
            './assets/js/gallery.js',
            './assets/js/search.js',
            './assets/js/modal.js',
            './assets/js/register-service-worker.js',
        ],
        styles: './assets/css/main.css',
    },

    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, 'assets/min'),
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                ],
            },
        ],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.min.css',
        }),
    ],

    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin(),
            new CssMinimizerPlugin(),
        ],
    },

    mode: 'production',
};
