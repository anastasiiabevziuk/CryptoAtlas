import { MAP_CONFIG } from './mapConfig';
import type { MapFeature } from '../../../types/map';

export const getTooltipContent = (d: MapFeature): string => {

    const { name, legality, notes } = d.properties;

    const status = legality || "No data";
    const statusColor = MAP_CONFIG.colors.status[status as keyof typeof MAP_CONFIG.colors.status] || '#5c7771ff';

    return `
        <div>
            <div>${name}</div>
            <div>
                Status: <span style="color: ${statusColor}; font-weight: 600;">${status}</span>
            </div>
            <div>"${notes || "No specific info available"}"</div>
        </div>
    `;
};