import type { FeatureCollection, Feature, Geometry } from 'geojson';

export interface MapProperties {
    name: string;
    legality: string;
    notes?: string;
    activity?: number;
}


export type MapFeature = Feature<Geometry, MapProperties>;
export type MapData = FeatureCollection<Geometry, MapProperties>;

export interface CryptoStatus {
    legality: string;
    notes?: string;
}

export interface StatusData {
    [countryName: string]: CryptoStatus;
}