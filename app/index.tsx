import "shared/resources/global.css";
import "date-fns";

import * as React from "react";
import ReactDOM from "react-dom";
// these imports are not referenced here, but as they are
// declared globally, they are visible everywhere but they
// must be included so compiler (and VSC) could be happy
// (no need to import on every page where they are used)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as nameof from "ts-nameof";

import { Ext } from "shared/global/extensions";
import { BrowserRouter } from "react-router-dom";
import { theme } from "ui/theme";

import { Stack, ThemeProvider } from "@mui/material";
import { AppState, defaultAppState } from "store/app.store";
import { Store } from "ts-lite-store/store";
import { StoreProvider } from "ts-lite-store/store.provider";

// We need this because otherwise extension methods won't be invoked
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const dummy = Ext;

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href")!;

const store: Store<AppState> = new Store<AppState>(defaultAppState);

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <BrowserRouter basename={baseUrl}>
            <StoreProvider store={store}>
                <Stack>Hello world</Stack>
            </StoreProvider>
        </BrowserRouter>
    </ThemeProvider>,
    document.getElementById("root"),
);
