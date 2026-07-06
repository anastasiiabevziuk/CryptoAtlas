'use client';
import React, { useRef } from 'react';
import { useMapData } from './useMapData';
import { useMapRender } from './useMapRender';
import MapLegend from './MapLegend';
import styles from '../../../app/page.module.css';
import { MAP_CONFIG } from '../../../config/mapConfig';

const CryptoMap = () => {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const tooltipRef = useRef<HTMLDivElement | null>(null);
    const geoData = useMapData();

    useMapRender(svgRef, geoData, tooltipRef);

    if (!geoData) return <div>Loading map…</div>;

    return (
        <div className={styles.mapContainer}>
            <svg
                ref={svgRef}
                className={styles.mapSvg}
                viewBox={`0 0 ${MAP_CONFIG.width} ${MAP_CONFIG.height}`}
            />
            <div ref={tooltipRef} className={styles.tooltip} style={{ opacity: 0, position: 'absolute' }} />
            <MapLegend />
        </div>
    );
};

export default CryptoMap;

