/* eslint-disable no-console */
import webpack from "webpack";
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";


const ENVS = {
    development: {
        API_URL: "https://dev.change.me/api",
    },
    test: {
        API_URL: "https://test.change.me/api",
    },
    staging: {
        API_URL: "https://staging.change.me/api",
    },
    production: {
        API_URL: "https://change.me/api",
    },
};

const GLOBAL_CONSTS = Object.entries(ENVS[process.env.APP_ENV]).reduce(
    (acc, [key, val]) => Object.assign(acc, { [`process.env.${key}`]: JSON.stringify(val) }),
    { "process.env.APP_ENV": JSON.stringify(process.env.APP_ENV) },
);

const mode = process.env.APP_ENV === "development" ? "development" : "production";

console.log(`webpack is compiling in ${mode} mode.`);

export default {
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
        minimizer: [
            new OptimizeCSSAssetsPlugin(),
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({ template: "./src/index.html" }),
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css",
        }),
        new webpack.DefinePlugin(GLOBAL_CONSTS),
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
