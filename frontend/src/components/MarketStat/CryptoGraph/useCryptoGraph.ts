import { useState, useEffect, useRef } from 'react';
import type { ForceGraphMethods } from 'react-force-graph-2d';
import type { GraphData } from '@/types/graph';

export const useCryptoGraph = () => {
    const fgRef = useRef<ForceGraphMethods | null>(null);
    const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetch('/data/graphData.json')
            .then((res) => res.json())
            .then((data: GraphData) => setGraphData(data))
            .catch((err) => console.error('Error loading graph:', err));
    }, []);

    useEffect(() => {
        if (!searchQuery.trim() || !fgRef.current) return;

        const foundNode = graphData.nodes.find((node) =>
            node.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (foundNode && 'x' in foundNode && 'y' in foundNode) {
            fgRef.current.centerAt(foundNode.x as number, foundNode.y as number, 1000);
            fgRef.current.zoom(3, 1000);
        }
    }, [searchQuery, graphData]);

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