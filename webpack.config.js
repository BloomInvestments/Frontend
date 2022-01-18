const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

// To improve build times for large projects enable fork-ts-checker-webpack-plugin
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const dotenv = require('dotenv');
dotenv.config();

const isProduction = process.env.ENVIRONMENT === "production";
const apiUrl = process.env.API_URL;

console.log(`ENVIRONMENT=${isProduction ? "production" : "development"}`);
console.log(`Api url: ${apiUrl}`)

module.exports = env => ({
    devtool: isProduction
        ? false
        : "source-map",
    entry: "app/index.tsx",
    output: {
        publicPath: "/",
        path: __dirname + '/dist',
        filename: "[name].[chunkhash:8].js",
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    performance: {
        hints: false
    },
    watch: false,
    devServer: {
        historyApiFallback: true
    },
    // to automatically find tsconfig.json
    context: __dirname,
    module: {
        rules: [
            {
                test: /\.tsx?$/, exclude: /node_modules/, use: [{
                    loader: "ts-loader",
                    options: {
                        // Set to true if you are using fork-ts-checker-webpack-plugin
                        transpileOnly: true,
                        projectReferences: true
                    }
                },
                { loader: "ts-nameof-loader" }
                ]
            },
            { test: /\.css$/, use: ["style-loader", "css-loader"] },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: [ "file-loader?mimetype=image/svg+xml" ]},
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, use : [ "file-loader?mimetype=application/font-woff" ]},
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, use: [ "file-loader?mimetype=application/font-woff" ]},
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: [ "file-loader?mimetype=application/octet-stream" ]},
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: [ "file-loader" ]},
            { test: /\.(png|jpg|gif)$/i,loader: 'url-loader' },
        ]
    },
    resolve: {
        modules: [
            "node_modules",
            path.resolve(__dirname)
        ],
        extensions: [".js", ".ts", ".tsx"],
        plugins: [
            new TsconfigPathsPlugin({})
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: 'app/index.html',
            env: process.env,
        }),
       
        new ForkTsCheckerWebpackPlugin(),
    ],
    mode: isProduction ? "production" : "development"
})
