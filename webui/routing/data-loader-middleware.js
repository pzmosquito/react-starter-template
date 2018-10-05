// @flow
import HomeDataLoader from "../data-loaders/home";


export default () => (toState: Object, fromState: Object, done: Function) => {
    // modify this method to process preload data, add screen loading, etc.
    const loaderControl = (promises?: Array<Promise<any>>) => {
        // chaining preload data and route specific data is good for initial load. You may
        // want to check if the preload data has been loaded to prevent duplicate loading.
        const preloadPromises = [];

        return Promise.all(preloadPromises.concat(promises))
            .then((responses: Array<any>) => {
                if (preloadPromises.length > 0) {
                    // process preload data if it has not been loaded.
                }
                return responses.slice(preloadPromises.length);
            })
            .catch((error: Object) => {
                done();
                return error;
            });
    };

    // shortcut function to register loaders
    const registerLoader = (loader) => {
        loader.register(toState, fromState, loaderControl, done);
    };

    // register loaders
    registerLoader(HomeDataLoader);
};
