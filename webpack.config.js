const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATH = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build'),
};

module.exports = {
    entry: {
        app: PATH.app,
    },
    output: {
        path: PATH.build,
        filename: '[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({title: 'Webpack Demo',}),

    ],
};