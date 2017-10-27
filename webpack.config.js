const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATH = {
    app: path.join(__dirname, 'app', 'hello.ts'),
    build: path.join(__dirname, 'build'),
};

const commonConfig = {
    entry: {
        app: PATH.app,

    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
    },
    module: {

        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                use: [
                    {
                        loader: 'eslint-loader',
                        options: {
                            emitWarning: true,
                        },
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015'],
                        },
                    },
                ],

            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',

            },
        ],
    },
    output: {
        path: PATH.build,
        filename: '[name].js',
    },
    plugins: [
        new HtmlWebpackPlugin({title: 'Webpack Demo'}),
        new webpack.LoaderOptionsPlugin({
            options: {
                eslint: {
                    failOnWarning: false,
                    failtOnError: true,
                    fix: false,
                    outputReport: {
                        filePath: 'checkstyle.xml',
                        formatter: require('eslint/lib/formatters/checkstyle'),
                    },
                },
            },
        }),
    ],
};

const productConfig = () => commonConfig;

const developmentConfig = () => {
    const config = {
        devServer: {
            historyApiFallback: true,
            stats: 'errors-only',
            host: process.env.HOST,
            port: process.env.PORT,
            contentBase: ['build'],
            proxy: {
                context: ['/auth', '/api'],
                target: 'http://localhost:3000',
            },
            overlay: {
                errors: true,
                warnings: false,
            },
        },
    };

    return Object.assign({}, commonConfig, config);
};


module.exports = (env) => {
    console.log('env:' + env);
    if (env === 'production')
        return productConfig();
    return developmentConfig();
};