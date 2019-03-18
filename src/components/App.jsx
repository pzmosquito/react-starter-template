// @flow
import * as React from "react";
import { render } from "react-dom";
import { routerApp } from "mr-router5";
import Layout from "./Layout/Layout";
import createRouter from "../routing/create-router";
import routes from "../routing/routes";
import "../assets/styles/main.less";


// router
const router = createRouter(routes);

// app container
const appContainer = document.getElementById("app");
if (appContainer === null) {
    throw new Error("app container id 'app' is not defined.");
}

// base app
const App = routerApp(router, routes, Layout);

// renderer
const renderApp = () => {
    render(<App />, appContainer);
};

export {
    renderApp,
    router,
};
