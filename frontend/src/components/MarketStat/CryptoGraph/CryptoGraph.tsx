'use client';

import React from 'react';
import { useCryptoGraph } from './useCryptoGraph';
import { GraphCanvas } from './GraphCanvas';
import { GraphControls } from './GraphControls';
import styles from './CryptoGraph.module.css';

const CryptoGraph = () => {
    const { fgRef, graphData, searchQuery, setSearchQuery, handleResetView } = useCryptoGraph();
    const { nodes, links } = graphData;
    return (
        <div className={styles.graphContainer}>
            <GraphCanvas fgRef={fgRef} graphData={graphData} />
            <GraphControls
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onResetView={handleResetView}
                nodes={nodes}
                links={links}
            />
        </div>
    );
}

export default CryptoGraph;