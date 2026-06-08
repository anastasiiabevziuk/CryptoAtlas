import { useState, useEffect } from 'react';

export const useMarketVolume = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7&interval=daily');

                if (!response.ok) {
                    throw new Error(`Error API: ${response.status}`);
                }

                const json = await response.json();
                const formattedData = json.total_volumes.map((item: [number, number]) => ({
                    date: new Date(item[0]),
                    volume: item[1]
                }));

                setData(formattedData);
                setError(null);
            } catch (err) {
                console.error("Error loading data:", err);
                setError("Failed to load data from the server");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
};