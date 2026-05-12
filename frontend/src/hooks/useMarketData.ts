import { useEffect, useState } from 'react';
import { formatNumber } from '@/utils/formatNumber';

interface MarketData {
    btcDom: number | null;
    totalCap: string | null;
    sentiment: string | null;
    loading: boolean;
    isError: boolean;
}

const CACHE_KEY = 'marketDataCache';
const CACHE_TTL = 1000 * 60 * 5;

export const useMarketData = () => {
    const [data, setData] = useState<MarketData>({
        btcDom: null,
        totalCap: null,
        sentiment: null,
        loading: true,
        isError: false,
    });


    useEffect(() => {
        const controller = new AbortController();

        const loadFromCache = () => {
            try {
                const cached = localStorage.getItem(CACHE_KEY);
                if (!cached) return null;

                const parsed = JSON.parse(cached);

                if (Date.now() - parsed.timestamp > CACHE_TTL) {
                    return null;
                }

                return parsed.data;
            } catch {
                return null;
            }
        };

        const saveToCache = (data: any) => {
            localStorage.setItem(
                CACHE_KEY,
                JSON.stringify({
                    timestamp: Date.now(),
                    data,
                })
            );
        };

        const fetchData = async () => {

            const cached = loadFromCache();
            if (cached) {
                setData({ ...cached, loading: false, isError: false });
            }

            try {
                const [marketRes, sentimentRes] = await Promise.all([
                    fetch('https://api.coingecko.com/api/v3/global', {
                        signal: controller.signal,
                    }),
                    fetch('https://api.alternative.me/fng/', {
                        signal: controller.signal,
                    }),
                ]);

                const marketJson = await marketRes.json();
                const sentimentJson = await sentimentRes.json();

                const freshData = {
                    btcDom: marketJson.data.market_cap_percentage.btc.toFixed(2),
                    totalCap: formatNumber(marketJson.data.total_market_cap.usd),
                    sentiment: sentimentJson.data[0].value_classification,
                    loading: false,
                    isError: false,
                };



                saveToCache(freshData);


                setData(freshData);
            } catch (e: any) {
                if (e.name !== 'AbortError') {
                    console.warn('Using cached data due to API error');

                    const cached = loadFromCache();

                    if (cached) {
                        setData({ ...cached, loading: false, isError: false });
                    } else {
                        setData(prev => ({
                            ...prev,
                            loading: false,
                            isError: true,
                        }));
                    }
                }
            }
        };

        fetchData();

        return () => controller.abort();
    }, []);

    return data;
};
