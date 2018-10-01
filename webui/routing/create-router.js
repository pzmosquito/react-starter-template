// @flow
import createRouter from 'router5';
import loggerPlugin from 'router5/plugins/logger';
import listenersPlugin from 'router5/plugins/listeners';
import browserPlugin from 'router5/plugins/browser';
import { mobxPlugin } from 'mobx-router5';

import routes from './routes';
import scrollTopPlugin from './scroll-top-plugin';


export default (routerStore: RouterStore, useLogger: boolean) => {
    const options = {
        defaultRoute: "home",
        strictQueryParams: true
    };

    const router = createRouter(routes, options)
        .usePlugin(browserPlugin({useHash: false, preserveHash: false}))
        .usePlugin(mobxPlugin(routerStore))
        .usePlugin(listenersPlugin())
        .usePlugin(scrollTopPlugin);

    if (useLogger) {
        router.usePlugin(loggerPlugin);
    }

    return router;
};
