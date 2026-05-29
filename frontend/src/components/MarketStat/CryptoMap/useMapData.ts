import { useState, useEffect } from 'react';
import * as topojson from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';
import { MAP_CONFIG } from './mapConfig';
import type { MapData, StatusData } from '../../../types/map';

export const useMapData = () => {
    const [geoData, setGeoData] = useState<MapData | null>(null);

    useEffect(() => {
        async function initMap() {
            try {
                const [topoResponse, statusResponse] = await Promise.all([
                    fetch('/data/world.json'),
                    fetch('/data/cryptoStatus.json')
                ]);

                const topo = await topoResponse.json() as Topology;
                const statusData = await statusResponse.json() as StatusData;

                const countries = topojson.feature(topo, topo.objects.countries as GeometryCollection) as unknown as MapData;

                countries.features = countries.features
                    .filter(f => f.id !== '010')
                    .map(f => {
                        const countryName = f.properties.name;
                        const cryptoInfo = statusData[countryName];

                        return {
                            ...f,
                            properties: {
                                ...f.properties,
                                legality: cryptoInfo?.legality ?? "No data",
                                notes: cryptoInfo?.notes ?? "Information unavailable",
                                activity: MAP_CONFIG.scoreMap[cryptoInfo?.legality as keyof typeof MAP_CONFIG.scoreMap] ?? 0.2
                            }
                        };
                    });

                setGeoData(countries);
            } catch (err) {
                console.error('Error loading map data:', err);
            }
        }
        initMap();
    }, []);

    return geoData;
};