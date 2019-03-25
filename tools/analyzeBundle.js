/* eslint-disable import/no-extraneous-dependencies,no-console */
const webpack = require("webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const config = require("../webpack.config");


config.plugins.push(new BundleAnalyzerPlugin({
    generateStatsFile: true,
}));

webpack(config).run((error, stats) => {
    if (error) {
        throw new Error(error);
    }

    console.log(stats);
});
