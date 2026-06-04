export interface GaugeConfig {
    width: number;
    height: number;
    centerX: number;
    centerY: number;
    radius: number;
    innerRadius: number;
    outerRadius: number;
    fontSize: string;
    labelSize: string;
    textOffset: number;
}

export const GAUGE_CONFIG: GaugeConfig = {
    width: 300,
    height: 160,
    centerX: 150,
    centerY: 140,
    radius: 90,
    innerRadius: 80,
    outerRadius: 100,
    fontSize: "18px",
    labelSize: "12px",
    textOffset: 25,
};