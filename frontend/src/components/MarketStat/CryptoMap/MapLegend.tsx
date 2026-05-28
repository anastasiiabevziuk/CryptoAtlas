import React from 'react';
import { MAP_CONFIG } from './mapConfig';
import styles from './MapLegend.module.css';

const MapLegend = () => {

    const { legend, colors } = MAP_CONFIG;

    return (
        <div className={styles.legend} style={{
            fontSize: `${legend.markerSize}px`
        }}>
            <div style={{
                marginBottom: `${legend.itemGap}px`,
            }}>
                {legend.title}
            </div>

            <div className={styles.list} style={{
                gap: `${legend.itemGap}px`
            }}>
                {Object.entries(colors.status).map(([label, color]) => (
                    <div className={styles.item} key={label} style={{
                        gap: `${legend.itemGap}px`
                    }}>
                        <div style={{
                            width: `${legend.markerSize}px`,
                            height: `${legend.markerSize}px`,
                            backgroundColor: color
                        }} />
                        <span>{label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MapLegend;

