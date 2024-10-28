export interface Coordinates {
  lat: number;
  lon: number;
}

export interface OpenMapData {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: OpenMapAddress;
  boundingbox: string[];
}

export interface OpenMapAddress {
  town?: string;
  county: string;
  state: string;
  "ISO3166-2-lvl4": string;
  postcode: string;
  country: string;
  country_code: string;
  hamlet?: string;
  village?: string;
}
