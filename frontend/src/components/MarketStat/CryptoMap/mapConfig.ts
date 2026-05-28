export const MAP_CONFIG = {
    width: 900,
    height: 400,
    legend: {
        title: "Crypto Status",
        itemGap: 6,
        markerSize: 12
    },
    scoreMap: {
        "Legal Tender": 1.0,
        "Legal": 0.8,
        "Restricted": 0.5,
        "Banking ban": 0.3,
        "Illegal": 0.1,
        "No data": 0.2
    },
    colors: {
        fill: '#515c5c11',
        hover: '#7f7f7f1e',
        stroke: 'rgba(14, 81, 45, 0.37)',
        status: {
            "Legal Tender": "#064e3b",
            "Legal": "#059669",
            "Restricted": "#10b981",
            "Banking ban": "#6ee7b7",
            "Illegal": "#91cbadff",
            "No data": "#9dc3b0ff",
        }
    }
};