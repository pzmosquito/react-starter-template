// @flow
import loaders from "../data-loaders";


export default () => (toState: Object, fromState: Object, done: Function) => {
    // TODO: modify this method to process preload data, add screen loading, etc.
    const loaderControl = (promises?: Array<Promise<any>>) => {
        // chaining preload data and route specific data for better performance.
        // You may want to check preload data status to prevent duplicate loading.
        const preloadPromises = [];

        return Promise.all(preloadPromises.concat(promises))
            .then((responses: Array<any>) => {
                if (preloadPromises.length > 0) {
                    // TODO: process preload data
                }
                return responses.slice(preloadPromises.length);
            })
            .catch((error: Object) => {
                done();
                return error;
            });
    };

    // register loaders
    Object.values(loaders).forEach((loader) => {
        loader.register(toState, fromState, loaderControl, done);
    });
};
