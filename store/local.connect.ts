/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect as connectToStore } from "ts-lite-store/connect";
import { Observer as ObserverType } from "ts-lite-store/observer";
import { Store } from "ts-lite-store/store";
import { AppState } from "./app.store";

export const connect = <TProps, TRes extends Partial<TProps>, TObserver extends ObserverType>(
    Comp: React.ComponentType<TProps>,
    map: (store: Store<AppState>, observer: TObserver | undefined) => TRes,
    Observer: (new(...args: any) => TObserver) | undefined,
) => connectToStore(
        Comp,
        map,
        Observer,
    );
