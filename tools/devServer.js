import path from "path";
import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import config from "../webpack.config";


const compiler = webpack(config);
const options = {
    historyApiFallback: true,
    disableHostCheck: true,
    hot: false,
    contentBase: path.join(__dirname, "dist"),
    clientLogLevel: "error"
};
const server = new WebpackDevServer(compiler, options);

server.listen(3000, "0.0.0.0");
