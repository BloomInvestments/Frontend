import React from "react";
import { Route, RouteProps } from "react-router";
import { RoutePart } from "./routes";

type RouteTemp = Omit<RouteProps, "path">;

interface RoutePropsEx extends RouteTemp {
    path: RoutePart;
}

export const RouteEx = (props: RoutePropsEx) => <Route {...props} />;
