/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import * as H from "history";
import * as RH from "react-router";
import { match, useRouteMatch } from "react-router";

function getProperties(data: any) {
    const list: Array<{ propertyName: string, value: any}> = [];

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const value = data[key];
            list.push({
                propertyName: key,
                value,
            });
        }
    }

    return list;
}

function generateUrl(parts: any[]) {
    let url = parts[0] as string;
    const properties = getProperties(parts[1]);

    properties.forEach(c => {
        url = url.replace(`/:${c.propertyName}`, `/${c.value}`);
    });

    return url;
}

// Note: we define typesafe urls, so we don't need to worry
// for the url paramters when they are needed
type Routes =
    ["/"] |
    ["/main"];

export type RoutePart = Routes[0];

// redefine useHistory hook, we want to add constraint
// on push part, only allowed route parts can be set
export function useHistoryEx(): Omit<H.History, "push"> & { push(...path: Routes): void; } {
    const history = RH.useHistory();
    const oldPush = history.push;

    history.push = (...value: any[]) => {
        oldPush(generateUrl(value));
    };

    return history;
}

export const GetRoutPart = (route: RoutePart) => route;

export type RoutePropsEx = Omit<RH.RouteProps, "path">;

export function useRouteMatchEx<Params extends { [K in keyof Params]?: string } = Record<string, string>>(
    path: RoutePart | RoutePropsEx,
): match<Params> | null {
    return useRouteMatch(path);
}

// this is change for react router 6.0
// export type RoutePart = Routes[0];

// export function useNavigateEx() : (...routes: Routes) => void {
//     const navigate = RH.useNavigate();

//     const wrapper = (...routes: Routes) => {
//         navigate(generateUrl(routes));
//     };

//     return wrapper;
// }

// export const GetRoutPart = (route: RoutePart) => route;

// export type RoutePropsEx = Omit<RH.RouteProps, "path">;

// export function useMatchEx<ParamKey extends string = string>(path: RoutePart | RoutePropsEx): PathMatch<ParamKey> | null {
//     return useMatch(<string>path);
// }
