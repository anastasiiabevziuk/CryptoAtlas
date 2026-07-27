import React, { useState } from 'react';
import styles from './CryptoGraph.module.css';
import SearchInput from '@/components/UI/SearchInput/SearchInput';
import Button from '@/components/UI/Button/Button';
import { GRAPH_CONFIG } from '@/config/graphConfig';
import type { GraphNode, GraphLink } from '@/types/graph';

interface GraphControlsProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    onResetView: () => void;
    nodes?: GraphNode[];
    links?: GraphLink[];
    onSearchSelect?: (nodeId: string) => void;
}

export const GraphControls: React.FC<GraphControlsProps> = ({
    searchQuery,
    onSearchChange,
    onResetView,
    nodes = [],
    links = [],
}) => {
    const [activeFilters, setActiveFilters] = useState<Record<string, boolean>>(() => {
        const initialFilters: Record<string, boolean> = {};
        Object.keys(GRAPH_CONFIG.nodeColors).forEach(key => {
            if (key !== 'default') {
                initialFilters[key] = true;
            }
        });
        return initialFilters;
    });

    const toggleFilter = (group: string) => {
        setActiveFilters(prev => ({ ...prev, [group]: !prev[group] }));
    };

    const uniqueLinkTypes = Array.from(new Set(links.map(link => link.type)));

    return (
        <div className={styles.controlsPanel}>
            <div className={styles.searchBox}>
                <SearchInput
                    placeholder="Quick search..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            <div className={styles.section}>
                <h4>Node Types</h4>
                <div className={styles.tagsContainer}>
                    {Object.keys(GRAPH_CONFIG.nodeColors).map(group => {
                        if (group === 'default') return null;
                        const color = (GRAPH_CONFIG.nodeColors as Record<string, string>)[group];
                        const isActive = activeFilters[group] ?? true;

                        return (
                            <span
                                key={group}
                                className={`${styles.tag} ${isActive ? '' : styles.inactiveTag}`}
                                onClick={() => toggleFilter(group)}
                            >
                                <span
                                    className={styles.tagDot}
                                    style={{ backgroundColor: color }}
                                />
                                {group.charAt(0).toUpperCase() + group.slice(1)}
                            </span>
                        );
                    })}
                </div>
            </div>

            <div className={styles.section}>
                <h4>Link Types</h4>
                <div className={styles.linkTypesList}>
                    {uniqueLinkTypes.map(type => {
                        const color = (GRAPH_CONFIG.linkColors as Record<string, string>)[type] || GRAPH_CONFIG.linkColors.default;
                        const formattedName = type.charAt(0).toUpperCase() + type.slice(1);

                        return (
                            <div key={type} className={styles.linkTypeItem}>
                                <span
                                    className={styles.linkDot}
                                    style={{
                                        backgroundColor: color,
                                        boxShadow: `0 0 6px ${color}`
                                    }}
                                />
                                <span className={styles.linkText}>{formattedName}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className={styles.section}>
                <Button onClick={onResetView}>Reset View</Button>
            </div>

            <div className={`${styles.section} ${styles.footerSection}`}>
                <span className={styles.subText}>Nodes: {nodes.length}</span>
                <span className={styles.subText}>Links: {links.length}</span>
            </div>
        </div>
    );
};

export default GraphControls;