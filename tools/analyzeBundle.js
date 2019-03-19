/* eslint-disable import/no-extraneous-dependencies,no-console */
import webpack from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import config from "../webpack.config";


config.plugins.push(new BundleAnalyzerPlugin({
    generateStatsFile: true,
}));

webpack(config).run((error, stats) => {
    if (error) {
        throw new Error(error);
    }

    console.log(stats);
});
