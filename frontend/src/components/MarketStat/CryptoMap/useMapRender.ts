import { useEffect } from 'react';
import * as d3 from 'd3';
import { getTooltipContent } from './tooltipUtils';
import { MAP_CONFIG } from '../../../config/mapConfig';
import type { MapData, MapFeature } from '../../../types/map';

export const useMapRender = (
    svgRef: React.RefObject<SVGSVGElement | null>,
    geoData: MapData | null,
    tooltipRef: React.RefObject<HTMLDivElement | null>
) => {

    useEffect(() => {
        if (!svgRef.current || !geoData || !tooltipRef.current) return;

        const svg = d3.select(svgRef.current);

        svg.attr('viewBox', `0 0 ${MAP_CONFIG.width} ${MAP_CONFIG.height}`)

        const tooltip = d3.select(tooltipRef.current);
        let g = svg.select<SVGGElement>('.map-group');
        if (g.empty()) {
            g = svg.append('g').attr('class', 'map-group');
        }

        const projection = d3.geoNaturalEarth1()
            .rotate([-11, 0])
            .fitSize([MAP_CONFIG.width, MAP_CONFIG.height], geoData);

        const pathGenerator = d3.geoPath().projection(projection);

        const paths = g.selectAll<SVGPathElement, MapFeature>('path')
            .data(geoData.features);

        paths.join('path')
            .attr('d', (d) => pathGenerator(d) || '')
            .attr('fill', (d) => {
                const status = d.properties.legality as keyof typeof MAP_CONFIG.colors.status;
                return MAP_CONFIG.colors.status[status] || MAP_CONFIG.colors.status["No data"];
            })
            .attr('stroke', MAP_CONFIG.colors.stroke)
            .attr('stroke-width', 0.5)
            .on('mouseover', function () {
                d3.select(this).transition().duration(200).attr('opacity', 0.7);
            })
            .on('mouseout', function () {
                d3.select(this).transition().duration(200).attr('opacity', 1);
            })
            .on('mousemove', (event: MouseEvent, d: MapFeature) => {
                tooltip
                    .style('opacity', 1)
                    .html(getTooltipContent(d))
                    .style('left', `${event.offsetX + 15}px`)
                    .style('top', `${event.offsetY + 15}px`);
            })
            .on('mouseleave', () => {
                tooltip.style('opacity', 0);
            });

    }, [geoData, svgRef, tooltipRef]);
};