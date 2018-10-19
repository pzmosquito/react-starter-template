// @flow
import { hot } from 'react-hot-loader';
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import * as stores from '../stores';
import Layout from './Layout/Layout';
import createRouter from '../routing/create-router';
import dataLoaderMiddleware from '../routing/data-loader-middleware';
import '../assets/styles/main.less';


// router
const router = createRouter(stores.routerStore, process.env.NODE_ENV === "development");
router.useMiddleware(dataLoaderMiddleware);

// app container
const appContainer = document.getElementById('app');
if (appContainer === null) {
    throw new Error("app container id 'app' is not defined.");
}

// app component
const App = () => (
    <Provider {...stores}>
        <div>
            <Layout />
            {process.env.NODE_ENV === "development" ? <DevTools position={{bottom: 0, left: 0}} /> : null}
        </div>
    </Provider>
);

const HotApp = hot(module)(App);

// renderer
const renderApp = () => {
    render(<HotApp />, appContainer);
};

export {
    renderApp,
    router
};
