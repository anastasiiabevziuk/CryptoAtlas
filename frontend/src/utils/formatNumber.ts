export const formatNumber = (value: number | null | undefined) => {
    if (value === null || value === undefined || isNaN(value)) return '—';

    const abs = Math.abs(value);

    if (abs >= 1_000_000_000_000) {
        return (value / 1_000_000_000_000).toFixed(2) + ' T';
    }
    if (abs >= 1_000_000_000) {
        return (value / 1_000_000_000).toFixed(2) + ' B';
    }
    if (abs >= 1_000_000_000) {
        return (value / 1_000_000_000).toFixed(2) + ' B';
    }
    if (abs >= 1_000_000) {
        return (value / 1_000_000).toFixed(2) + ' M';
    }
    if (abs >= 1_000) {
        return (value / 1_000).toFixed(2) + ' K';
    }

    return value.toString();
};
