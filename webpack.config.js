/* eslint-disable no-console */
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const envs = require("./envs");
const stringifyEnvs = require("./tools/stringifyEnvs");


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
        filename: "[name].[hash].js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
    },
    devtool: "source-map",
    optimization: {
        noEmitOnErrors: true,
    },
    plugins: [
        new HtmlWebpackPlugin({ template: "./src/index.html" }),
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css",
        }),
        new webpack.DefinePlugin(stringifyEnvs(envs[process.env.APP_ENV])),
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ["babel-loader"].concat(mode === "development" ? ["eslint-loader"] : []),
            },
            {
                test: /\.eot(\?v=\d+.\d+.\d+)?$/,
                use: ["file-loader"],
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        mimetype: "application/font-woff",
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
                test: /(\.css|\.less)$/,
                use: [
                    mode === "development" ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "less-loader",
                ],
            },
        ],
    },
};
