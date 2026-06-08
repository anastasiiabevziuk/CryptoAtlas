import * as d3 from 'd3';
import { VolumeChartConfig } from '@/config/volumeChartConfig';
import { setupGradient } from './volumeChartUtils';

export const renderMainChart = (
    svgElement: SVGSVGElement,
    allData: any[],
    domain: [Date, Date] | null,
    maxVolume: number
) => {
    const svg = d3.select(svgElement);
    svg.selectAll('*').remove();
    const defs = setupGradient(svg);

    const { margin, width: totalWidth, height: totalHeight } = VolumeChartConfig.main;
    const width = totalWidth - margin.left - margin.right;
    const height = totalHeight - margin.top - margin.bottom;

    const g = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

    const fullExtent = d3.extent(allData, d => d.date) as [Date, Date];
    const x = d3.scaleTime().domain(fullExtent).range([0, width]);
    const y = d3.scaleLinear().domain([0, maxVolume]).range([height, 0]);

    g.append("g").attr("transform", `translate(0, ${height})`).call(d3.axisBottom(x).ticks(5));
    g.append("g").call(d3.axisLeft(y).ticks(5).tickFormat(d3.format(".2s")));

    if (domain) {
        defs.append("clipPath").attr("id", "clip").append("rect")
            .attr("x", x(domain[0])).attr("y", 0)
            .attr("width", Math.max(0, x(domain[1]) - x(domain[0])))
            .attr("height", height);
    }

    const area = d3.area<any>().x(d => x(d.date)).y0(height).y1(d => y(d.volume)).curve(d3.curveBasis);

    g.append("path")
        .datum(allData)
        .attr("fill", VolumeChartConfig.colors.background)
        .attr("d", area);


    const highlight = g.append("path")
        .datum(allData)
        .attr("fill", "url(#volumeGradient)")
        .attr("d", area);

    if (domain) highlight.attr("clip-path", "url(#clip)");
};



export const renderBrushChart = (svgElement: SVGSVGElement, data: any[], onBrush: (d: [Date, Date] | null) => void) => {
    const svg = d3.select(svgElement);
    svg.selectAll('*').remove();
    setupGradient(svg);

    const { margin } = VolumeChartConfig.main;
    const { width: totalWidth, height } = VolumeChartConfig.brush;

    const width = totalWidth - margin.left - margin.right;

    const g = svg.append("g").attr("transform", `translate(${margin.left}, 0)`);

    const x = d3.scaleTime()
        .domain(d3.extent(data, d => d.date) as [Date, Date])
        .range([0, width]);

    const area = d3.area<any>().x(d => x(d.date)).y0(height).y1(0).curve(d3.curveBasis);

    g.append("path").datum(data).attr("fill", "url(#volumeGradient)").attr("d", area);

    const brush = d3.brushX().extent([[0, 0], [width, height]])
        .on("brush end", (e) => onBrush(e.selection ? e.selection.map(x.invert) as [Date, Date] : null));

    g.append("g").attr("class", "brush").call(brush);
};