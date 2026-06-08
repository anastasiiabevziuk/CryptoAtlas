
'use client';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useMarketVolume } from './useMarketVolume';
import * as d3 from 'd3';
import { renderMainChart, renderBrushChart } from './renderVolumeChart';
import { VolumeChartConfig } from '@/config/volumeChartConfig';
import styles from './VolumeChart.module.css';

const VolumeChart = () => {
    const { data, loading } = useMarketVolume();
    const mainSvgRef = useRef<SVGSVGElement>(null);
    const brushSvgRef = useRef<SVGSVGElement>(null);
    const [domain, setDomain] = useState<[Date, Date] | null>(null);

    const maxVolume = useMemo(() => d3.max(data, d => d.volume) || 0, [data]);


    useEffect(() => {
        if (!loading && mainSvgRef.current && data.length > 0) {
            renderMainChart(mainSvgRef.current, data, domain, maxVolume);
        }
    }, [data, domain, maxVolume, loading]);


    useEffect(() => {
        if (!loading && brushSvgRef.current && data.length > 0) {
            renderBrushChart(brushSvgRef.current, data, setDomain);
        }
    }, [data, loading]);

    return (
        <div className={styles.container}>
            <div>
                <svg
                    ref={mainSvgRef}
                    className={styles.mainChart}
                    width={VolumeChartConfig.main.width}
                    height={VolumeChartConfig.main.height}
                />
            </div>
            <div>
                <svg
                    ref={brushSvgRef}
                    className={styles.brushChart}
                    width={VolumeChartConfig.brush.width}
                    height={VolumeChartConfig.brush.height}
                />
            </div>
        </div>

    );
};

export default VolumeChart;