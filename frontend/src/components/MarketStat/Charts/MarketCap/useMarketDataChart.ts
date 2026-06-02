import { useState, useEffect } from 'react';
import type { ChartData, UseMarketTopAssetsResult } from '@/types/charts';


export const useMarketTopAssets = (): UseMarketTopAssetsResult => {
    const [data, setData] = useState<ChartData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        const controller = new AbortController();

        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=4&sparkline=false',
                    { signal: controller.signal }
                );

                if (!response.ok) throw new Error('Failed to load data');

                const json = await response.json();
                const formatted = json.map((c: any) => ({
                    name: c.symbol.toUpperCase(),
                    value: c.market_cap / 1e9
                }));

                setData(formatted);
                setError(null);
            } catch (err: any) {
                if (err.name !== 'AbortError') {
                    setError(err.message || 'Error!');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => controller.abort();
    }, []);

    return { data, loading, error };
};