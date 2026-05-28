import { MAP_CONFIG } from './mapConfig';

export const getTooltipContent = (d: any) => {
    const status = d.properties.legality || "No data";
    const statusColor = MAP_CONFIG.colors.status[status as keyof typeof MAP_CONFIG.colors.status] || '#64748b';


    return `
        <div >
            <div >${d.properties.name}</div>
            <div >
                Status: <span style="color: ${statusColor}; font-weight: 600;">${status}</span>
            </div>
            <div>"${d.properties.notes || "No specific info available"}"</div>
        </div>
    `;
};