import { useState, useEffect } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

export const useMapData = () => {
    const [geoData, setGeoData] = useState<any>(null);

    useEffect(() => {
        d3.json('/data/world.json')
            .then((topology: any) => {
                const countries = topojson.feature(topology, topology.objects.countries) as any;
                countries.features = countries.features.filter((c: any) => c.id !== '010');
                setGeoData(countries);
            })
            .catch((err) => console.error(err));
    }, []);

    return geoData;
};