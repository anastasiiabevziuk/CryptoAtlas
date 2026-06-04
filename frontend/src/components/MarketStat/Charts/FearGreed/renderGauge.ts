import * as d3 from 'd3';
import { GAUGE_CONFIG } from '@/config/gaugeConfig';

export const renderGauge = (svgElement: SVGSVGElement, sentimentValue: number) => {
    const { centerX, centerY, radius, innerRadius, outerRadius, fontSize, labelSize, textOffset } = GAUGE_CONFIG;

    const rootStyle = getComputedStyle(document.documentElement);
    const colorFear = rootStyle.getPropertyValue('--color-danger').trim();
    const colorGreed = rootStyle.getPropertyValue('--color-success').trim();

    const colorInterpolator = d3.interpolateRgb(colorFear, colorGreed);
    const dynamicColor = colorInterpolator(sentimentValue / 100);

    const svg = d3.select(svgElement);
    svg.selectAll('*').remove();


    const arc = d3.arc<any>()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(-Math.PI / 2)
        .endAngle(Math.PI / 2);

    const defs = svg.append("defs");
    const gradient = defs.append("linearGradient").attr("id", "gaugeGradient");
    gradient.append("stop").attr("offset", "0%").attr("stop-color", colorFear);
    gradient.append("stop").attr("offset", "100%").attr("stop-color", colorGreed);

    svg.append("path")
        .attr("d", arc as any)
        .attr("fill", "url(#gaugeGradient)")
        .attr("transform", `translate(${centerX}, ${centerY})`);

    const angleRadians = ((sentimentValue / 100) * 180 - 90) * (Math.PI / 180);

    const arrowRadius = radius - 15;
    const x = centerX + arrowRadius * Math.sin(angleRadians);
    const y = centerY - arrowRadius * Math.cos(angleRadians);

    svg.append("line")
        .attr("x1", centerX).attr("y1", centerY)
        .attr("x2", x).attr("y2", y)
        .attr("stroke", dynamicColor)
        .attr("stroke-width", 4)
        .attr("stroke-linecap", "round");

    svg.append("circle")
        .attr("cx", centerX).attr("cy", centerY)
        .attr("r", 6)
        .attr("fill", dynamicColor);


    const textX = centerX + (radius + textOffset) * Math.sin(angleRadians);
    const textY = centerY - (radius + textOffset) * Math.cos(angleRadians);

    svg.append("text")
        .attr("x", textX).attr("y", textY)
        .attr("text-anchor", "middle").attr("fill", dynamicColor)
        .attr("font-size", fontSize).attr("font-weight", "bold")
        .text(`${sentimentValue}`);


    svg.append("text").attr("x", 40).attr("y", GAUGE_CONFIG.height).attr("fill", colorFear).attr("font-size", labelSize).text("Extreme Fear");
    svg.append("text").attr("x", 215).attr("y", GAUGE_CONFIG.height).attr("fill", colorGreed).attr("font-size", labelSize).text("Extreme Greed");
};