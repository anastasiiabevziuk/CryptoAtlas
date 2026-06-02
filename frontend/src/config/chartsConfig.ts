export interface ChartConfig {
    width: number;
    height: number;
    padding: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    colors: {
        [key: string]: string;
        default: string;
    };
}

export const CHARTS_CONFIG = {
    marketCap: {
        width: 300,
        height: 200,
        padding: { top: 30, right: 20, bottom: 30, left: 60 },
        colors: {
            BTC: "#f7931a",
            ETH: "#627eea",
            USDT: "#26a17b",
            BNB: "#f3ba2f",
            default: "#3b82f6"
        }
    }
};
