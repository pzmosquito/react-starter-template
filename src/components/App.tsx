import * as React from "react";
import { render } from "react-dom";
import { routerApp } from "mr-router5";
import MainNode from "../components/RouteNode/MainNode";
import createRouter from "../routing/create-router";
import routes from "../routing/routes";
import "../assets/styles/main.less";


// router
const router = createRouter(routes);

// base app
const App = routerApp(router, routes, MainNode);

// renderer
const renderApp = () => {
    render(<App />, document.getElementById("app"));
};

export {
    renderApp,
    router,
};
