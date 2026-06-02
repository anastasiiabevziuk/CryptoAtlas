'use client';
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useMarketTopAssets } from './useMarketDataChart';
import { renderChart } from './renderChart';
import { CHARTS_CONFIG } from '@/config/chartsConfig';


export default function MarketCapChart() {

    const svgRef = useRef<SVGSVGElement>(null);

    const { data, loading, error } = useMarketTopAssets();

    useEffect(() => {

        if (svgRef.current && data && data.length > 0) {
            renderChart(svgRef.current, data);
        }

        return () => {
            if (svgRef.current) {
                d3.select(svgRef.current).selectAll('*').remove();
            }
        };
    }, [data]);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return <svg ref={svgRef} width={CHARTS_CONFIG.marketCap.width} height={CHARTS_CONFIG.marketCap.height} />;
}