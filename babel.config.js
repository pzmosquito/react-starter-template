const env = process.env.BABEL_ENV || process.env.NODE_ENV;

const plugins = [
    ["@babel/plugin-proposal-decorators", {legacy: true}],
    ["@babel/plugin-proposal-class-properties", {loose: true}]
];

const presets = [
    ["@babel/preset-env", {useBuiltIns: "usage"}],
    "@babel/preset-react",
    "@babel/preset-flow"
];

module.exports = {
    plugins,
    presets
};
