import React from 'react';
import { MAP_CONFIG } from './mapConfig';
import styles from './MapLegend.module.css';

const MapLegend: React.FC = () => {
    const { legend, colors } = MAP_CONFIG;

    return (
        <div className={styles.legend}>
            <div className={styles.title}>{legend.title}</div>

            <div className={styles.list}>
                {Object.entries(colors.status).map(([label, color]) => (
                    <div className={styles.item} key={label}>
                        <div
                            className={styles.marker}
                            style={{ backgroundColor: color }}
                        />
                        <span className={styles.label}>{label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MapLegend;