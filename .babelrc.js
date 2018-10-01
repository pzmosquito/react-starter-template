const env = process.env.BABEL_ENV || process.env.NODE_ENV;

const plugins = [
    ["@babel/plugin-proposal-decorators", {decoratorsBeforeExport: false}],
    "@babel/plugin-proposal-class-properties",
    "react-hot-loader/babel"
];

const presets = [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-flow"
];

module.exports = {
    plugins,
    presets
};
