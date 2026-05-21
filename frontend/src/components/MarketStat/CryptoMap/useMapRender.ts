import { useEffect } from 'react';
import * as d3 from 'd3';
import { MAP_CONFIG } from './mapConfig';

export const useMapRender = (svgRef: React.RefObject<SVGSVGElement>, geoData: any) => {
    useEffect(() => {
        if (!svgRef.current || !geoData) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        svg.attr('viewBox', `0 0 ${MAP_CONFIG.width} ${MAP_CONFIG.height}`)
            .attr('width', '100%')
            .attr('height', '100%');

        const projection = d3.geoNaturalEarth1()
            .rotate([-11, 0, 0])
            .fitExtent([[60, 30], [MAP_CONFIG.width - 60, MAP_CONFIG.height - 30]], geoData);

        const pathGenerator = d3.geoPath().projection(projection);

        const g = svg.append('g');
        g.selectAll('path')
            .data(geoData.features)
            .enter()
            .append('path')
            .attr('d', pathGenerator as any)
            .attr('fill', MAP_CONFIG.colors.fill)
            .attr('stroke', MAP_CONFIG.colors.stroke)
            .on('mouseenter', function () { d3.select(this).attr('fill', MAP_CONFIG.colors.hover); })
            .on('mouseleave', function () { d3.select(this).attr('fill', MAP_CONFIG.colors.fill); });

    }, [svgRef, geoData]);
};