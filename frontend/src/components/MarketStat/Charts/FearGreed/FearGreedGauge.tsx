'use client';
import React, { useEffect, useRef } from 'react';
import { useMarketData } from '@/hooks/useMarketData';
import { GAUGE_CONFIG } from '@/config/gaugeConfig';
import { renderGauge } from './renderGauge';

const FearGreedGauge = () => {
    const { sentimentValue, loading, isError } = useMarketData();
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (svgRef.current && sentimentValue !== null && !loading && !isError) {
            renderGauge(svgRef.current, sentimentValue);
        }
    }, [sentimentValue, loading, isError]);

    if (loading) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;

    return <svg ref={svgRef} width={GAUGE_CONFIG.width} height={GAUGE_CONFIG.height} />;
};

export default FearGreedGauge;