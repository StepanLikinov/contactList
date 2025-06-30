const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: isDevelopment ? {
        static: './dist',
        hot: true,
    } : undefined,
    devtool: isDevelopment ? 'inline-source-map' : undefined,
    mode: isDevelopment ? 'development' : 'production',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: './index.html',
          favicon: './favicon.ico'
        }),
    ],
};