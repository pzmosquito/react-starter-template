import createRouter, { Options } from "router5";
import { dataloaderMiddleware, RouteDef } from "mr-router5";
import browserPlugin from "router5-plugin-browser";
import scrollTopPlugin from "./scroll-top-plugin";


export default (routes: RouteDef[]) => {
    // create router object
    const options = {
        defaultRoute: "home",
    };
    const router = createRouter(routes, options);

    // plugins
    router.usePlugin(browserPlugin({ useHash: false, preserveHash: false }));
    router.usePlugin(scrollTopPlugin);

    // middleware
    router.useMiddleware(dataloaderMiddleware);

    return router;
};
