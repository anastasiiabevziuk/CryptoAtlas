import { useEffect } from 'react';
import * as d3 from 'd3';
import { getTooltipContent } from './tooltipUtils';
import { MAP_CONFIG } from './mapConfig';

export const useMapRender = (svgRef: any, geoData: any, tooltipRef: any) => {
    useEffect(() => {
        if (!svgRef.current || !geoData || !tooltipRef.current) return;

        const svg = d3.select(svgRef.current);
        const tooltip = d3.select(tooltipRef.current);

        svg.selectAll('*').remove();

        const projection = d3.geoNaturalEarth1()
            .rotate([-11, 0])
            .fitSize([MAP_CONFIG.width, MAP_CONFIG.height], geoData);
        const pathGenerator = d3.geoPath().projection(projection);

        svg.append('g')
            .selectAll('path')
            .data(geoData.features)
            .join('path')
            .attr('d', pathGenerator as any)
            .attr('fill', (d: any) => {
                const status = d.properties.legality;
                return MAP_CONFIG.colors.status[status as keyof typeof MAP_CONFIG.colors.status]
                    || MAP_CONFIG.colors.status["No data"];
            })
            .attr('stroke', MAP_CONFIG.colors.stroke)
            .attr('stroke-width', 0.5)

            .on('mouseover', function () {
                d3.select(this)
                    .transition().duration(200)
                    .attr('opacity', 0.7)
                    .attr('stroke', '#ffffff');
            })
            .on('mouseout', function () {
                d3.select(this)
                    .transition().duration(200)
                    .attr('opacity', 1)
                    .attr('stroke', MAP_CONFIG.colors.stroke);
            })
            .on('mousemove', (event: any, d: any) => {
                const [x, y] = [event.offsetX, event.offsetY];
                tooltip
                    .style('opacity', 1)
                    .html(getTooltipContent(d))
                    .style('left', (x + 15) + 'px')
                    .style('top', (y + 15) + 'px');
            })
            .on('mouseleave', () => {
                tooltip.style('opacity', 0);
            });

    }, [geoData, svgRef, tooltipRef]);
};