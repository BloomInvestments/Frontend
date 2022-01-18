/* eslint-disable object-shorthand */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable func-names */
/* eslint-disable no-extend-native */
import { Enumerable } from "linq-es5/lib/enumerable";
import { asEnumerable } from "linq-es5";
import { RoutePart } from "shared/routes/routes";

declare global {
    interface NodeList {
        toArray(): Node[];
        toEnum(): Enumerable<Node>;
    }

    interface NodeListOf<TNode extends Node> {
        toArray(): TNode[];
        toEnum(): TNode[];
    }

    interface RegExp {
        getMatches(
            text: string
        ): { start: number; end: number; value: string }[];
    }

    interface Array<T> {
        remove(o: T): Array<T>;
        toEnum(): Enumerable<T>;
        toCss(): string;
        firstOrDefault(defualtValue: T): T;
        any(expr: (item: T) => boolean): boolean;
        sameOrDefault<V>(expr: (item: T) => V, value: V, defaultValue: V): V;
        replaceAt(index: number, item: T): Array<T>;
        replaceItem(oldItem: T, newItem: T): Array<T>;
    }

    interface HTMLCollection {
        toArray(): Element[];
        toEnum(): Enumerable<Element>;
    }

    interface RouteProps {
        path: RoutePart;
    }

    interface Date {
        addDays(days: number): Date;
    }

    interface String {
        includeCss(b: boolean): string;
    }

    function fields<T>(): { [P in keyof T]: P };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _global = (window /* browser */ || global) /* node */ as any;
_global.fields = function fields<T>() {
    return new Proxy(
        {},
        {
            get: function (_target, prop, _receiver) {
                return prop;
            },
        },
    ) as { [P in keyof T]: P };
};

Date.prototype.toJSON = function () {
    const correctedDate = new Date(
        this.getFullYear(),
        this.getMonth(),
        this.getDate(),
        12,
    );
    return correctedDate.toISOString();
};

Date.prototype.addDays = function (days: number) {
    const dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
};

NodeList.prototype.toArray = function () {
    const temp: Array<Node> = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < this.length; i++) temp.push(this.item(i)!);
    return temp;
};

NodeList.prototype.toEnum = function () {
    return this.toArray().toEnum();
};

Array.prototype.remove = function <T> (o: T) {
    const index = this.indexOf(o);
    if (index > -1) this.splice(index, 1);
    return this;
};

Array.prototype.firstOrDefault = function <T> (defualtValue: T): T {
    return this.length > 0 ? this[0] : defualtValue;
};

Array.prototype.replaceAt = function <T> (index: number, item: T) {
    const ret = this.slice(0);
    ret[index] = item;
    return ret;
};

Array.prototype.replaceItem = function <T> (oldItem: T, newItem: T) {
    const ret = this.slice(0);
    const index = ret.findIndex((c) => c === oldItem);
    ret[index] = newItem;
    return ret;
};

Array.prototype.any = function <T> (expr: (item: T) => boolean): boolean {
    return this.findIndex(expr) > -1;
};

Array.prototype.sameOrDefault = function <T, V> (
    expr: (item: T) => V,
    existingValue: V,
    defaultValue: V,
): V {
    const temp = this.length === 0
        ? defaultValue
        : this.findIndex((p) => expr(p) === existingValue) > -1
            ? existingValue
            : expr(this[0]);

    return temp;
};

Array.prototype.toEnum = function () {
    return asEnumerable(this);
};

Array.prototype.toCss = function () {
    return this.join(" ");
};

HTMLCollection.prototype.toArray = function () {
    const temp: Element[] = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < this.length; i++) temp.push(this.item(i)!);
    return temp;
};

HTMLCollection.prototype.toEnum = function () {
    return this.toArray().toEnum();
};

String.prototype.includeCss = function (b: boolean) {
    if (b) return this as string;
    return "";
};

RegExp.prototype.getMatches = function (text: string) {
    let start = 0;
    let end = 0;
    let match;
    const res: Array<{ start: number; end: number; value: string }> = [];

    // eslint-disable-next-line no-cond-assign
    while ((match = this.exec(text)) != null) {
        start = match.index;
        end = start + match[0].length;

        res.push({
            start,
            end,
            value: match[0],
        });
    }

    return res;
};

export class Ext {}
