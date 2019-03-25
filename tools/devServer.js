/* eslint-disable import/no-extraneous-dependencies */
const webpack = require("webpack");
const path = require("path");
const WebpackDevServer = require("webpack-dev-server");
const config = require("../webpack.config");


const compiler = webpack(config);
const options = {
    historyApiFallback: true,
    disableHostCheck: true,
    hot: false,
    contentBase: path.join(__dirname, "dist"),
    clientLogLevel: "error",
};
const server = new WebpackDevServer(compiler, options);

server.listen(3000, "0.0.0.0");
