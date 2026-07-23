'use client';

import React from 'react';
import { useCryptoGraph } from './useCryptoGraph';
import { GraphCanvas } from './GraphCanvas';
import { GraphControls } from './GraphControls';
import styles from './CryptoGraph.module.css';

export function CryptoGraph() {
    const { fgRef, graphData, searchQuery, setSearchQuery, handleResetView } = useCryptoGraph();

    return (
        <div className={styles.graphContainer}>
            <GraphCanvas fgRef={fgRef} graphData={graphData} />
            <GraphControls
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onResetView={handleResetView}
                nodes={graphData.nodes}
                links={graphData.links}
            />
        </div>
    );
}

export default CryptoGraph;