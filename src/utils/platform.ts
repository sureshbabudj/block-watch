import { isPointInPolygon } from "geolib";

interface Coordinates {
  lat: number;
  lon: number;
}

interface Neighborhood {
  id: string;
  boundaries: Coordinates[];
}

export const checkNeighborhood = (
  coordinates: Coordinates,
  neighborhoods: Neighborhood[],
): Neighborhood | null => {
  for (const neighborhood of neighborhoods) {
    if (isPointInPolygon(coordinates, neighborhood.boundaries)) {
      return neighborhood;
    }
  }
  return null;
};

export const getCoordinates = async (
  address: string,
): Promise<{ lat: number; lon: number }> => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1`,
  );
  const data = await response.json();
  if (data.length > 0) {
    const { lat, lon } = data[0];
    return { lat: parseFloat(lat), lon: parseFloat(lon) };
  }
  throw new Error("Address not found");
};
