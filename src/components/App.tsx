import * as React from "react";
import { render } from "react-dom";
import { routerApp } from "mr-router5";
import Layout from "./Layout/Layout";
import createRouter from "../routing/create-router";
import routes from "../routing/routes";
import "../assets/styles/main.less";


// router
const router = createRouter(routes);

// base app
const App = routerApp(router, routes, Layout);

// renderer
const renderApp = () => {
    render(<App />, document.getElementById("app"));
};

export {
    renderApp,
    router,
};
