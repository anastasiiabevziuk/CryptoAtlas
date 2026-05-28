'use client';
import React, { useRef } from 'react';
import { useMapData } from './useMapData';
import { useMapRender } from './useMapRender';
import MapLegend from './MapLegend';
import styles from '../../../app/page.module.css';
import { MAP_CONFIG } from './mapConfig';


const CryptoMap = () => {
    const svgRef = useRef<SVGSVGElement>(null!);
    const tooltipRef = useRef<HTMLDivElement>(null!);
    const geoData = useMapData();

    useMapRender(svgRef, geoData, tooltipRef);

    return (
        <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
            <svg ref={svgRef} width="100%" height={`${MAP_CONFIG.height}px`} viewBox={`0 0 ${MAP_CONFIG.width} ${MAP_CONFIG.height}`} />
            <div ref={tooltipRef} className={styles.tooltip} />
            <MapLegend />
        </div>
    );
};
export default CryptoMap;