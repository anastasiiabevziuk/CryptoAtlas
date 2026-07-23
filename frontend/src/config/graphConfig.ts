export interface GraphConfig {
    background: string;
    nodeSize: number;
    fontSizeOffset: number;
    textOffset: number;
    linkColor: string;
    arrowLength: number;
    arrowRelPos: number;
    nodeColors: {
        crypto: string;
        regulator: string;
        regulation: string;
        default: string;
    };
    linkColors: {
        regulation: string;
        ban: string;
        liquidity: string;
        staking: string;
        oracle: string;
        default: string;
    }
}

export const GRAPH_CONFIG: GraphConfig = {
    background: 'var(--control-bg)',
    nodeSize: 5,
    fontSizeOffset: 12,
    textOffset: 8,
    linkColor: 'var(--control-border)',
    arrowLength: 4,
    arrowRelPos: 1,
    nodeColors: {
        crypto: '#10B981',
        regulator: '#E11D48',
        regulation: '#6366F1',
        default: '#94A3B8',
    },
    linkColors: {
        regulation: 'rgba(217, 4, 50, 0.52)',
        ban: 'rgba(133, 22, 22, 0.42)',
        liquidity: 'rgba(16, 185, 129, 0.6)',
        staking: 'rgba(139, 92, 246, 0.6)',
        oracle: 'rgba(59, 130, 246, 0.6)',
        default: 'rgba(148, 163, 184, 0.4)',
    }
};