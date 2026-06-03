import * as d3 from 'd3';
import { CHARTS_CONFIG } from '@/config/chartsConfig';
import type { ChartData } from '@/types/charts';
import { getChartTooltipContent } from './tooltipUtilsMarketCap';

export const renderChart = (
    svgElement: SVGSVGElement,
    tooltipElement: HTMLDivElement,
    data: ChartData[]
) => {
    const svg = d3.select(svgElement);
    const tooltip = d3.select(tooltipElement);
    const { width, height, padding, colors } = CHARTS_CONFIG.marketCap;

    svg.selectAll('*').remove();

    const xScale = d3.scaleBand().domain(data.map(d => d.name)).range([padding.left, width - padding.right]).padding(0.4);
    const yScale = d3.scaleLinear().domain([0, d3.max(data, d => d.value) || 0]).range([height - padding.bottom, padding.top]);

    const gridGroup = svg.append("g").attr("class", "grid-lines").attr("transform", `translate(${padding.left}, 0)`)
        .call(d3.axisLeft(yScale).ticks(5).tickSize(-width + padding.left + padding.right).tickFormat(() => ""))
        .style("stroke", "#334155").style("stroke-opacity", 0.3);
    gridGroup.select(".domain").remove();

    const bars = svg.selectAll('rect').data(data).join('rect')
        .attr('x', d => xScale(d.name)!).attr('width', xScale.bandwidth())
        .attr('y', height - padding.bottom).attr('height', 0)
        .attr('fill', d => (colors as any)[d.name] || colors.default).attr('rx', 6);

    bars.transition().duration(800).attr('y', d => yScale(d.value)).attr('height', d => height - padding.bottom - yScale(d.value));

    bars.on('mouseover', function (event, d) {
        d3.select(this).attr('opacity', 0.8);
        tooltip
            .style('opacity', 1)
            .style('display', 'block')
            .html(getChartTooltipContent(d));
    })

        .on('mousemove', (event) => {
            const container = svgElement.parentElement;
            if (!container) return;

            const containerRect = container.getBoundingClientRect();
            const x = event.clientX - containerRect.left;
            const y = event.clientY - containerRect.top;

            let tooltipX = x + 15;
            let tooltipY = y - 20;

            tooltip
                .style('left', `${tooltipX}px`)
                .style('top', `${tooltipY}px`);
        })

        .on('mouseout', function () {
            d3.select(this).attr('opacity', 1);
            tooltip.style('opacity', 0).style('display', 'none');
        });

    svg.append('g').attr('transform', `translate(0, ${height - padding.bottom})`).call(d3.axisBottom(xScale).tickSize(0)).selectAll('text');
    svg.append('g').attr('transform', `translate(${padding.left}, 0)`).call(d3.axisLeft(yScale).ticks(5).tickFormat(d => `$${d}B`)).selectAll('text');
};