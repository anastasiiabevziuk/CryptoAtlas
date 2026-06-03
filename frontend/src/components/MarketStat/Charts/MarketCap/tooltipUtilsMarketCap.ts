import type { ChartData } from '@/types/charts';

export const getChartTooltipContent = (d: ChartData): string => {
    return `
        <div>
            <div">${d.name}</div>
            <div>Market Cap: <strong>$${d.value.toFixed(2)}B</strong></div>
        </div>
    `;
};