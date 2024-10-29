import { useEffect } from "react";
import { MapContainer, TileLayer, Polygon, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { Button } from "./ui/button";

type BoundaryInput = [number, number];

interface MapComponentProps {
  initialCoordinates: { lat: number; lon: number };
  boundingBoxPolygon: BoundaryInput[];
  userBoundingBoxPolygon: BoundaryInput[];
  setUserBoundingBoxPolygon: React.Dispatch<
    React.SetStateAction<BoundaryInput[]>
  >;
}

function MapEvents({
  setUserBoundingBoxPolygon,
}: {
  setUserBoundingBoxPolygon: MapComponentProps["setUserBoundingBoxPolygon"];
}) {
  useMapEvents({
    click: (e) => {
      const newPoint: BoundaryInput = [e.latlng.lat, e.latlng.lng];
      setUserBoundingBoxPolygon((prev) => [...prev, newPoint]);
    },
  });
  return null;
}

export default function MapComponent({
  initialCoordinates,
  boundingBoxPolygon,
  userBoundingBoxPolygon,
  setUserBoundingBoxPolygon,
}: MapComponentProps) {
  useEffect(() => {
    // Cleanup function to remove the map instance on component unmount
    return () => {
      const mapContainer = document.getElementById("map") as HTMLElement & {
        _leaflet_id: any;
      };
      if (mapContainer && mapContainer._leaflet_id) {
        mapContainer._leaflet_id = null;
      }
    };
  }, []);

  return (
    <>
      {" "}
      <MapContainer
        id="map"
        center={[initialCoordinates.lat, initialCoordinates.lon]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {!userBoundingBoxPolygon.length && boundingBoxPolygon.length > 0 && (
          <Polygon positions={boundingBoxPolygon} color="blue" />
        )}
        {userBoundingBoxPolygon.length > 0 && (
          <Polygon positions={userBoundingBoxPolygon} color="red" />
        )}
        <MapEvents setUserBoundingBoxPolygon={setUserBoundingBoxPolygon} />
      </MapContainer>
      <Button onClick={() => setUserBoundingBoxPolygon([])}>Reset</Button>
    </>
  );
}
