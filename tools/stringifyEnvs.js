const processEnv = (key, val) => ({
    [`process.env.${key}`]: JSON.stringify(val),
});

module.exports = (envs) => {
    const entries = Object.entries(envs);

    return entries.reduce(
        (acc, [key, val]) => Object.assign(acc, processEnv(key, val)),
        processEnv("APP_ENV", process.env.APP_ENV),
    );
};
