import { useState, useEffect } from 'react';
import * as topojson from 'topojson-client';
import { MAP_CONFIG } from './mapConfig';

export const useMapData = () => {
    const [geoData, setGeoData] = useState<any>(null);

    useEffect(() => {
        async function initMap() {
            try {
                const topoResponse = await fetch('/data/world.json');
                const topo = await topoResponse.json();
                const countries = topojson.feature(topo, topo.objects.countries) as any;

                countries.features = countries.features.filter(
                    (f: any) => f.id !== '010'
                );

                const statusResponse = await fetch('/data/cryptoStatus.json');
                const statusData = await statusResponse.json();
                countries.features.forEach((f: any) => {
                    const countryName = f.properties.name;
                    const cryptoInfo = statusData[countryName];

                    f.properties.legality = cryptoInfo ? cryptoInfo.legality : "No data";
                    f.properties.notes = cryptoInfo ? cryptoInfo.notes : "Information unavailable";

                    f.properties.activity = MAP_CONFIG.scoreMap[f.properties.legality as keyof typeof MAP_CONFIG.scoreMap] || 0.2;
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