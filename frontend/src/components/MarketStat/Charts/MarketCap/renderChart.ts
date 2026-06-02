import * as d3 from 'd3';
import { CHARTS_CONFIG } from '@/config/chartsConfig';
import type { ChartData } from '@/types/charts';

export const renderChart = (svgElement: SVGSVGElement, data: ChartData[]) => {
    const svg = d3.select(svgElement);
    const { width, height, padding, colors } = CHARTS_CONFIG.marketCap;


    svg.selectAll('*').remove();
    d3.select("body").selectAll(".d3-tooltip").remove();


    const tooltip = d3.select("body").append("div")
        .attr("class", "d3-tooltip")
        .style("position", "absolute")
        .style("background", "#1e293b")
        .style("color", "#fff")
        .style("padding", "8px 12px")
        .style("border-radius", "8px")
        .style("pointer-events", "none")
        .style("opacity", 0)
        .style("font-size", "12px")
        .style("z-index", "1000")
        .style("border", "1px solid #334155");

    const xScale = d3.scaleBand().domain(data.map(d => d.name)).range([padding.left, width - padding.right]).padding(0.4);
    const yScale = d3.scaleLinear().domain([0, d3.max(data, d => d.value) || 0]).range([height - padding.bottom, padding.top]);


    const gridGroup = svg.append("g")
        .attr("class", "grid-lines")
        .attr("transform", `translate(${padding.left}, 0)`)
        .call(d3.axisLeft(yScale).ticks(5).tickSize(-width + padding.left + padding.right).tickFormat(() => ""))
        .style("stroke", "#334155")
        .style("stroke-opacity", 0.3);
    gridGroup.select(".domain").remove();


    const bars = svg.selectAll('rect').data(data).join('rect')
        .attr('x', d => xScale(d.name)!).attr('width', xScale.bandwidth())
        .attr('y', height - padding.bottom).attr('height', 0)
        .attr('fill', d => (colors as any)[d.name] || colors.default).attr('rx', 6);

    bars.transition().duration(800).attr('y', d => yScale(d.value)).attr('height', d => height - padding.bottom - yScale(d.value));

    svg.on('mouseover', () => gridGroup.transition().duration(300).style("stroke-opacity", 0.05))
        .on('mouseout', () => gridGroup.transition().duration(300).style("stroke-opacity", 0.3));

    bars.on('mouseover', function (event, d) {
        d3.select(this).transition().duration(200).attr('opacity', 0.8);
        tooltip.transition().duration(200).style("opacity", 1);
        tooltip.html(`${d.name}: <strong>$${d.value.toFixed(2)}B</strong>`);
    }).on('mousemove', (event) => {
        tooltip.style("left", (event.pageX + 15) + "px").style("top", (event.pageY - 40) + "px");
    }).on('mouseout', function () {
        d3.select(this).transition().duration(200).attr('opacity', 1);
        tooltip.transition().duration(200).style("opacity", 0);
    });

    svg.append('g').attr('transform', `translate(0, ${height - padding.bottom})`)
        .call(d3.axisBottom(xScale).tickSize(0))
        .selectAll('text');

    svg.append('g').attr('transform', `translate(${padding.left}, 0)`)
        .call(d3.axisLeft(yScale).ticks(5).tickFormat(d => `$${d}B`))
        .selectAll('text');
}; 