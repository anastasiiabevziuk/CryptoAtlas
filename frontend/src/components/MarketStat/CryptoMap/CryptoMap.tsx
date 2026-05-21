'use client';
import React, { useRef } from 'react';
import { useMapData } from './useMapData';
import { useMapRender } from './useMapRender';

const CryptoMap = () => {
    const svgRef = useRef<SVGSVGElement>(null!);
    const geoData = useMapData();
    useMapRender(svgRef, geoData);

    return (
        <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
            <svg ref={svgRef}></svg>
        </div>
    );
};

export default CryptoMap;