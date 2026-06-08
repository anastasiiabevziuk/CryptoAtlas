import * as d3 from 'd3';

import { VolumeChartConfig } from '@/config/volumeChartConfig';

export const setupGradient = (svg: d3.Selection<SVGSVGElement, any, any, any>) => {
    svg.select("defs").remove();
    const defs = svg.append("defs");
    const gradient = defs.append("linearGradient")
        .attr("id", "volumeGradient")
        .attr("x1", "0%").attr("y1", "0%")
        .attr("x2", "0%").attr("y2", "100%");

    gradient.append("stop").attr("offset", "0%").attr("stop-color", VolumeChartConfig.colors.gradientStart).attr("stop-opacity", 0.8);
    gradient.append("stop").attr("offset", "100%").attr("stop-color", VolumeChartConfig.colors.gradientEnd).attr("stop-opacity", 0);
    return defs;
};