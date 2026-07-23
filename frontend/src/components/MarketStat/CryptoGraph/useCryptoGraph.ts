import { useState, useEffect, useRef } from 'react';

export const useCryptoGraph = () => {
    const fgRef = useRef<any>(null);
    const [graphData, setGraphData] = useState({ nodes: [], links: [] });
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetch('/data/graphData.json')
            .then((res) => res.json())
            .then((data) => setGraphData(data))
            .catch((err) => console.error('Error loading graph:', err));
    }, []);

    const handleResetView = () => {
        fgRef.current?.zoomToFit(400, 50);
    };

    return {
        fgRef,
        graphData,
        searchQuery,
        setSearchQuery,
        handleResetView,
    };
};