'use client';
import React, { useEffect, useRef } from 'react';
import { renderChart } from './renderChart';
import { CHARTS_CONFIG } from '@/config/chartsConfig';
import { useMarketTopAssets } from './useMarketDataChart';
import styles from '../../../../app/page.module.css';


const MarketCapChart = () => {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const tooltipRef = useRef<HTMLDivElement | null>(null);
    const { data } = useMarketTopAssets();

    useEffect(() => {
        if (svgRef.current && tooltipRef.current && data && data.length > 0) {
            renderChart(svgRef.current, tooltipRef.current, data);
        }
    }, [data]);

    return (
        <div style={{ position: 'relative' }}>
            <svg
                ref={svgRef}
                width={CHARTS_CONFIG.marketCap.width}
                height={CHARTS_CONFIG.marketCap.height}
            />
            <div
                ref={tooltipRef}
                className={styles.tooltip}
                style={{ opacity: 0, position: 'absolute' }}
            />
        </div>
    );
};

export default MarketCapChart;