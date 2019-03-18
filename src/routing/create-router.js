// @flow
import createRouter from "router5";
import browserPlugin from "router5-plugin-browser";
import scrollTopPlugin from "./scroll-top-plugin";
import dataLoaderMiddleware from "./data-loader-middleware";


export default (routes: Array<Object>) => {
    const options = {
        defaultRoute: "home",
        strictQueryParams: true,
    };

    const router = createRouter(routes, options);


    router.usePlugin(browserPlugin({ useHash: false, preserveHash: false }));
    router.usePlugin(scrollTopPlugin);

    router.useMiddleware(dataLoaderMiddleware);

    return router;
};
