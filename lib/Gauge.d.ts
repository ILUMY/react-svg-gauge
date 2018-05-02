/// <reference types="react" />
import React from 'react';
export interface GaugeProps {
    label: string;
    min: number;
    max: number;
    value: number;
    width: number;
    height: number;
    color: string;
    symbol: string;
    backgroundColor: string;
}
export default class Gauge extends React.Component<GaugeProps> {
    static defaultProps: {
        min: number;
        max: number;
        value: number;
        width: number;
        height: number;
        color: string;
        symbol: string;
        backgroundColor: string;
    };
    _getPathValues: (value: number) => {
        alpha: number;
        Ro: number;
        Ri: number;
        Cx: number;
        Cy: number;
        Xo: number;
        Yo: number;
        Xi: number;
        Yi: number;
    };
    _getPath: (value: number) => string;
    private uniqueFilterId;
    render(): JSX.Element;
}
