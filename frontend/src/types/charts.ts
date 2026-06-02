export interface ChartData {
    name: string;
    value: number;
}

export interface UseMarketTopAssetsResult {
    data: ChartData[];
    loading: boolean;
    error: string | null;
}