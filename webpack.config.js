/* eslint-disable no-console */
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");


const mode = process.env.APP_ENV === "development" ? "development" : "production";

console.log(`webpack is compiling in ${mode} mode.`);

module.exports = {
    mode,
    target: "web",
    resolve: {
        extensions: ["*", ".js", ".jsx", ".json"],
    },
    entry: [
        "./src/index.js",
    ],
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
    },
    devtool: "source-map",
    optimization: {
        noEmitOnErrors: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: false,
                    },
                },
            }),
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({ template: "./src/index.html", minify: { removeComments: false } }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
        }),
        new webpack.DefinePlugin({
            "APP.ENV": JSON.stringify(process.env.APP_ENV),
            "APP.VERSION": JSON.stringify(require("./package.json").version),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.eot(\?v=\d+.\d+.\d+)?$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        name: "[name].[ext]",
                    },
                }],
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        mimetype: "application/font-woff",
                        name: "[name].[ext]",
                    },
                }],
            },
            {
                test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        mimetype: "application/octet-stream",
                        name: "[name].[ext]",
                    },
                }],
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        mimetype: "image/svg+xml",
                        name: "[name].[ext]",
                    },
                }],
            },
            {
                test: /\.(jpe?g|png|gif|ico)$/i,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                    },
                }],
            },
            {
                test: /\.css$/,
                use: [
                    mode === "development" ? "style-loader" : MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                    "postcss-loader",
                ],
            },
            {
                test: /\.less$/,
                use: [
                    mode === "development" ? "style-loader" : MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                    "postcss-loader",
                    "less-loader",
                ],
            },
        ],
    },
};
