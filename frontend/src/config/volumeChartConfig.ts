export interface ChartMargin {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

export interface ChartDimensions {
    margin: ChartMargin;
    width: number;
    height: number;
}

export interface BrushDimensions {
    width: number;
    height: number;
    padding: number;
}

export interface ChartColors {
    gradientStart: string;
    gradientEnd: string;
    background: string;
}

export interface VolumeChartConfigType {
    main: ChartDimensions;
    brush: BrushDimensions;
    colors: ChartColors;
}

export const VolumeChartConfig: VolumeChartConfigType = {
    main: {
        margin: { top: 10, right: 20, bottom: 30, left: 50 },
        width: 400,
        height: 190,
    },
    brush: {
        width: 400,
        height: 20,
        padding: 50,
    },
    colors: {
        gradientStart: "#434494ff",
        gradientEnd: "#1e6064ff",
        background: "#42475041",
    }
};