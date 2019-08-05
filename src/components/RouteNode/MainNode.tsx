import * as React from "react";
import { RouteComponent } from "mr-router5";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";


const routeNodeName = ""; // root node

export default () => (
    <div>
        <Header />
        <RouteComponent routeNodeName={routeNodeName} />
        <Footer />
    </div>
);
